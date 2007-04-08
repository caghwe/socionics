function Lister()
{
    this.message = "";
    this.processValue = function( givenKey, givenValue, givenLevel )
        {
            if( !givenLevel ) givenLevel = 0;
            this.message += repeatString( " ", givenLevel*4 ) + givenKey + " = " + givenValue + "\n";
        };
    this.processKey = function( givenKey, givenLevel )
        {
            if( !givenLevel ) givenLevel = 0;
            this.message += repeatString( " ", givenLevel*4 ) + givenKey + " =\n";
        };
}
function listObject( givenObject )
{
    var myLister = new Lister();
    processObject( givenObject, myLister );
    return( myLister.message );
}
function processObject( givenObject, givenProcessor, givenLevel )
{
    if( !givenLevel ) givenLevel = 0;
    if( ! isObject( givenObject ) )
    {
        alert( "processObject failed: " + givenObject + " is not an object!" );
        return;
    }
    for( var myKey in givenObject )
    {
        if( isObject( givenObject[ myKey ]) )
        {
            givenProcessor.processKey( myKey, givenLevel );
            processObject( givenObject[ myKey ], givenProcessor, givenLevel + 1 );
        }
        else
        {
            givenProcessor.processValue( myKey, givenObject[ myKey ], givenLevel );
        }
    }
}
function apply_to_array( givenArray, givenFunction )
{
    for( var i = 0; i < givenArray.length; i++ )
    {
        givenFunction( i, givenArray[ i ] );
    }
}

function rescaleToRange( givenMin, givenMax, givenValue )
{
    var myValue = checkedInRange( givenMin, givenMax, givenValue );
    return ( myValue - givenMin )/( givenMax - givenMin );
}
function checkedInRange( givenMin, givenMax, givenValue )
{
    return ( givenMax < givenValue ? givenMax : (givenMin > givenValue ? givenMin : givenValue ) );
}
function isObject( givenObject) 
{
    return (  ( typeof givenObject ) == 'object' );
}
function isArray( givenObject )
{
    if( typeof givenObject == 'object' )
    {
        return ( givenObject.constructor.toString().match( /array/i ) != null );
    }
    return false;
}
function isString( givenObject )
{
    if( typeof givenObject == 'string' ) return true;
    if( typeof givenObject == 'object')
    {
        return ( givenObject.constructor.toString().match( /string/i ) != null);
    }
    return false;
}
function roundToDigits( givenFloat, givenDecimalLength )
{
    var myExponent = Math.pow( 10, givenDecimalLength );
    return Math.round( givenFloat * myExponent ) / myExponent;
}
function formatDecimal( givenFloat, givenDecimalLength )
{
    var myString = ( roundToDigits( givenFloat, givenDecimalLength  ) ).toString();
    var myMatchIndex = myString.indexOf( "." );
    if( myMatchIndex >=0 ) return myString + repeatString( "0", givenDecimalLength + 1 + myMatchIndex - myString.length );
    return myString + "." + repeatString( "0", givenDecimalLength );
}  
function repeatString( givenString, givenTimes )
{
    var myResult = "";
    for( var i = 0; i < givenTimes; i ++ ) myResult += givenString;
    return myResult;
}
