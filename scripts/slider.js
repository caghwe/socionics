addAnEvent( document, 'mousemove', function( givenEvent )
    {
        var mySliderDiv = firstConformingAncestor( getEventOriginator( givenEvent ), isSliderDiv );
        if ( ! mySliderDiv ) return false;  
        mySliderDiv.onchange( givenEvent );
        return true;
    } );
    
    
    
function isSliderDiv( givenElement )
{
    return ( givenElement && givenElement.className && givenElement.className == "slider" );
}
function Slider( givenMin, givenMax, givenInitialValue, givenFunction )
{
    this.min = givenMin;
    this.max = givenMax;
    this.val = givenInitialValue;
    this.notify = givenFunction;
    
    this.container = null;
    this.knob = null;

    this.active = false;
    this.activate = function() { this.active = true; };
    this.deactivate = function() { this.active = false; };

    this.resync = function () 
        {   
            with( this )
            {
                var adjustedWidth = container.scrollWidth - knob.scrollWidth; 
                knob.style.left = adjustedWidth * rescaleToRange( min, max, val )  + "px";
                notify( val );
            }                     
        };
    this.update = function ( givenEvent )
        {                   
            if( ! ( givenEvent && givenEvent.clientX && this.active ) ) return;
            with( this )
            {
                var adjustedOffset = container.offsetLeft + knob.scrollWidth / 2;
                var adjustedWidth = container.scrollWidth - knob.scrollWidth;
                var rangeRelativeX = ( givenEvent.clientX - adjustedOffset ) / adjustedWidth;

                val = checkedInRange( min, max, min + ( max - min ) * rangeRelativeX );
            }
            stopEvent( givenEvent );
        };
}

function appendSlider( givenParent, givenSliderObject )
{    
    var mySliderDiv     = makeChildElement( givenParent, "div", "slider" );
    var myLeftDiv       = makeChildElement( mySliderDiv, "div", "left" );
    var myRightDiv      = makeChildElement( mySliderDiv, "div", "right" );
    var myKnob          = makeChildElement( mySliderDiv, "img", "knob" );   
    myKnob.src          = lookupPathSliderKnob();
    
    with( givenSliderObject )
    {
        container = mySliderDiv;
        knob = myKnob;
    
        var resyncUpdate = function ( givenEvent ) { resync(); update( givenEvent ); };
        
        mySliderDiv.onchange = resyncUpdate;
        
        addAnEvent( mySliderDiv, 'mousedown', function( givenEvent ) 
            { 
                activate();   
                resyncUpdate( givenEvent ); 
            } );
            
        addAnEvent( mySliderDiv, 'mouseup',   function( givenEvent ) 
            { 
                deactivate(); 
                resyncUpdate( givenEvent ); 
            } );
            
        resyncUpdate();
    } 
}
