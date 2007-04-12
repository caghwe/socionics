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
             

