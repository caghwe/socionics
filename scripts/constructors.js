function appendPsychicFunctions( givenParent, givenTimId )
{
    var myTable = makeChildElement( givenParent, "table", "psychic-functions-table" );
    var myTBody = makeChildElement( myTable, "tbody", "psychic-functions-tbody" );
    
    var myTHead = makeChildElement( myTable, "thead", "psychic-functions-headers" );
    var myTHeadRow = makeChildElement( myTHead, "tr", "psychic-functions-header-row" );
    
    var myNameHeader = makeChildElement( myTHeadRow, "td", "psychic-functions-header-name" );
    myNameHeader.appendChild( document.createTextNode( "Психо-функция" ) );
    
    var myDimensionHeader = makeChildElement( myTHeadRow, "td", "psychic-functions-header-dim" );
    myDimensionHeader.appendChild( document.createTextNode( "Размерность" ) );

    var myAspectHeader = makeChildElement( myTHeadRow, "td", "psychic-functions-header-aspect" );
    myAspectHeader.appendChild( document.createTextNode( "Заполняющий аспект" ) );  
      
    for( var i = 0; i < psychicFunctions.length; i++ ) 
    {
        var myFunction = psychicFunctions[ i ];
        var myRow = makeChildElement( myTBody, "tr", "psychic-functions-row" );
        
        var myName = makeChildElement( myRow, "td", "psychic-function-name" );
        myName.appendChild( document.createTextNode( myFunction.name ) );
        
        var myDimension = makeChildElement( myRow, "td", "psychic-function-dimension" );
        myDimension.appendChild( document.createTextNode( myFunction.dimension + 1 ) );
        
        var myAspect = makeChildElement( myRow, "td", "psychic-function-aspect" );
        myAspect.appendChild( document.createTextNode( getAspectName( givenTimId, i ) ) );
    }
}
function appendAspects( givenParent )
{
    for( var myAspectId = 0; myAspectId < psychicFunctions.length; myAspectId ++ )
    {
        appendAspectIconById( givenParent, myAspectId );
    }
}
function readSelectedMatrix( givenName )
{
    var mySelector =  document.getElementById( givenName + "Select" );
    if( mySelector )
    {
        var myId = mySelector.selectedIndex;
        var myMatrix = linearRepresentation[ myId ].matrix;
        return myMatrix;
    }
}
function makeSelector( givenOptionProcessor, givenInitialSelection )
{
    var myParent = document.getElementById( givenOptionProcessor.name );
    var myForm      = document.createElement( "form" );
    myForm.name = givenOptionProcessor.name + "Form";
    myForm.id = givenOptionProcessor.name + "Form";
    
    var myContent   = document.createElement( "div" );
    myContent.id = givenOptionProcessor.name + "Div";
    
    var mySelect    = document.createElement( "select" );
    mySelect.name = givenOptionProcessor.name + "Select";
    mySelect.id = givenOptionProcessor.name + "Select";
    
    myParent.appendChild( myForm );
    myForm.appendChild( mySelect );
    myForm.appendChild( myContent );
    function makeSelection( givenOption )
    {
        removeAllChildren( myContent );
        givenOptionProcessor.action( givenOption, myContent );
        mySelect.selectedIndex = givenOption;
    }
    mySelect.onchange = function () { makeSelection( mySelect.selectedIndex ); };
    for( i = 0; i < linearRepresentation.length; i ++ )
    {
        var myOption = document.createElement( "option" );
        mySelect.appendChild( myOption );
        myOption.value = i;
        myOption.appendChild( document.createTextNode( givenOptionProcessor.caption( i ) ) );
    }
    makeSelection( givenInitialSelection );
}
function appendAspectIconById( givenParent, givenAspectId )
{
    var myDiv = document.createElement( "div" );
    givenParent.appendChild( myDiv );

    var myAspectPictureSrc = lookupPathAspectIcon( psychicFunctions[ givenAspectId ].aspectId );
    var myAspectName = " - " + psychicFunctions[ givenAspectId ].aspectDescription;

    var myImage = document.createElement( "img" );
    myDiv.appendChild( myImage );
    myImage.src = myAspectPictureSrc;

    myDiv.appendChild( document.createTextNode( myAspectName ) );
}
function appendTable( givenParent, givenDispatch )
{
    var myContainer     = makeChildElement( givenParent,    "div",      "dispatch-container" );
    var myTable         = makeChildElement( myContainer,    "table",    "dispatch-table" );
    var myTBody         = makeChildElement( myTable,        "tbody",    "dispatch-body" );

    for( var i = 0; i < givenDispatch.rowCount; i ++ )
    {
        var myRow       = makeChildElement( myTBody,        "tr",       "dispatch-row" );
        for( var j = 0; j < givenDispatch.columnCount; j ++ )
        {
            var myCell  = makeChildElement( myRow,          "td",       "dispatch-cell" );
            givenDispatch.appendEntry( myCell, i, j );
        }
    }
}
function MatrixDrawingDispatch( givenMatrix )
{
    this.rowCount = givenMatrix.length;
    this.columnCount = givenMatrix[ 0 ].length + 2;
    this.appendEntry = function ( givenParent, givenRowIndex, givenColumnIndex )
        {
            if( givenColumnIndex == 0 )
            {
                givenParent.className = ( ( givenRowIndex == 0 )? "upper-left-corner" : 
                    ( ( givenRowIndex == givenMatrix.length - 1 ) ? "lower-left-corner" : "left-border" ) );
                givenParent.appendChild( document.createTextNode( " " ) );
                return;
            }
            if( givenColumnIndex == givenMatrix[ 0 ].length + 1 )
            {
                givenParent.className = ( ( givenRowIndex == 0 )? "upper-right-corner" : 
                    ( ( givenRowIndex == givenMatrix.length - 1 ) ? "lower-right-corner" : "right-border" ) );
                givenParent.appendChild( document.createTextNode( " " ) );
                return;
            } 
            var myMatrixEntry = givenMatrix[ givenRowIndex ][ givenColumnIndex - 1 ];
            givenParent.appendChild( document.createTextNode( myMatrixEntry ) );
        };
}     
function appendRelationMatrix( givenParent, givenTimId )
{
    var myMatrix = linearRepresentation[ givenTimId ].matrix;
    appendMatrix( givenParent, myMatrix );
}
function appendMatrix( givenParent, givenMatrix )
{
    var myDispatch = new MatrixDrawingDispatch( givenMatrix );
    appendTable( givenParent, myDispatch );
}
function appendCube( givenParent, givenTimId )
{
    function fillAspect( givenFunctionNumber )
        {
            return function( aParent )
                {   
                    var myContainer = makeChildElement( aParent, "span", "vertex-container" );
                    
                    var myImage = makeChildElement( myContainer, "img", "aspect-image" );
                    myImage.src = lookupPathAspectIcon( getAspectIconName( givenTimId, givenFunctionNumber ) );  

                    var mySub = makeChildElement( myContainer, "sub", "aspect-index" );
                    mySub.appendChild( document.createTextNode(  givenFunctionNumber + 1 ) );
                };
        };
    var myDispatchTable =
        [
            [ fillB,         fillB, fillAspect(5), fillH, fillH, fillH,         fillH, fillAspect(4) ],
            [ fillB,         fillD, fillV,         fillB, fillB, fillB,         fillD, fillV         ],
            [ fillAspect(6), fillH, fillH,         fillH, fillH, fillAspect(7), fillB, fillV         ],
            [ fillV,         fillB, fillV,         fillB, fillB, fillV,         fillB, fillV         ],
            [ fillV,         fillB, fillAspect(3), fillH, fillH, fillV,         fillH, fillAspect(2) ],
            [ fillV,         fillD, fillB,         fillB, fillB, fillV,         fillD, fillB         ],
            [ fillAspect(0), fillH, fillH,         fillH, fillH, fillAspect(1), fillB, fillB         ]
        ];
    function CubeDrawingDispatch( timId )
    {
        this.rowCount = myDispatchTable.length;
        this.columnCount = myDispatchTable[ 0 ].length;
        this.appendEntry = function ( givenParent, givenRowIndex, givenColumnIndex )
            {
                myDispatchTable[ givenRowIndex ][ givenColumnIndex ]( givenParent );
            };
    }
    var myCubeDrawingDispatch = new CubeDrawingDispatch( givenTimId );
    appendTable( givenParent, myCubeDrawingDispatch );
}
function fillB( givenParent )
{
    givenParent.appendChild( document.createTextNode( " " ) );
}
function fillD( givenParent )
{
    givenParent.appendChild( document.createTextNode( "/" ) );
}
function fillV( givenParent )
{
    givenParent.appendChild( document.createTextNode( "|" ) );
}
function fillH( givenParent )
{
    givenParent.appendChild( document.createTextNode( "-" ) );
}
