function makeChildElement( givenParent, givenTagName, givenClassName )
{
    var myChild = document.createElement( givenTagName );
    givenParent.appendChild( myChild );
    myChild.className = givenClassName;
    return myChild;
}
function first_child_with_className( givenParent, givenClassName )
{
    for ( var i=0; i < givenParent.childNodes.length; i++ )
    {
        var currentChild = givenParent.childNodes[ i ];
        if( currentChild.className == givenClassName ) return currentChild;
    }
    return null;
}
function firstConformingAncestor( givenElement, givenTest )
{
    if( ! givenElement ) return null;
    if( givenTest( givenElement ) ) return givenElement;
    return firstConformingAncestor( givenElement.parentNode, givenTest );
}
function array_elements_by_name_with_className( givenElementName, givenClassName )
{
    // can I use XPath here?
    var newArray = new Array();
    var elementsWithGivenClassName = document.getElementsByTagName( givenElementName );
    for( var i = 0; i < elementsWithGivenClassName.length; i++ )
    {
        var currentElement = elementsWithGivenClassName.item( i );
        if( currentElement.className == givenClassName )
        {
            newArray[ newArray.length ] = currentElement;
        }
    }
    return newArray;
}
function array_elements_with_className( givenClassName )
{
    var myArray = new Array();
    var myElements = ( document.getElementsByTagName('*') ? document.getElementsByTagName('*') : document.all );
    for( var i = 0; i < myElements.length; i++ )
    {
        var currentElement = myElements.item( i );
        if( currentElement.className == givenClassName )
        {
            myArray[ myArray.length ] = currentElement;
        }
    }
    return myArray;
}
function removeAllChildren( givenParent )
{
    while( givenParent.hasChildNodes() )
    {
        givenParent.removeChild( givenParent.firstChild );
    }
}
function appendOnlyChild( givenParent, givenChild )
{
    removeAllChildren( givenParent );
    givenParent.appendChild( givenChild );
}
