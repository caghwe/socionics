function timNameById( givenTimId )
{
    return linearRepresentation[ givenTimId ].nick;
}
function timFullNameById( givenTimId )
{
    var myTim = linearRepresentation[ givenTimId ];
    return myTim.jung + " ( " + myTim.mbti + ", '" + myTim.nick + "' )";
}
function relationNameById( givenRelationId )
{
    return linearRepresentation[ givenRelationId ].rel;
}
function relationNameByTimIds( firstTimId, secondTimId )
{
    // Кем второй ТИМ приходится первому

    var myRelationId = relationIdByTimIds( firstTimId, secondTimId );
    return relationNameById( myRelationId );
}
function relationIdByTimIds( firstTimId, secondTimId )
{
    var firstTimMatrix  = linearRepresentation[ firstTimId ].matrix;
    var secondTimMatrix = linearRepresentation[ secondTimId ].matrix;
    var transforMatrix  = productOfMatricies( secondTimMatrix, transposeMatrix( firstTimMatrix ) );
    return lookupRelationId( transforMatrix );
}
function lookupRelationIdByJung( givenJung )
{
    for( i = 0; i < linearRepresentation.length; i ++ )
    {
//        alert( "Jung is comparing\n" + listObject( linearRepresentation[ i ].jd ) + "\nand\n" + listObject( givenJung ) );
        if( areEqualMatricies( linearRepresentation[ i ].jd, givenJung ) ) return i;
    }
    alert( "lookupRelationIdByJung FAILED on input " + listObject( givenJung ) );
    return 1;
}
function lookupRelationId( givenMatrix )
{
    for( i = 0; i < linearRepresentation.length; i ++ )
    {
        if( areEqualMatricies( linearRepresentation[ i ].matrix, givenMatrix ) ) return i;
    }
    alert( "lookupRelationId FAILED on input " + listObject( givenMatrix ) );
    return null;
}
function lookupFunctionId( givenCoordinates )
{
    for( i = 0; i < psychicFunctions.length; i ++ )
    {
        if( areEqualMatricies( psychicFunctions[ i ].coordinates, givenCoordinates ) )
        {
            return i;
        }
    }
    alert( "lookupFunctionId FAILED on input " + listObject( givenCoordinates ) );
    return null;
}
function resolveDichotomyName( givenTimId, givenDichotomyId )
{
    var myDichotomy = reininDichotomies[ givenDichotomyId ];
    var myDichotomyIndex = ( myDichotomy.tim[ givenTimId ] == -1 ? 0 : 1 );
    return myDichotomy.alt[ myDichotomyIndex ];
}
function resolveDichotomy( givenTimId, givenDichotomyId )
{
    var myDichotomy = reininDichotomies[ givenDichotomyId ];
    var myTimAlternative = myDichotomy.tim[ givenTimId ];
    return myTimAlternative;
}
function getAspectIconName( givenTimId, givenFunctionNumber )
{
    var myNewNumber = getAspectId( givenTimId, givenFunctionNumber );
    return psychicFunctions[ myNewNumber ].aspectId;
}
function getAspectName( givenTimId, givenFunctionNumber )
{
    var myNewNumber = getAspectId( givenTimId, givenFunctionNumber );
    return psychicFunctions[ myNewNumber ].aspectDescription;
}
function getAspectId( givenTimId, givenFunctionNumber )
{
    var myTransforMatrix = linearRepresentation[ givenTimId ].matrix;
    var myOldVertex = psychicFunctions[ givenFunctionNumber ].coordinates;
    var myNewVertex = transformPoint( transposeMatrix( myTransforMatrix ), myOldVertex );
    return myNewNumber = lookupFunctionId( myNewVertex );
}
