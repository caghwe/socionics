function addAnEvent( givenElement, givenEventName, givenFunction )
{
    if( givenElement.attachEvent)
    {   // IE
        givenElement.attachEvent( "on" + givenEventName, givenFunction );
    }
    else if ( givenElement.addEventListener )
    {   // Gecko / W3C
        givenElement.addEventListener( givenEventName, givenFunction, true );
    }
    else
    {
        givenElement[ "on" + givenEventName ] = givenFunction;
    }
}
function stopEvent( givenEvent )
{
    if ( givenEvent.preventDefault )
    {
        givenEvent.preventDefault();
        givenEvent.stopPropagation();
    }
    else
    {
        givenEvent.returnValue = false;
        givenEvent.cancelBubble = true;
    }
}
function getEventOriginator( givenEvent )
{
    myEvent = ( givenEvent? givenEvent : window.event );
    if( ! myEvent ) return null;
    return ( myEvent.target? myEvent.target : myEvent.srcElement );
}
