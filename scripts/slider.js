addAnEvent( document, 'mousemove', function( givenEvent )
    {
        var mySliderDiv = firstConformingAncestor( getEventOriginator( givenEvent ), isSliderDiv );
        if ( ! mySliderDiv ) return false;  
        mySliderDiv.onchange( givenEvent );
        return true;
    } );



function isSliderDiv( givenElement )
{
    return ( givenElement.className && givenElement.className == "slider" );
}
function Slider( givenMin, givenMax, givenInitialValue, givenUpdateFunction )
{
    this.min = givenMin;
    this.max = givenMax;
    this.val = givenInitialValue;
    this.update = givenUpdateFunction;
    this.relativeValue = function()
        {
            with( this ){ return rescaleToRange( min, max, val ); }
        };
    this.formatedValue = function()
        {
            return roundToDigits( this.val, 3 );
        };
    this.isActive = false;
}
function resyncAll( givenEvent, givenSliderObject, givenSliderDiv, givenKnob )
{    
    var myOffset = givenSliderDiv.offsetLeft;
    var sliderWidth = givenSliderDiv.scrollWidth;
    var knobWidth = givenKnob.scrollWidth;
    var adjustedWidth = sliderWidth - knobWidth;  

    givenKnob.style.left = adjustedWidth * givenSliderObject.relativeValue() + "px";
    givenSliderObject.update( givenSliderObject.formatedValue() );                     

    if( ! ( givenEvent && givenSliderObject.isActive ) ) return;
    
    var myX = givenEvent.clientX; 
    
    var myMin = givenSliderObject.min;
    var myMax = givenSliderObject.max;
    var myRange = myMax - myMin;
       
    var rangeRelativeX = ( myX - myOffset - knobWidth / 2 ) / adjustedWidth;
    givenSliderObject.val = getInRange( myMin, myMax, myMin + myRange * rangeRelativeX );
    
    stopEvent( givenEvent );
}
function appendSlider( givenParent, givenSliderObject, givenUpdateFunction )
{    
    var mySliderDiv     = makeChildElement( givenParent, "div", "slider" );
    var myLeftDiv       = makeChildElement( mySliderDiv, "div", "left" );
    var myRightDiv      = makeChildElement( mySliderDiv, "div", "right" );
    var myKnob          = makeChildElement( mySliderDiv, "img", "knob" );   
    myKnob.src          = lookupPathSliderKnob();

    mySliderDiv.onchange = function( givenEvent ) 
        {
            resyncAll( givenEvent, givenSliderObject, mySliderDiv, myKnob );
        };
    addAnEvent( mySliderDiv, 'mousedown', function( givenEvent )
        {
            givenSliderObject.isActive = true;
            resyncAll( givenEvent, givenSliderObject, mySliderDiv, myKnob );
        });
    addAnEvent( mySliderDiv, 'mouseup', function( givenEvent )
        {
            givenSliderObject.isActive = false;
            stopEvent( givenEvent );
        });   
    mySliderDiv.onchange();
}


