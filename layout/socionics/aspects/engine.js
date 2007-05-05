function lookupPathAspectIcon( givenAspect )
{
    return "../layout/socionics/aspects/images/" + givenAspect + ".gif";
}
function appendPsychicFunctions( givenParent, givenTimId )
{
    removeAllChildren( givenParent );
    
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
function appendRelationMatrix( givenParent, givenTimId )
{
    var myMatrix = linearRepresentation[ givenTimId ].matrix;
    appendMatrix( givenParent, myMatrix );
}
