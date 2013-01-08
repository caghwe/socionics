function makeReininEngineTALANOV()  
{
    return function ( givenSlidersSelection )
        {
            var myTransformation = makeReininTimToDichotomyTransformer();

            givenSlidersSelection[ 15 ]  = 1;
            var myTimCoefficients = transformPoint( myTransformation, givenSlidersSelection );

            //var myProcessor = new ResultsetProcessor( function ( x ) { return x / 16; } );

            var myProcessor = new ResultsetProcessor( function ( x ) { return x/15  - 1 / 15; } );
            
            processObject( myTimCoefficients, myProcessor );

            // alert( "maximum = " + myProcessor.max + ", min = " + myProcessor.min + ", total = " + myProcessor.total );

            return myProcessor.result;
        };
}
function sliderDensity( givenDichotomyId, givenTimId, givenValue )
{
    if( givenValue > 1 || givenValue < -1 ) return 0;
     
    var myDichotomy = reininDichotomies[ givenDichotomyId ];
    var myReininCoef = myDichotomy.tim[ givenTimId ];
    
    // так можно уменьшить относительный вклад 0-й дихотомии:
    // if( givenDichotomyId == 0 ) return ( ( 1 / 10 )* myReininCoef * givenValue + ( 1 / 2 ) ); 
    
    return ( ( 4 / 9 )* myReininCoef * givenValue + ( 1 / 2 ) );
}
function makeReininEngine()
{
    return function ( givenSliderSelection )
        {   
            
            var myResult = new Array(); 
            for( var i = 0; i < 16; i ++ ) myResult[ i ] = 1; 
            var myTotal = 0;   
            for( var myTimId = 0; myTimId < 16; myTimId ++ )
            {
                for( var myDichotomyId = 0; myDichotomyId < 15; myDichotomyId ++ )
                {
                    myResult[ myTimId ] *= sliderDensity( myDichotomyId, myTimId, 
                        givenSliderSelection[ myDichotomyId ] );
                }
                myTotal += myResult[ myTimId ];
            }
            for( var i = 0; i < 16; i ++ ) myResult[ i ] = myResult[ i ] / myTotal;
            return myResult;
        };
}
function ResultsetProcessor( givenAffineTransformation ) 
// считает профиль Таланова (или хрен знает что ещё), а не распределение вероятности на множестве ТИМов
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
    appendUnitRow( myTimToSliderTransformer );
    var mySliderToTimTransformer = transposeMatrix( myTimToSliderTransformer );

//    var mustBeIdentity = productOfMatricies( mySliderToTimTransformer, myTimToSliderTransformer );
//    appendMatrix( document.body, mustBeIdentity );

    return mySliderToTimTransformer;
}
function appendUnitRow( givenMatrix )
{
    var origRows = givenMatrix.length;
    var origCols = givenMatrix[ 0 ].length;
    if( ! origCols ) 
    {
        alert( "appendUnitRow failed: the input " + listObject( givenMatrix ) + " does not seem to be a matrix" );
        return givenMatrix;
    }
    givenMatrix[ origRows ] = new Array();
    for( var i = 0; i < origCols; i ++ )
    {
        givenMatrix[ origRows ][ i ] = 1;
    } 
    return givenMatrix;
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
