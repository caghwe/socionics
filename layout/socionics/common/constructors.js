function nickExtractor( givenRep )
{
    return givenRep.nick;
}
function relExtractor( givenRep )
{
    return givenRep.rel;
}
function appendRelationGroupProduct( givenParent, givenInitialLeft, givenInitialRight )
{
    var myCaption = new function() 
        { 
            this.result = "Кем Виталий приходится Анатолию, матрица <i><b>Y</b> x <b>X</b></i>:";
            this.left   = "Кем Виталий приходится Борису, матрица <i><b>Y</b></i>:";
            this.right  = "Кем Борис приходится Анатолию, матрица <i><b>X</b></i>:";
        };
    var myEquation = new TripartiteEquation( givenParent, myCaption );
    var myLeftSelect = new SelectorObject( linearRepresentation, relExtractor, givenInitialLeft );
    var myRightSelect = new SelectorObject( linearRepresentation, relExtractor, givenInitialRight );
    function makeSync( givenSelectorParent, givenSelectorObject )
    {
        return function ()
            {
                var myLeftMatrix    = linearRepresentation[ myLeftSelect.getSelection() ].matrix;
                var myRightMatrix   = linearRepresentation[ myRightSelect.getSelection() ].matrix;
                var myResultMatrix  = productOfMatricies( myLeftMatrix, myRightMatrix );
        
                removeAllChildren( myEquation.resultContainer );                
                appendMatrix( myEquation.resultContainer, myResultMatrix );
        
                var myRelationId = lookupRelationId( myResultMatrix );
                appendOnlyChild( myEquation.resultHeader, document.createTextNode( relationNameById( myRelationId ) ) );               

                removeAllChildren(  givenSelectorParent );
                var myChangedMatrix = linearRepresentation[ givenSelectorObject.getSelection() ].matrix;
                appendMatrix( givenSelectorParent, myChangedMatrix );
            };
    }
    myLeftSelect.setSync( makeSync( myEquation.leftContainer, myLeftSelect ) );
    myRightSelect.setSync( makeSync( myEquation.rightContainer, myRightSelect ) );
   
    myLeftSelect.append( myEquation.leftHeader );
    myRightSelect.append( myEquation.rightHeader );
}
function appendRelationGroupAction( givenParent, givenInitialLeft, givenInitialRight )
{
    var myCaption = new function() 
        { 
            this.result = "Борис,<br />матрица <i><b>X</b></i>( Анатолий ):";
            this.left   = "Кем Борис приходится Анатолию,<br />матрица <i><b>X</b></i>:";
            this.right  = "Анатолий:";
        };
    var myEquation = new TripartiteEquation( givenParent, myCaption );
    var myLeftSelect = new SelectorObject( linearRepresentation, relExtractor, givenInitialLeft );
    var myRightSelect = new SelectorObject( linearRepresentation, nickExtractor, givenInitialRight );
    function makeSync( givenSelectorParent, givenSelectorObject )
    {
        return function ()
            {
                var myLeftMatrix    = linearRepresentation[ myLeftSelect.getSelection() ].matrix;
                var myRightMatrix   = linearRepresentation[ myRightSelect.getSelection() ].matrix;
                var myResultMatrix  = productOfMatricies( myLeftMatrix, myRightMatrix );
        
                removeAllChildren( myEquation.resultContainer );                
                appendMatrix( myEquation.resultContainer, myResultMatrix );
        
                var myRelationId = lookupRelationId( myResultMatrix );
                appendOnlyChild( myEquation.resultHeader, document.createTextNode( timNameById( myRelationId ) ) );               

                removeAllChildren(  givenSelectorParent );
                var myChangedMatrix = linearRepresentation[ givenSelectorObject.getSelection() ].matrix;
                appendMatrix( givenSelectorParent, myChangedMatrix );
            };
    }        
    myLeftSelect.setSync( makeSync( myEquation.leftContainer, myLeftSelect ) );
    myRightSelect.setSync( makeSync( myEquation.rightContainer, myRightSelect ) );
   
    myLeftSelect.append( myEquation.leftHeader );
    myRightSelect.append( myEquation.rightHeader );
}
function appendRelationGroupTransit( givenParent, givenInitialLeft, givenInitialRight )
{
    var myCaption = new function() 
        { 
            this.result = "Кем Борис приходится Анатолию,<br />матрица ( Борис ) x ( Анатолий )<sup>-1</sup>:";
            this.left   = "Борис:";
            this.right  = "Анатолий:";
        };
    var myEquation = new TripartiteEquation( givenParent, myCaption );
    var myLeftSelect = new SelectorObject( linearRepresentation, nickExtractor, givenInitialLeft );
    var myRightSelect = new SelectorObject( linearRepresentation, nickExtractor, givenInitialRight );
    function commonSync( givenSelectorParent, givenSelectorObject )
    {
        var myLeftMatrix    =  linearRepresentation[ myLeftSelect.getSelection() ].matrix;
        var myRightMatrix   = linearRepresentation[ myRightSelect.getSelection() ].matrix;
        var myResultMatrix  = productOfMatricies( myLeftMatrix, transposeMatrix( myRightMatrix ) );
        
        removeAllChildren( myEquation.resultContainer );                
        appendMatrix( myEquation.resultContainer, myResultMatrix );
        
        var myRelationId = lookupRelationId( myResultMatrix );
        appendOnlyChild( myEquation.resultHeader, document.createTextNode( relationNameById( myRelationId ) ) );               

        removeAllChildren(  givenSelectorParent );
    }        
    function makeLeftSync( givenSelectorParent, givenSelectorObject ) 
    {
        return function ()
            {   
                commonSync( givenSelectorParent, givenSelectorObject );
                var myChangedMatrix = linearRepresentation[ givenSelectorObject.getSelection() ].matrix;
                appendMatrix( givenSelectorParent, myChangedMatrix );
            };
    }
    function makeRightSync( givenSelectorParent, givenSelectorObject ) 
    {
        return function ()
            {
                commonSync( givenSelectorParent, givenSelectorObject );
                var myChangedMatrix = linearRepresentation[ givenSelectorObject.getSelection() ].matrix;
                appendInverseMatrix( givenSelectorParent, myChangedMatrix );
            };
    }   
    myLeftSelect.setSync( makeLeftSync( myEquation.leftContainer, myLeftSelect ) );
    myRightSelect.setSync( makeRightSync( myEquation.rightContainer, myRightSelect ) );
   
    myLeftSelect.append( myEquation.leftHeader );
    myRightSelect.append( myEquation.rightHeader );
}
function TripartiteEquation( givenParent, givenCaption )
{    
    var myTable = makeChildElement( givenParent, "table", "equation-table" );    
    var myBody = makeChildElement( myTable, "tbody", "equation-body" );    

    var myCaptionRow = makeChildElement( myBody, "tr", "equation-headers" );  
    var myResultCaption = makeChildElement( myCaptionRow, "td", "equation-result-caption" );
    myResultCaption.innerHTML = givenCaption.result;
    
    var myEqualCaption = makeChildElement( myCaptionRow, "td", "equation-equal-caption" );
    
    var myLeftHeader = makeChildElement( myCaptionRow, "td", "equation-left-caption" );
    myLeftHeader.innerHTML = givenCaption.left;
    
    var myOperHeader = makeChildElement( myCaptionRow, "td", "equation-oper-caption" );
    var myRightHeader = makeChildElement( myCaptionRow, "td", "equation-right-caption" );
    myRightHeader.innerHTML = givenCaption.right;
    
    var myHeaderRow = makeChildElement( myBody, "tr", "equation-headers" );  
    var myResultHeader = makeChildElement( myHeaderRow, "td", "equation-result-header" );
    this.resultHeader = makeChildElement( myResultHeader, "div", "like-select" );
    var myEqualHeader = makeChildElement( myHeaderRow, "td", "equation-equal-header" );
    this.leftHeader = makeChildElement( myHeaderRow, "td", "equation-left-header" );
    var myOperHeader = makeChildElement( myHeaderRow, "td", "equation-oper-header" );
    this.rightHeader = makeChildElement( myHeaderRow, "td", "equation-right-header" );

    var myContentRow = makeChildElement( myBody, "tr", "equation-content" ); 
    this.resultContainer = makeChildElement( myContentRow, "td", "equation-result" );
    var myEqualSign = makeChildElement( myContentRow, "td", "equation-equal-sign" );
    myEqualSign.appendChild( document.createTextNode( "=" ) );
    this.leftContainer = makeChildElement( myContentRow, "td", "equation-left" );
    var myOperSign = makeChildElement( myContentRow, "td", "equation-oper-sign" );
    myOperSign.appendChild( document.createTextNode( "x" ) );
    this.rightContainer = makeChildElement( myContentRow, "td", "equation-right" );
}
function SelectorObject( givenOptionsArray, givenCaptionExtracter, givenInitialSelection )
{
    var sync = null;
    var selection = null;
    var setSelection = function ( givenIndex ) { selection = givenIndex };

    this.getSelection = function () { return selection; };
    this.setSync = function ( givenSyncFunction ) { sync = givenSyncFunction; };

    setSelection( givenInitialSelection );
    this.append = function ( givenParent )
        {
            var myForm = makeChildElement( givenParent, "form", "selector-form" );
            var mySelect = makeChildElement( myForm, "select", "selector-select" );
            for( i = 0; i < givenOptionsArray.length; i ++ )
            {
                var myOption = makeChildElement( mySelect, "option", "selector-option" );
                myOption.value = i;
                var myCaption = givenCaptionExtracter( givenOptionsArray[ i ] );
                myOption.appendChild( document.createTextNode( myCaption ) );
            }                     
            mySelect.selectedIndex = givenInitialSelection;
            function update()
            { 
                setSelection( mySelect.selectedIndex );
                sync();
            }
            mySelect.onchange = update;
            update();               
        };
}
