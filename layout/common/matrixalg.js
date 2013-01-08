function areEqualMatricies( firstMatrix, secondMatrix )
{
    if( firstMatrix.length != secondMatrix.length ) return false;
    for( var i = 0; i < firstMatrix.length; i ++ )
    {
        if( isArray( firstMatrix[ i ] ) || isArray( secondMatrix[ i ] )  )
        {
            if( ! isArray( firstMatrix[ i ] ) && isArray( secondMatrix[ i ] ) ) return false;
            if( ! areEqualMatricies( firstMatrix[ i ], secondMatrix[ i ] ) ) return false;
        }
        if( firstMatrix[ i ] - secondMatrix[ i ] > .0001 ||
                    firstMatrix[ i ] - secondMatrix[ i ] < - .0001 )
        {
            return false;
        }
    }
    return true;
}
function productOfMatricies( firstMatrix, secondMatrix )
{
    var myResult = new Array( firstMatrix.length );
    if( firstMatrix[0].length != secondMatrix.length )
    {
        alert( "matrix multiplication is illegal:\nthe first matrix has " + firstMatrix[0].length
            + " column(s), whereas\nthe second matrix has "
            + secondMatrix.length + " row(s) -- terminate" );
        return;
    }
    for( var i = 0; i < firstMatrix.length; i ++ )
    {
        myResult[ i ] = new Array( secondMatrix[0].length );
        for( var k = 0; k < secondMatrix[0].length; k ++ )
        {
            myResult[ i ][ k ] = 0;
            for( j = 0; j < secondMatrix.length; j ++ )
            {
                myResult[ i ][ k ] += firstMatrix[ i ][ j ] * secondMatrix[ j ][ k ];
            }
        }
    }
    return myResult;
}
function transformPoint( givenMatrix, givenPoint )
{
    if( ! isArray( givenMatrix ) && ! isArray( givenMatrix[0] ) )
    {
        alert( "transformPoint failed: given Matrix\n" 
            + listObject( givenMatrix ) + "\nis not a two-dimensional array" );
        return null;
    }
    if( ! isArray( givenPoint ) )
    {
        alert( "transformPoint failed: given Point\n" + listObject( givenPoint ) + "\nis not an array" );
        return null;
    }
    if( givenMatrix[0].length != givenPoint.length )
    {
        alert( "transformPoint failed because of size mismatch:\n    transformation has " 
            + givenMatrix[ 0 ].length + " columns, whereas\n    transformed point has " 
            + givenPoint.length + " rows" );
        return null;
    }
    var myResult = new Array( givenMatrix.length );
    for( var i = 0; i < givenMatrix.length; i ++ )
    {
        myResult[ i ] = 0;
        for( var j = 0; j < givenPoint.length; j ++ )
        {
            myResult[ i ] += ( givenMatrix[ i ][ j ] * givenPoint[ j ] );
        }
    }
    return myResult;
}
function transposeMatrix( givenMatrix )
{
    if( !isArray( givenMatrix ) )
    {
        alert( "transposeMatrix failed -- the matrix\n" + listObject( givenMatrix ) + "\nis not an array"  );
        return null;
    }
    var oneDim = false;
    if( !isArray( givenMatrix[0] ) ) oneDim = true;

    var myColSize = ( oneDim? 1 : givenMatrix[0].length );
    myResult = new Array( myColSize );

    for( var i = 0; i < myColSize; i ++ )
    {
        myResult[ i ] = new Array( givenMatrix.length );
        for( var j = 0; j < givenMatrix.length; j ++ )
        {
            myResult[ i ][ j ] = (oneDim? givenMatrix[ j ] : givenMatrix[ j ][ i ] );
        }
    }
    return myResult;
}

