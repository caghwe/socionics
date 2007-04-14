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
    function fillAspect( givenFunctionNumber )
        {
            return function( aParent )
                {   
                    var myContainer = makeChildElement( aParent, "span", "vertex-container" );
                    
                    var myImage = makeChildElement( myContainer, "img", "aspect-image" );
                    myImage.src = lookupPathAspectIcon( getAspectIconName( givenTimId, givenFunctionNumber ) );  

                    var mySub = makeChildElement( myContainer, "sub", "aspect-index" );
                    mySub.appendChild( document.createTextNode(  givenFunctionNumber + 1 ) );
                };
        };
    var myDispatchTable =
        [ 
            // xyz-coordinates, x is horizontal, z iz vertical, y is going away
            // vert( x, y ), horiz( y, z ), diag( x, z )
            
            [ blankCell,        blankCell,      fillAspect(5),  horiz( 1, 1 ),  horiz( 1, 1 ),  horiz( 1, 1 ),  horiz( 1, 1 ),  fillAspect(4) ],
            [ blankCell,        diag( 0, 1 ),   vert( 0, 1 ),   blankCell,      blankCell,      blankCell,      diag( 1, 1 ),   vert( 1, 1 )  ],
            [ fillAspect(6),    horiz( 0, 1 ),  horiz( 0, 1 ),  horiz( 0, 1 ),  horiz( 0, 1 ),  fillAspect(7),  blankCell,      vert( 1, 1 )  ],
            [ vert( 0, 0 ),     blankCell,      vert( 0, 1 ),   blankCell,      blankCell,      vert( 1, 0 ),   blankCell,      vert( 1, 1 )  ],
            [ vert( 0, 0 ),     blankCell,      vert( 0, 1 ),   blankCell,      blankCell,      vert( 1, 0 ),   blankCell,      vert( 1, 1 )  ],
            [ vert( 0, 0 ),     blankCell,      fillAspect(3),  horiz( 1, 0 ),  horiz( 1, 0 ),  vert( 1, 0 ),   horiz( 1, 0 ),  fillAspect(2) ],
            [ vert( 0, 0 ),     diag( 0, 0 ),   blankCell,      blankCell,      blankCell,      vert( 1, 0 ),   diag( 1, 0 ),   blankCell     ],
            [ fillAspect(0),    horiz( 0, 0),   horiz( 0, 0 ),  horiz( 0, 0),   horiz( 0, 0),   fillAspect(1),  blankCell,      blankCell     ]
        ];
    function CubeDrawingDispatch( timId )
    {
        this.rowCount = myDispatchTable.length;
        this.columnCount = myDispatchTable[ 0 ].length;
        this.appendEntry = function ( givenParent, givenRowIndex, givenColumnIndex )
            {
                myDispatchTable[ givenRowIndex ][ givenColumnIndex ]( givenParent );
            };
    }
    var myCubeDrawingDispatch = new CubeDrawingDispatch( givenTimId );
    appendTable( givenParent, myCubeDrawingDispatch );
}
function blankCell( givenParent )
{
    givenParent.appendChild( document.createTextNode( " " ) );
}
function diag( x, z )
{
    return function ( givenParent )
        {
            givenParent.appendChild( document.createTextNode( "/" ) );
        };
}
function vert( x, y )
{
    return function ( givenParent )
        {
            //givenParent.style.borderRight = "solid black 1px";
            givenParent.appendChild( document.createTextNode( "|" ) );
        };
}
function horiz( y, z )
{
    return function ( givenParent )
        {
            //if( z == 0 ) givenParent.style.borderTop = "solid black 1px";
            //else givenParent.style.borderBottom = "solid black 1px";
            givenParent.style.textAlign = "center";
            givenParent.innerHTML = "&#8212;";
        }
}
             

