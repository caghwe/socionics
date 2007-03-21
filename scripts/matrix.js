function appendMatrix( givenTimId, givenParent )
{
    var myDispatchTable = fillInMatrix();
    appendTable( myDispatchTable, givenTimId, givenParent );
}
function fillInMatrix()
{
    var myDispatchTable =
        [
            [ fillV, fillMatrixEntry(0,0), fillMatrixEntry(0,1), fillMatrixEntry(0,2), fillV ],
            [ fillV, fillMatrixEntry(1,0), fillMatrixEntry(1,1), fillMatrixEntry(1,2), fillV ],
            [ fillV, fillMatrixEntry(2,0), fillMatrixEntry(2,1), fillMatrixEntry(2,2), fillV ]
        ];
    return myDispatchTable;
}
function fillMatrixEntry( givenRow, givenColumn )
{
    return function ( givenTimId, givenParent )
        {
            var myMatrix = linearRepresentation[ givenTimId ].matrix;
            givenParent.appendChild( document.createTextNode(  myMatrix[ givenRow ][ givenColumn ] ) );
        };
}
