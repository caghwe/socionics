function appendCubeSelector( givenParent, givenInitialSelection )
{   
    function timCubeOptionMaker()
    {
        this.range = linearRepresentation.length;
        this.caption = function ( givenTimId ) { return timFullNameById( givenTimId ) };
    }
    var timOptions = new timCubeOptionMaker();
    var mySelector = makeSelectorNEW( givenParent, timOptions );

    var myTable = makeChildElement( givenParent, "table", "container-table" );
    var myTBody = makeChildElement( myTable, "tbody", "container-tbody" );

    var myRow = makeChildElement( myTBody, "tr", "container-row" );
    var myCube = makeChildElement( myRow, "td", "container-cube" );
    var myAspects = makeChildElement( myRow, "td", "container-aspects" );

    function makeTimCubeSelection( givenTimId )
    {
        removeAllChildren( myCube );
        appendCube( myCube, givenTimId );
        
        removeAllChildren( myAspects );
        appendPsychicFunctions( myAspects, givenTimId );
        
        mySelector.selectedIndex = givenTimId;
    }
    mySelector.onchange = function () 
    { 
        makeTimCubeSelection( mySelector.selectedIndex ); 
    };
    makeTimCubeSelection( givenInitialSelection );
}
function makeSelectorNEW( givenParent, givenOptions  )
{
    var myForm      = makeChildElement( givenParent, "form", "selector-form" );
    var mySelect    = makeChildElement( myForm, "select", "selector-select" );
    for( i = 0; i < givenOptions.range; i ++ )
    {
        var myOption = makeChildElement( mySelect, "option", "selector-option" );
        myOption.value = i;
        myOption.appendChild( document.createTextNode( givenOptions.caption( i ) ) );
    }
    return mySelect;
}
function appendCube( givenParent, givenTimId )
{
    var myDispatchTable =
        [
            [ fillB,         fillB, fillAspect(5), fillH, fillH, fillH, fillH,         fillH, fillAspect(4) ],
            [ fillB,         fillD, fillV,         fillB, fillB, fillB, fillB,         fillD, fillV         ],
            [ fillAspect(6), fillH, fillH,         fillH, fillH, fillH, fillAspect(7), fillB, fillV         ],                                         
            [ fillV,         fillB, fillV,         fillB, fillB, fillB, fillV,         fillB, fillV         ],
            [ fillV,         fillB, fillAspect(3), fillH, fillH, fillH, fillV,         fillH, fillAspect(2) ],
            [ fillV,         fillD, fillB,         fillB, fillB, fillB, fillV,         fillD, fillB         ],
            [ fillAspect(0), fillH, fillH,         fillH, fillH, fillH, fillAspect(1), fillB, fillB         ]
        ];
    appendTable( givenParent, myDispatchTable, givenTimId );
}
function fillAspect( givenFunctionNumber )
{
    return function ( givenTimId, givenParent )
        {                       
            var myImage = makeChildElement( givenParent, "img", "aspect-image" );
            myImage.src = lookupPathAspectIcon( getAspectIconName( givenTimId, givenFunctionNumber ) ); 
           
            var mySub = makeChildElement( givenParent, "sub", "aspect-index" );            
            mySub.appendChild( document.createTextNode(  givenFunctionNumber + 1 ) );          
        };
}               

