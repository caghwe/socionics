function initializeClickOnPageLoadItems()
{
    var myElements = array_elements_with_className( "clicked-onpageload" );
    apply_to_array( myElements, clickElement );
}
function clickElement( givenArrayIndex, givenElement )
{
    if( ! givenElement.onclick )
    {
        alert( "clickElement failed on " + givenElement.outerHTML + " - no onclick set!" );
    }
    givenElement.onclick();
    givenElement.onclick = null;
    givenElement.removeAttribute( "onclick" );
}
