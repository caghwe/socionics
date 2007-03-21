function appendCube( givenTimId, givenParent )
{
    var myDispatchTable = fillInCube();
    appendTable( myDispatchTable, givenTimId, givenParent );
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

