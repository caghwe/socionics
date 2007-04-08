function makeReininEngine()
{
    return function ( givenSlidersSelection )
        {
            var myTransformation = makeReininTimToDichotomyTransformer();

            givenSlidersSelection[ 15 ]  = 1;
            var myTimCoefficients = transformPoint( myTransformation, givenSlidersSelection );


            // ---------------------------------------------------------------------
            //
            // барицентрические коэффициенты: 
            //var myProcessor = new ResultsetProcessor( function ( x ) { return x / 16; } );
            //
            // коэффициенты корреляции: 
            var myProcessor = new ResultsetProcessor( function ( x ) { return x/15  - 1 / 15; } );
            //
            //-----------------------------------------------------------------------
            
            processObject( myTimCoefficients, myProcessor );

            // alert( "maximum = " + myProcessor.max + ", min = " + myProcessor.min + ", total = " + myProcessor.total );

            return myProcessor.result;
        };
}
function ResultsetProcessor( givenAffineTransformation )
{
    this.max = - 1000;
    this.min = 1000;
    this.total = 0;
    this.result = new Array();
    
    this.processValue = function( givenKey, givenValue, givenLevel )
        {
            var myResult = roundFloat( givenAffineTransformation( givenValue ) );
            
            this.result[ this.result.length ] = myResult;

                this.min = ( this.min > myResult ? myResult : this.min );
                this.max = ( this.max < myResult ? myResult : this.max );
                this.total += myResult;
        };
    this.processKey = function( givenKey, givenLevel )
        {
            alert( "ResultsetProcessor failed: the input array has object elements, but I am expecting numbers!" );
        };
}
function makeReininTimToDichotomyTransformer()
{
    var myTimToSliderTransformer = getReininMatrix();
    
    myTimToSliderTransformer[ 15 ] = new Array();
    for( i = 0; i < linearRepresentation.length; i ++ )
    {
        myTimToSliderTransformer[ 15 ][ i ] = 1;
    }
    
    var mySliderToTimTransformer = transposeMatrix( myTimToSliderTransformer );

//    var mustBeIdentity = productOfMatricies( mySliderToTimTransformer, myTimToSliderTransformer );
//    document.write( "<pre>this must be a unit matrix:\n" + listObject( mustBeIdentity ) + "</pre>" );

    return mySliderToTimTransformer;
}
function getReininMatrix()
{
    // Матрица из -1 и 1.
    // Строки соответствуют дихотомиям, столбцы -- ТИМам.
    // Строк всего 15, столбцов -- 16.
    // Каждая строка задаёт распределение вероятности соответствующей дихотомии на множестве по ТИМов.
    // Таким образом, применив эту матрицу к 16-мерному вектору,
    // дающему распределение вероятности на множестве ТИМов,
    // мы получим соответствующее этому вектору распределение вероятности на множестве дихотомий
    // (т.е. вводные данные теста Рейнина), с точностью то преобразования (x-1)*2.

    // Матрица становится ортогональной после деления на 4 (т.е. для её обращения надо
    // транспонированную матрицу поделить на 16).

    var myMatrix = new Array();
    for( var myDichotomyId = 0; myDichotomyId < reininDichotomies.length; myDichotomyId ++ )
    {
        myMatrix[ myDichotomyId ] = reininDichotomies[ myDichotomyId  ].tim;
    }
    return myMatrix;
}
