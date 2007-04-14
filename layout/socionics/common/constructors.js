function readSelectedMatrix( givenName )
{
    var mySelector =  document.getElementById( givenName + "Select" );
    if( mySelector )
    {
        var myId = mySelector.selectedIndex;
        var myMatrix = linearRepresentation[ myId ].matrix;
        return myMatrix;
    }
}
function makeSelector( givenOptionProcessor, givenInitialSelection )
{
    var myParent = document.getElementById( givenOptionProcessor.name );
    var myForm      = document.createElement( "form" );
    myForm.name = givenOptionProcessor.name + "Form";
    myForm.id = givenOptionProcessor.name + "Form";
    
    var myContent   = document.createElement( "div" );
    myContent.id = givenOptionProcessor.name + "Div";
    
    var mySelect    = document.createElement( "select" );
    mySelect.name = givenOptionProcessor.name + "Select";
    mySelect.id = givenOptionProcessor.name + "Select";
    
    myParent.appendChild( myForm );
    myForm.appendChild( mySelect );
    myForm.appendChild( myContent );
    function makeSelection( givenOption )
    {
        removeAllChildren( myContent );
        givenOptionProcessor.action( givenOption, myContent );
        mySelect.selectedIndex = givenOption;
    }
    mySelect.onchange = function () { makeSelection( mySelect.selectedIndex ); };
    for( i = 0; i < linearRepresentation.length; i ++ )
    {
        var myOption = document.createElement( "option" );
        mySelect.appendChild( myOption );
        myOption.value = i;
        myOption.appendChild( document.createTextNode( givenOptionProcessor.caption( i ) ) );
    }
    makeSelection( givenInitialSelection );
}
function multXY()
{
    var myMatrixX = readSelectedMatrix( "multX" );
    var myMatrixY = readSelectedMatrix( "multY" );

    if( myMatrixX && myMatrixX )
    {
        var myRelationIdYX = lookupRelationId( productOfMatricies( myMatrixY, myMatrixX ) );

        var myParent = document.getElementById( "multYX" );
        myDiv = document.createElement( "div" );
        appendOnlyChild( myParent, myDiv );
        myDiv.className = "like-select";
        myDiv.appendChild( document.createTextNode( relationNameById( myRelationIdYX ) ) );
        appendRelationMatrix( myParent, myRelationIdYX );
    }
}
function multOptionMaker( givenName )
{
    this.name = givenName;
    this.caption = function ( givenRelId ) { return relationNameById( givenRelId ) };
    this.action = function ( givenRelId, givenParent )
        {
            appendRelationMatrix( givenParent, givenRelId );
            multXY();
        }
}
function appendMultSelector( givenName, givenInitialSelection )
{
    var myMultOptionProcessor = new multOptionMaker( givenName );
    makeSelector( myMultOptionProcessor, givenInitialSelection );
}
function actionXY()
{
    var myMatrixX = readSelectedMatrix( "actionX" );
    var myMatrixY = readSelectedMatrix( "actionY" );

    if( myMatrixX && myMatrixX )
    {
        var myRelationIdYX = lookupRelationId( productOfMatricies( myMatrixY, myMatrixX ) );

        var myParent = document.getElementById( "actionYX" );
        myDiv = document.createElement( "div" );
        appendOnlyChild( myParent, myDiv );
        myDiv.className = "like-select";
        myDiv.appendChild( document.createTextNode( timNameById( myRelationIdYX ) ) );
        appendRelationMatrix( myParent, myRelationIdYX );
    }
}
function actionRELOptionMaker( givenName )
{
    this.name = givenName;
    this.caption = function ( givenRelId ) { return relationNameById( givenRelId ) };
    this.action = function ( givenRelId, givenParent )
        {
            appendRelationMatrix( givenParent, givenRelId );
            actionXY();
        }
}
function actionTIMOptionMaker( givenName )
{
    this.name = givenName;
    this.caption = function ( givenRelId ) { return timNameById( givenRelId ) };
    this.action = function ( givenRelId, givenParent )
        {
            appendRelationMatrix( givenParent, givenRelId );
            actionXY();
        }
}
function appendActionRELSelector( givenName, givenInitialSelection )
{
    var myRELOptionProcessor = new actionRELOptionMaker( givenName );
    makeSelector( myRELOptionProcessor, givenInitialSelection );
}
function appendActionTIMSelector( givenName, givenInitialSelection )
{
    var myTIMOptionProcessor = new actionTIMOptionMaker( givenName );
    makeSelector( myTIMOptionProcessor, givenInitialSelection );
}
function transitXY()
{
    var myMatrixX = readSelectedMatrix( "transitX" );
    var myMatrixY = readSelectedMatrix( "transitY" );

    if( myMatrixX && myMatrixX )
    {
        var myRelationIdYX = lookupRelationId( productOfMatricies( myMatrixY, transposeMatrix( myMatrixX ) ) );

        var myParent = document.getElementById( "transitYX" );
        myDiv = document.createElement( "div" );
        appendOnlyChild( myParent, myDiv );
        myDiv.className = "like-select";
        myDiv.appendChild( document.createTextNode( relationNameById( myRelationIdYX ) ) );
        appendRelationMatrix( myParent, myRelationIdYX );
    }
}
function transitOptionMaker( givenName )
{
    this.name = givenName;
    this.caption = function ( givenRelId ) { return timNameById( givenRelId ) };
    this.action = function ( givenRelId, givenParent )
        {
            appendRelationMatrix( givenParent, givenRelId );
            transitXY();
        }
}
function appendTransitSelector( givenName, givenInitialSelection )
{
    var myTransitOptionProcessor = new transitOptionMaker( givenName );
    makeSelector( myTransitOptionProcessor, givenInitialSelection );
}

     
function appendMatrixProduct( givenParent, givenLeftMatrix, givenRightMatrix )
{
    var myDispatchTable =
        [
            [ 
                function ( aParent ) { appendMatrix( aParent, productOfMatricies( givenLeftMatrix, givenRightMatrix ) ); },
                function ( aParent ) { aParent.appendChild( document.createTextNode( "=" ) ); },
                function ( aParent ) { appendMatrix( aParent, givenLeftMatrix ); },
                function ( aParent ) { aParent.appendChild( document.createTextNode( "x" ) ); },
                function ( aParent ) { appendInverseMatrix( aParent, givenRightMatrix ); } 
            ]
        ];
    var myMatrixProductDispatch = new TabularDispatch( myDispatchTable );
    appendTable( givenParent, myMatrixProductDispatch );
}
function TabularDispatch( givenDispatchTable )
{
    this.rowCount = givenDispatchTable.length;
    this.columnCount = givenDispatchTable[ 0 ].length;
    this.appendEntry = function ( givenParent, givenRowIndex, givenColumnIndex )
        {
            givenDispatchTable[ givenRowIndex ][ givenColumnIndex ]( givenParent );
        };
}
function appendJung( givenParent, givenTimId )
{
    for( var myDichotomyId = 0; myDichotomyId < reininDichotomies.length; myDichotomyId ++ )
    {
                        var myMessage = "ТИМ " + timFullNameById( myTimId ) + " наделён признаком Рейнина: "
                            + resolveDichotomyName( myTimId, myDichotomyId ) + "\n";
                        myParent.appendChild( document.createTextNode ( myMessage ) );
                        myParent.appendChild( document.createElement( "br" ) );
    }
}
