function TestResultsKeeper()
{
    this.sliders = new Array();
    this.timElements = new Array();
    this.resetSliders = function ( givenTimId )
        {
            for( var i = 0; i < this.sliders.length; i ++ )
            { 
                this.sliders[ i ].setValue( resolveDichotomy( givenTimId, i ) );
            }
        };    
    this.result = function()
        {   
            var myResponses = new Array(); 
            for( var i = 0; i < this.sliders.length; i++ )
            {  
                myResponses[ i ] = this.sliders[ i ].getValue();
            }           
            var myTimDistribution = this.transformer( myResponses );
            for( var i = 0; i < this.timElements.length; i ++ )
            {
                var myElement = this.timElements[ i ];
                var myResult = document.createTextNode( formatFloatOutput( myTimDistribution[ i ] ) )
                appendOnlyChild( myElement, myResult );
            }
        };
    this.bindOutput = function ( givenTimId, givenElement )
        {
            this.timElements[ givenTimId ] = givenElement;
        }
    this.transformer = makeReininEngine();
}
function makeReinin( givenParent, givenTimId )
{  
    var myResultsKeeper = new TestResultsKeeper();
//    makeButton( givenParent, "Подсчитать коэффициенты корреляции", function(){ myResultsKeeper.result(); } ); 

    var myHeaderContainer   = makeChildElement( givenParent,        "div",      "calculator-header" );
 
    var myContainerTable    = makeChildElement( givenParent,        "table",    "container-table" );
    var myContainerBody     = makeChildElement( myContainerTable,   "tbody",    "container-tbody" );   
    var myContainerRow      = makeChildElement( myContainerBody,    "tr",       "container-row" );
    var mySlidersContainer  = makeChildElement( myContainerRow,     "td",       "sliders-container" );
    var myTimsContainer     = makeChildElement( myContainerRow,     "td",       "tims-container" );
                 
    makeDichotomyTable( mySlidersContainer, myResultsKeeper );
    var mySorting = makeTimTable( myTimsContainer, myResultsKeeper );
    makeButton( myHeaderContainer, "Упорядочить ТИМы по убыванию вероятностей", function ()
        {           
            myResultsKeeper.result();
            mySorting();
        } ); 

    myResultsKeeper.result();
    
}
function makeDichotomyTable( givenParent, givenResultsKeeper )
{
    var myTable = makeChildElement( givenParent, "table", "sliders-table" );
    var myBody  = makeChildElement( myTable, "tbody", "sliders-tbody" );
   
    for( var myDichotomyId = 0; myDichotomyId < reininDichotomies.length; myDichotomyId ++ )
    {       
        var myDichotomy = reininDichotomies[ myDichotomyId ];
             
        var myRow = makeChildElement( myBody, "tr", "dichotomy-row" );
        
        var myLeftDichotomy = makeChildElement( myRow, "td", "left-dichotomy" );
        myLeftDichotomy.appendChild( document.createTextNode( myDichotomy.alt[ 0 ] ) );
        var myLeftOutput = makeChildElement( myRow, "td", "left-output" );

        var mySliderContainer = makeChildElement( myRow, "td", "slider-selector" );

        var myRightOutput = makeChildElement( myRow, "td", "right-output" );
        var myRightDichotomy = makeChildElement( myRow, "td", "right-dichotomy" );
        myRightDichotomy.appendChild( document.createTextNode( myDichotomy.alt[ 1 ] ) );
        
        var myUpdater = createSingleSliderResync( givenResultsKeeper, myDichotomyId, myLeftOutput, myRightOutput );
        
        var mySliderObject  = new Slider( -1, 1, 0, myUpdater );
        givenResultsKeeper.sliders[ givenResultsKeeper.sliders.length ] = mySliderObject;
        appendSlider( mySliderContainer, mySliderObject );
    }
}
function makeTimTable( givenParent, givenResultsKeeper )
{
    var myTable = makeChildElement( givenParent, "table", "tims-table" );
    var myBody  = makeChildElement( myTable, "tbody", "tims-tbody" );
    
    for( var myTimId = 0; myTimId < linearRepresentation.length; myTimId ++ )
    {      
        var myRow = makeChildElement( myBody, "tr", "tim-row" );
        var myTimCaption = makeChildElement( myRow, "td", "tim-caption" );
        
        makeButton( myTimCaption, timNameById( myTimId ), createAllSlidersReset( givenResultsKeeper, myTimId ) );
        
        var myTimResult = makeChildElement( myRow, "td", "tim-result" );
        givenResultsKeeper.bindOutput( myTimId, myTimResult );
    }

    return function ()
    {
        var mySortedRows = load_collection_to_array( myBody.childNodes ).sort( sortByProbability ); 
        removeAllChildren( myBody );
        for( var i = 0; i < mySortedRows.length; i ++ )
        {
            myBody.appendChild( mySortedRows[  i ] );
        } 
    }
}
function load_collection_to_array( givenCollection )
{
    var newArray = new Array();
    for( var i = 0; i < givenCollection.length; i++ )
    {
        newArray[ i ] = givenCollection.item( i );
    }
    return newArray;
}
function readNumber( givenRow )
{
            
    var myCell = first_child_with_className( givenRow, "tim-result" );
    var myText = ( document.all? myCell.innerText : myCell.textContent );
    myText.match( /^(\d*)%$/ );
    return parseFloat( RegExp.$1 );
}
function sortByProbability( rowA, rowB )
{
    var a = readNumber( rowA );
    var b = readNumber( rowB );

    return ( (a < b) ? 1 : ((a > b) ? -1 : 0));
}
function createSingleSliderResync( givenResultsKeeper, givenDichotomyId, givenLeft, givenRight )
{
    return function ( givenValue ) 
        { 
            givenLeft.innerHTML  = formatFloatOutput( givenValue > 0 ? 0 : - givenValue ); 
            givenRight.innerHTML = formatFloatOutput( givenValue > 0 ? givenValue : 0 );
            //
            givenResultsKeeper.result();
        };
}
function createAllSlidersReset( givenResultsKeeper, givenTimId )
{
    return function () 
        {
            givenResultsKeeper.resetSliders( givenTimId );
        };
}
function makeButton( givenParent, givenCaption, givenUpdateFunction )
{
    var mySubmit = makeChildElement( givenParent, "div", "submit-button" );
    mySubmit.appendChild( document.createTextNode( givenCaption ) );
    mySubmit.onclick = givenUpdateFunction;
}
function formatFloatOutput( givenFloat )
{
    return Math.round( givenFloat * 100 ) + "%";
}
function roundFloat( givenFloat )
{
    return roundToDigits( givenFloat, 2 );
}
