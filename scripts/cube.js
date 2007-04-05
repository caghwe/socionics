function appendCubeSelector( givenParent, givenInitialSelection )
{   
    function timCubeOptionMaker()
    {
        this.range = linearRepresentation.length;
        this.caption    = function ( givenTimId ) { return timFullNameById( givenTimId ) };
    }
    var timOptions = new timCubeOptionMaker();
    var mySelector = makeSelectorNEW( givenParent, timOptions );
    var myContent = makeContent( givenParent );
    function makeTimCubeSelection( givenTimId )
    {
        removeAllChildren( myContent );
        appendCube( myContent, givenTimId );
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
    var myForm = document.createElement( "form" );
    givenParent.appendChild( myForm );

    var mySelect    = document.createElement( "select" );
    myForm.appendChild( mySelect );
    for( i = 0; i < givenOptions.range; i ++ )
    {
        var myOption = document.createElement( "option" );
        mySelect.appendChild( myOption );
        myOption.value = i;
        myOption.appendChild( document.createTextNode( givenOptions.caption( i ) ) );
    }
    return mySelect;
}
function makeContent( givenParent )
{
    var myContent = document.createElement( "div" );
    givenParent.appendChild( myContent );
    return myContent;
}
function appendCube( givenParent, givenTimId )
{
    var myDispatchTable = fillInCube();
    appendTable( givenParent, myDispatchTable, givenTimId );
}
function fillInCube()
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
    return myDispatchTable;
}
function fillAspect( givenFunctionNumber )
{
    return function ( givenTimId, givenParent )
        {                       
            var myImage = document.createElement( "img" );
            givenParent.appendChild( myImage );
            myImage.src = getAspectIconPath( getAspectName( givenTimId, givenFunctionNumber ) ); 
            
            var mySub = document.createElement( "sub" );
            givenParent.appendChild( mySub );
            mySub.appendChild( document.createTextNode(  givenFunctionNumber + 1 ) );          
        };
}               

