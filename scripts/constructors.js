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
function getAspectIconPath( givenAspect )
{
    return "../images/" + givenAspect + ".gif";
}
function appendAspectIconById( givenParent, givenAspectId )
{
    var myDiv = document.createElement( "div" );
    givenParent.appendChild( myDiv );

    var myAspectPictureSrc = getAspectIconPath( psychicFunctions[ givenAspectId ].aspectId );
    var myAspectName = " - " + psychicFunctions[ givenAspectId ].aspectDescription;

    var myImage = document.createElement( "img" );
    myDiv.appendChild( myImage );
    myImage.src = myAspectPictureSrc;

    myDiv.appendChild( document.createTextNode( myAspectName ) );
}
function appendTable( givenParent, givenDispatchTable, givenObject )
{
    var myTable = document.createElement( "table" );
    givenParent.appendChild( myTable );
//    myTable.style[ "display" ] = "inline";

    var myTableBody = document.createElement( "tbody" );
    myTable.appendChild( myTableBody );

    for( var i = 0; i < givenDispatchTable.length; i ++ )
    {
        var myRow = document.createElement( "tr" );
        myTableBody.appendChild( myRow );
        for( var j = 0; j < givenDispatchTable[0].length; j ++ )
        {
            var myCell = document.createElement( "td" );
            myRow.appendChild( myCell );
            givenDispatchTable[i][j]( givenObject, myCell );
        }
    }
}
function appendMatrix( givenParent, givenTimId )
{
    var myDispatchTable = fillInMatrix();
    appendTable( givenParent, myDispatchTable, givenTimId );
}
function fillInMatrix()
{
    var myDispatchTable =
        [
            [ fillV, fillMatrixEntry(0,0), fillMatrixEntry(0,1), fillMatrixEntry(0,2), fillV ],
            [ fillV, fillMatrixEntry(1,0), fillMatrixEntry(1,1), fillMatrixEntry(1,2), fillV ],
            [ fillV, fillMatrixEntry(2,0), fillMatrixEntry(2,1), fillMatrixEntry(2,2), fillV ]
        ];
    return myDispatchTable;
}
function fillMatrixEntry( givenRow, givenColumn )
{
    return function ( givenTimId, givenParent )
        {
            var myMatrix = linearRepresentation[ givenTimId ].matrix;
            givenParent.appendChild( document.createTextNode(  myMatrix[ givenRow ][ givenColumn ] ) );
        };
}
function fillB( givenTimId, givenParent )
{
    givenParent.appendChild( document.createTextNode( " " ) );
}
function fillD( givenTimId, givenParent )
{
    givenParent.appendChild( document.createTextNode( "/" ) );
}
function fillV( givenTimId, givenParent )
{
    givenParent.appendChild( document.createTextNode( "|" ) );
}
function fillH( givenTimId, givenParent )
{
    givenParent.appendChild( document.createTextNode( "--" ) );
}
