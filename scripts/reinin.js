function makeReinin( givenParent, givenTimId )
{   
    makeButton( givenParent, "Подсчитать барицентрические коэффициенты", function(){ myTestResults.result(); } );                   
    var myContainerTable    = makeChildElement( givenParent, "table", "container-table" );
    var myContainerBody     = makeChildElement( myContainerTable, "tbody", "container-tbody" );   
    var myContainerRow      = makeChildElement( myContainerBody, "tr", "container-row" );
    var mySlidersContainer   = makeChildElement( myContainerRow, "td", "sliders-container" );
    var myTimsContainer     = makeChildElement( myContainerRow, "td", "tims-container" );
                 
    var myTestResults = new TestResultsKeeper();
    makeDichotomyTable( mySlidersContainer, myTestResults, givenTimId );
    function makeSlidersUpdater( givenTimId )
    {
        return function ()
            {
                removeAllChildren( givenParent );
                makeReinin( givenParent, givenTimId );
            };
    };
    makeTimTable( myTimsContainer, myTestResults, makeSlidersUpdater );
}
function makeDichotomyTable( givenParent, givenResultsKeeper, givenTimId )
{
    var myDichotomyTable = makeChildElement( givenParent, "table", "sliders-table" );
    var myBody  = makeChildElement( myDichotomyTable, "tbody", "sliders-tbody" );
   
    for( var myDichotomyId = 0; myDichotomyId < reininDichotomies.length; myDichotomyId ++ )
    {            
        var myRow = makeChildElement( myBody, "tr", "dichotomy" );
        var myDichotomy = reininDichotomies[ myDichotomyId ]; 
        
        var myLeftAlternative = makeChildElement( myRow, "td", "left-alternative" );
        myLeftAlternative.appendChild( document.createTextNode( myDichotomy.alt[ 0 ] ) );
        var myLeftOutput = makeChildElement( myLeftAlternative, "div", "left-output" );

        var mySlider = makeChildElement( myRow, "td", "slider-selector" );

        var myRightAlternative = makeChildElement( myRow, "td", "right-alternative" );
        myRightAlternative.appendChild( document.createTextNode( myDichotomy.alt[ 1 ] ) );
        var myRightOutput = makeChildElement( myRightAlternative, "div", "right-output" );
        
        var myUpdater = createUpdater( givenResultsKeeper, myDichotomyId, myLeftOutput, myRightOutput );

        var myAlternative = ( givenTimId >= 0 ? resolveDichotomy( givenTimId, myDichotomyId ) : 0 );
        var mySliderObject  = new Slider( -1, 1, myAlternative, myUpdater );
        appendSlider( mySlider, mySliderObject, myUpdater );
    }
}
function createUpdater( givenResultsKeeper, givenDichotomyId, givenLeft, givenRight )
{
    return function ( givenValue ) 
        { 
            givenLeft.innerHTML     = "[ " + ( givenValue > 0 ? 0 : - givenValue ) + " ]"; 
            givenRight.innerHTML    = "[ " + ( givenValue > 0 ? givenValue : 0 ) + " ]";
            givenResultsKeeper.setSliderSelections( givenDichotomyId, givenValue );
        };
}
function TestResultsKeeper()
{
    this.sliderSelections = new Array();
    this.timSignalElements = new Array();
    this.setSliderSelections = function ( givenDichotomyId, givenValue )
        {
            this.sliderSelections[ givenDichotomyId ] = givenValue;
        };
    this.inform = function() { return listObject( this.sliderSelections ); };
    this.result = function()
        {            
            this.sliderSelections[ 15 ]  = 1;
            var myTimDistribution = transformPoint( this.transformer, this.sliderSelections );
            var myScalingFactor = 16;
            
            var myMin = 100;
            var myMax = -100;
            var myTotal = 0;
            
//            alert( "the tim distribution is " + listObject( mytimSignalElements ) );

            for( var i = 0; i < this.timSignalElements.length; i ++ )
            {
                var myElement = this.timSignalElements[ i ];
                removeAllChildren( myElement );            
                var myTimProbability = roundToDigits( myTimDistribution[ i ] / 16, 3  );
                
                myMin = ( myMin > myTimProbability ? myTimProbability : myMin );
                myMax = ( myMax < myTimProbability ? myTimProbability : myMax );
                myTotal += myTimProbability;
                
                myElement.appendChild( document.createTextNode( myTimProbability ) );
            }
//            alert( "The range is [ " + myMin + ", " + myMax + " ] and total is " + myTotal );
//            alert( "Processed " + this.timSignalElements.length + " tims for the distribution of dichotomies\n" + this.inform() );    
        };
    this.bindOutput = function ( givenTimId, givenElement )
        {
            this.timSignalElements[ givenTimId ] = givenElement;
        }
    this.transformer = makeReininTimToDichotomyTransformer();
}
function makeTimTable( givenParent, givenResultsKeeper, givenUpdateFunction )
{
    var myTable = makeChildElement( givenParent, "table", "tims-table" );
    var myBody  = makeChildElement( myTable, "tbody", "tims-tbody" );
    
    for( var myTimId = 0; myTimId < linearRepresentation.length; myTimId ++ )
    {      
        var myRow = makeChildElement( myBody, "tr", "tim-row" );
        var myTimCaption = makeChildElement( myRow, "td", "tim-caption" );
        makeButton( myTimCaption, timNameById( myTimId ), givenUpdateFunction( myTimId ) );
        var myTimResult = makeChildElement( myRow, "td", "tim-result" );
        givenResultsKeeper.bindOutput( myTimId, myTimResult );
    }
}
function makeButton( givenParent, givenCaption, givenUpdateFunction )
{
    var mySubmit = makeChildElement( givenParent, "div", "submit-button" );
    mySubmit.appendChild( document.createTextNode( givenCaption ) );
    mySubmit.onclick = givenUpdateFunction;
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
    return myMatrix
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
