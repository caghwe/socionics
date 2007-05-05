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
    this.distribution = function()
        {
            var myResponses = new Array();
            for( var i = 0; i < this.sliders.length; i++ )
            {
                myResponses[ i ] = this.sliders[ i ].getValue();
            }
            return this.transformer( myResponses );
        };
    this.result = function()
        {
            var myTimDistribution = this.distribution();
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
function RelationKeeper()
{
    this.relElements = new Array();
    this.bindOutput = function ( givenRelId, givenElement )
        {
            this.relElements[ givenRelId ] = givenElement;
        }
    this.distribution = function( yourDistribution, partnerDistribution )
        {
            var relationsDistribution = new Array( linearRepresentation.length );
            for( var myRelId = 0; myRelId < linearRepresentation.length; myRelId ++ )
            {
                relationsDistribution[ myRelId ] = 0;
            }
            for( var yourTimId = 0; yourTimId < linearRepresentation.length; yourTimId ++ )
            {
                var yourMatrix = linearRepresentation[ yourTimId ].matrix;
                for( var partnerTimId = 0; partnerTimId < linearRepresentation.length; partnerTimId ++ )
                {
                    var partnerMatrix = linearRepresentation[ partnerTimId ].matrix;
                    var myResultMatrix  = productOfMatricies( partnerMatrix, transposeMatrix( yourMatrix ) );
                    var myRelationId = lookupRelationId( myResultMatrix );

                    relationsDistribution[ myRelationId ] += yourDistribution[ yourTimId ] * partnerDistribution[ partnerTimId ];
                }
            }
            return relationsDistribution;
        };
    this.result = function( yourDistribution, partnerDistribution )
        {
            var myRelationDistribution = this.distribution( yourDistribution, partnerDistribution );
            for( var i = 0; i < this.relElements.length; i ++ )
            {
                var myElement = this.relElements[ i ];
                var myResult = document.createTextNode( formatFloatOutput( myRelationDistribution[ i ] ) )
                appendOnlyChild( myElement, myResult );
            }
        };
}
function makeMutualReinin( givenParent, givenTimId )
{
    var yourResultsKeeper = new TestResultsKeeper();
    var partnerResultsKeeper = new TestResultsKeeper();
    var myRelationsKeeper = new RelationKeeper()

    var myHeaderContainer   = makeChildElement( givenParent,        "div",      "calculator-header" );

    var myContainerTable    = makeChildElement( givenParent,        "table",    "container-table" );
    var myContainerBody     = makeChildElement( myContainerTable,   "tbody",    "container-tbody" );

    var yourHeaderRow      = makeChildElement( myContainerBody,    "tr",       "header-row" );
    var yourHeader  = makeChildElement( yourHeaderRow,     "td",       "header-cell" );
    yourHeader.colSpan = 2;
    yourHeader.appendChild( document.createTextNode( "Ваш выбор" ) );

    var yourContainerRow      = makeChildElement( myContainerBody,    "tr",       "container-row" );
    var yourSlidersContainer  = makeChildElement( yourContainerRow,     "td",       "sliders-container" );
    var yourTimsContainer     = makeChildElement( yourContainerRow,     "td",       "tims-container" );

    var partnerHeaderRow      = makeChildElement( myContainerBody,    "tr",       "header-row" );
    var partnerHeader  = makeChildElement( partnerHeaderRow,     "td",       "header-cell" );
    partnerHeader.colSpan = 2;
    partnerHeader.appendChild( document.createTextNode( "Выбор Вашего партнёра" ) );

    var partnerContainerRow      = makeChildElement( myContainerBody,    "tr",       "container-row" );
    var partnerSlidersContainer  = makeChildElement( partnerContainerRow,     "td",       "sliders-container" );
    var partnerTimsContainer     = makeChildElement( partnerContainerRow,     "td",       "tims-container" );

    var relationHeaderRow      = makeChildElement( myContainerBody,    "tr",       "header-row" );
    var relationHeader  = makeChildElement( relationHeaderRow,     "td",       "header--cell" );
    relationHeader.colSpan = 2;

    appendDichotomyTable( yourSlidersContainer, yourResultsKeeper );
    var yourTimTable = makeTimTable( yourTimsContainer, yourResultsKeeper );
    var yourSorting = makeTableSorter( yourTimTable, sortByProbability );

    appendDichotomyTable( partnerSlidersContainer, partnerResultsKeeper );
    var partnerTimTable = makeTimTable( partnerTimsContainer, partnerResultsKeeper );
    var partnerSorting = makeTableSorter( partnerTimTable, sortByProbability );

    var myRelationTable = makeRelationsTable( givenParent, myRelationsKeeper );
    var relationSorting = makeTableSorter( myRelationTable, sortByProbability );

    appendButton( relationHeader, "Подсчитать кем Ваш партнёр является по отношению к Вам", function ()
        {
            yourSorting();
            partnerSorting();
            myRelationsKeeper.result( yourResultsKeeper.distribution(), partnerResultsKeeper.distribution() );
            relationSorting();
        } );

    yourResultsKeeper.result();
    partnerResultsKeeper.result();
    myRelationsKeeper.result( yourResultsKeeper.distribution(), partnerResultsKeeper.distribution() );
}
function makeReinin( givenParent, givenTimId )
{
    var myHeaderContainer   = makeChildElement( givenParent,        "div",      "calculator-header" );
    var myContainerTable    = makeChildElement( givenParent,        "table",    "container-table" );
    var myContainerBody     = makeChildElement( myContainerTable,   "tbody",    "container-tbody" );
    var myContainerRow      = makeChildElement( myContainerBody,    "tr",       "container-row" );
    var mySlidersContainer  = makeChildElement( myContainerRow,     "td",       "sliders-container" );
    var myTimsContainer     = makeChildElement( myContainerRow,     "td",       "tims-container" );

    var myResultsKeeper = new TestResultsKeeper();
    appendDichotomyTable( mySlidersContainer, myResultsKeeper );
    var myTimTable = makeTimTable( myTimsContainer, myResultsKeeper );
    var mySorting = makeTableSorter( myTimTable, sortByProbability );
    appendButton( myHeaderContainer, "Упорядочить ТИМы по убыванию вероятностей", mySorting );
//    appendButton( myHeaderContainer, "Подсчитать коэффициенты корреляции", function(){ myResultsKeeper.result(); } );

    myResultsKeeper.result();
}
function appendDichotomyTable( givenParent, givenResultsKeeper )
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

        appendButton( myTimCaption, timNameById( myTimId ), createAllSlidersReset( givenResultsKeeper, myTimId ) );

        var myTimResult = makeChildElement( myRow, "td", "tim-result" );
        givenResultsKeeper.bindOutput( myTimId, myTimResult );
    }
    return myTable;
}
function makeRelationsTable( givenParent, givenRelationsKeeper )
{
    var myTable = makeChildElement( givenParent, "table", "relations-table" );
    var myBody  = makeChildElement( myTable, "tbody", "relations-tbody" );

    for( var myRelId = 0; myRelId < linearRepresentation.length; myRelId ++ )
    {
        var myRow = makeChildElement( myBody, "tr", "rel-row" );
        var myRelationCaption = makeChildElement( myRow, "td", "rel-caption" );

//        appendButton( myTimCaption, timNameById( myTimId ), createAllSlidersReset( givenResultsKeeper, myTimId ) );
        myRelationCaption.appendChild( document.createTextNode( relationNameById( myRelId ) ) );

        var myRelationResult = makeChildElement( myRow, "td", "rel-result" );
        givenRelationsKeeper.bindOutput( myRelId, myRelationResult );
    }
    return myTable;
}

function makeTableSorter( givenTable, givenComparisonFunction )
{
    var myBody = givenTable.firstChild;
    if( myBody.tagName != "TBODY" )
    {
        alert( myBody.tagName + " is not a table body" );
        return null;
    }
    return function ()
    {
        var mySortedRows = load_collection_to_array( myBody.childNodes ).sort( givenComparisonFunction );
        removeAllChildren( myBody );
        for( var i = 0; i < mySortedRows.length; i ++ )
        {
            myBody.appendChild( mySortedRows[ i ] );
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
function readSecondColumn( givenRow )
{
    var myCell = givenRow.childNodes.item( 1 );
    var myText = ( document.all? myCell.innerText : myCell.textContent );
    myText.match( /^(\d*)%$/ );
    return parseFloat( RegExp.$1 );
}
function sortByProbability( rowA, rowB )
{
    var a = readSecondColumn( rowA );
    var b = readSecondColumn( rowB );

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
function appendButton( givenParent, givenCaption, givenUpdateFunction )
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
