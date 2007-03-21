var FootnoteSectionTitle = "Примечания";
var FootnoteBackToTextCaption ="[обратно в текст]";
var FootnoteIntroCaption = "Примечание ";

function initialize_all_footnotes()
{
    var endFootnotes = document.createElement( "h4")
    endFootnotes.innerText = FootnoteSectionTitle;
    document.body.appendChild( endFootnotes );

    var myFootnotes = array_elements_by_name_with_className( "span", "footnote" );
    apply_to_array( myFootnotes, initialize_single_footnote );
}
function initialize_single_footnote( givenNumber, givenFootnote )
{
    var myName = first_child_with_className( givenFootnote, "footnote-name" );
    var myContent = first_child_with_className( givenFootnote, "footnote-content" );

    myName.onmousedown = function()
        {
            display_content( givenFootnote, myContent )
        };
    myName.className = "footnote-name";

    myContent.style.display = "none";

    fix_links( givenNumber, givenFootnote, myContent );
}
function fix_links( givenNumber, givenFootnote, givenContent )
{
    var mySup = document.createElement( "sup" );
    givenFootnote.appendChild( mySup );
    givenFootnote.appendChild( document.createTextNode( " " ) );

    var myID = "footnote" + givenNumber;
    var myAnchor = document.createElement( "<a name='" + myID + "'>" );
    mySup.appendChild( myAnchor );

    myAnchor.innerText = givenNumber + 1;
    myAnchor.href = make_end_note( givenNumber, givenFootnote, givenContent );
}
function make_end_note( givenNumber, givenFootnote, givenContent )
{
    var endNoteContainer = document.createElement( "div" );
    document.body.appendChild( endNoteContainer );
    endNoteContainer.className = "endNote";

    var myTitle = document.createElement( "<a name='endNote" + givenNumber + "'>" );
    endNoteContainer.appendChild( myTitle );
    myTitle.innerHTML = "<b>" +FootnoteIntroCaption + (givenNumber + 1 )+ ".</b> ";

    var myContent = document.createElement( "span");
    endNoteContainer.appendChild( myContent );
    myContent.innerHTML = givenContent.innerHTML;

    var goBack = document.createElement( "a" );
    endNoteContainer.appendChild( goBack );
    goBack.innerHTML = "<span>" + FootnoteBackToTextCaption + "</span>";
    goBack.name = givenNumber;
    goBack.href = "#footnote" + givenNumber;
    return "#endNote" + givenNumber;
}
function display_content( givenParent, givenElement )
{
    givenElement.className = "footnote_displayed";
    givenElement.style.display = "block";
//    givenElement.onmouseup = function()
    givenElement.onmousedown = function()
    {
        givenElement.style.display = "none";
        givenElement.className = null;
    };

}
function first_child_with_className( givenParent, givenClassName )
{
    for ( var i=0; i < givenParent.childNodes.length; i++ )
    {
        var currentChild = givenParent.childNodes[ i ];
        if( currentChild.className == givenClassName ) return currentChild;
    }
    return null;
}
function array_elements_by_name_with_className( givenElementName, givenClassName )
{
    // can I use XPath here?
    var newArray = new Array();
    var elementsWithGivenClassName = document.getElementsByTagName( givenElementName );
    for( var i = 0; i < elementsWithGivenClassName.length; i++ )
    {
        var currentElement = elementsWithGivenClassName( i );
        if( currentElement.className == givenClassName )
        {
            newArray[ newArray.length ] = currentElement;
        }
    }
    return newArray;
}
function apply_to_array( givenArray, givenFunction )
{
    for( var i = 0; i < givenArray.length; i++ )
    {
        givenFunction( i, givenArray[ i ] );
    }
}
