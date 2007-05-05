function appendTable( givenParent, givenDispatch )
{
    var myContainer     = makeChildElement( givenParent,    "div",      "dispatch-container" );
    var myTable         = makeChildElement( myContainer,    "table",    "dispatch-table" );
    var myTBody         = makeChildElement( myTable,        "tbody",    "dispatch-body" );

    for( var i = 0; i < givenDispatch.rowCount; i ++ )
    {
        var myRow       = makeChildElement( myTBody,        "tr",       "dispatch-row" );
        for( var j = 0; j < givenDispatch.columnCount; j ++ )
        {
            var myCell  = makeChildElement( myRow,          "td",       "dispatch-cell" );
            givenDispatch.appendEntry( myCell, i, j );
        }
    }
}
function ColumnDrawingDispatch( givenMatrix )
{
    this.rowCount = givenMatrix.length;
    this.columnCount = 3;
    this.appendEntry = function ( givenParent, givenRowIndex, givenColumnIndex )
        {
            if( givenColumnIndex == 0 )
            {
                givenParent.className = ( ( givenRowIndex == 0 )? "upper-left-corner" :
                    ( ( givenRowIndex == givenMatrix.length - 1 ) ? "lower-left-corner" : "left-border" ) );
                givenParent.appendChild( document.createTextNode( " " ) );
                return;
            }
            if( givenColumnIndex == 2 )
            {
                givenParent.className = ( ( givenRowIndex == 0 )? "upper-right-corner" :
                    ( ( givenRowIndex == givenMatrix.length - 1 ) ? "lower-right-corner" : "right-border" ) );
                givenParent.appendChild( document.createTextNode( " " ) );
                return;
            }
            var myMatrixEntry = givenMatrix[ givenRowIndex ];
            givenParent.appendChild( document.createTextNode( myMatrixEntry ) );
        };
}
function MatrixDrawingDispatch( givenMatrix )
{
    this.rowCount = givenMatrix.length;
    this.columnCount = givenMatrix[ 0 ].length + 2;
    this.appendEntry = function ( givenParent, givenRowIndex, givenColumnIndex )
        {
            if( givenColumnIndex == 0 )
            {
                givenParent.className = ( ( givenRowIndex == 0 )? "upper-left-corner" :
                    ( ( givenRowIndex == givenMatrix.length - 1 ) ? "lower-left-corner" : "left-border" ) );
                givenParent.appendChild( document.createTextNode( " " ) );
                return;
            }
            if( givenColumnIndex == givenMatrix[ 0 ].length + 1 )
            {
                givenParent.className = ( ( givenRowIndex == 0 )? "upper-right-corner" :
                    ( ( givenRowIndex == givenMatrix.length - 1 ) ? "lower-right-corner" : "right-border" ) );
                givenParent.appendChild( document.createTextNode( " " ) );
                return;
            }
            var myMatrixEntry = givenMatrix[ givenRowIndex ][ givenColumnIndex - 1 ];
            givenParent.appendChild( document.createTextNode( myMatrixEntry ) );
        };
}
function MatrixInverseDrawingDispatch( givenMatrix )
{
    this.rowCount = givenMatrix.length;
    this.columnCount = givenMatrix[ 0 ].length + 3;
    this.appendEntry = function ( givenParent, givenRowIndex, givenColumnIndex )
        {
            if( givenColumnIndex == 0 )
            {
                givenParent.className = ( ( givenRowIndex == 0 )? "upper-left-corner" :
                    ( ( givenRowIndex == givenMatrix.length - 1 ) ? "lower-left-corner" : "left-border" ) );
                givenParent.appendChild( document.createTextNode( " " ) );
                return;
            }
            if( givenColumnIndex == givenMatrix[ 0 ].length + 1 )
            {
                givenParent.className = ( ( givenRowIndex == 0 )? "upper-right-corner" :
                    ( ( givenRowIndex == givenMatrix.length - 1 ) ? "lower-right-corner" : "right-border" ) );
                givenParent.appendChild( document.createTextNode( " " ) );
                return;
            }
            if( givenColumnIndex == givenMatrix[ 0 ].length + 2 )
            {
                givenParent.appendChild( document.createTextNode( givenRowIndex == 0 ? "-1" : " "  ) );
                return;
            }
            var myMatrixEntry = givenMatrix[ givenRowIndex ][ givenColumnIndex - 1 ];
            givenParent.appendChild( document.createTextNode( myMatrixEntry ) );
        };
}
function appendMatrix( givenParent, givenMatrix )
{
    var myDispatch = new MatrixDrawingDispatch( givenMatrix );
    appendTable( givenParent, myDispatch );
}
function appendInverseMatrix( givenParent, givenMatrix )
{
    var myDispatch = new MatrixInverseDrawingDispatch( givenMatrix );
    appendTable( givenParent, myDispatch );
}
function appendColumn( givenParent, givenMatrix )
{
    var myDispatch = new ColumnDrawingDispatch( givenMatrix );
    appendTable( givenParent, myDispatch );
}
