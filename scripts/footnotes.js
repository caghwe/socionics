var SectionIntro = "Примечания";
var FootnoteBackToTextCaption ="[обратно в текст]";
var FootnoteIntroCaption = "Примечание ";

function initializeFootnotes()
{
    var myFootnotes = array_elements_by_name_with_className( "span", "footnote" );
    if( myFootnotes.length > 0 )
    {
        var endFootnotes = document.createElement( "h3")
        endFootnotes.appendChild( document.createTextNode( SectionIntro ) );
        document.body.appendChild( endFootnotes );

        apply_to_array( myFootnotes, initialize_single_footnote );
    }
}
function initialize_single_footnote( givenNumber, givenFootnote )
{
    var myFootnoteBody = first_child_with_className( givenFootnote, "footnote-body" );
    myFootnoteBody.className = "footnote-body-hidden";
    myFootnoteBody.onmousedown = function() 
        { 
            myFootnoteBody.className = "footnote-body-hidden"; 
        };

    var myFootnoteCaption = first_child_with_className( givenFootnote, "footnote-caption" );
    myFootnoteCaption.className = "footnote-caption";    
    myFootnoteCaption.onmousedown = function() 
        { 
            myFootnoteBody.className = "footnote-body-displayed"; 
        };
    linkToEndNote( givenNumber, givenFootnote, myFootnoteBody );
    makeEndNote( givenNumber, givenFootnote, myFootnoteBody );
}
function linkToEndNote( givenNumber, givenFootnote, givenContent )
{
    var mySup = document.createElement( "sup" );
    givenFootnote.appendChild( mySup );
    givenFootnote.appendChild( document.createTextNode( " " ) );

    var myAnchor = document.createElement( "a" );
    mySup.appendChild( myAnchor );
    
    myAnchor.id = footnoteId( givenNumber );
    myAnchor.href = "#" + endnoteId( givenNumber );
    myAnchor.appendChild( document.createTextNode( givenNumber + 1 ) );
    myAnchor.className = "footnote-superscript-link";
}
function makeEndNote( givenNumber, givenFootnote, givenContent )
{
    var endNoteContainer = document.createElement( "div" );
    document.body.appendChild( endNoteContainer );
    endNoteContainer.className = "footnote-endnote";

    var myTitle = document.createElement( "a" );
    myTitle.id = endnoteId( givenNumber );
    endNoteContainer.appendChild( myTitle );
    myTitle.innerHTML = "<b>" + FootnoteIntroCaption + ( givenNumber + 1 ) + ".</b> ";

    var myContent = document.createElement( "span");
    endNoteContainer.appendChild( myContent );
    myContent.innerHTML = givenContent.innerHTML;

    var goBack = document.createElement( "a" );
    endNoteContainer.appendChild( goBack );
    goBack.innerHTML = "<span>" + FootnoteBackToTextCaption + "</span>";
    goBack.href = "#" + footnoteId( givenNumber );
}
function footnoteId( givenFootnoteNumber )
{
    return "footnote" + givenFootnoteNumber;
}
function endnoteId( givenFootnoteNumber )
{
    return "endNote" + givenFootnoteNumber;
}
