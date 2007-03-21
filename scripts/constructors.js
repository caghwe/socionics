function makeSelector( givenOptionProcessor, givenInitialSelection )
{
    var myParent = document.getElementById( givenOptionProcessor.name );
    var myForm = document.createElement( "<form name='" + givenOptionProcessor.name + "Form'>" );
    myParent.appendChild( myForm );

    var myContent = document.createElement( "<div id='" + givenOptionProcessor.name + "Div'>" );

    var mySelect = document.createElement( "<select name='" + givenOptionProcessor.name + "Select'>" );
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
        var myTimOption = document.createElement( "option" );
        mySelect.appendChild( myTimOption );
        myTimOption.value = i;
        myTimOption.appendChild( document.createTextNode( givenOptionProcessor.caption( i ) ) );
    }
    makeSelection( givenInitialSelection );
}
function removeAllChildren( givenParent )
{
    while( givenParent.hasChildNodes() )
    {
        givenParent.removeChild( givenParent.firstChild );
    }
}
function getAspectIconPath( givenAspect )
{
    return "../layout/" + givenAspect + ".gif";
}
function appendAspectIconById( givenAspectId, givenParent )
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
function appendTable( givenDispatchTable, givenObject, givenParent )
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
