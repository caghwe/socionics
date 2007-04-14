var SectionIntro = "Примечания";
var FootnoteBackToTextCaption ="[обратно в текст]";
var FootnoteIntroCaption = "Примечание ";
addAnEvent( window, 'load', initializeFootnotes );


function initializeFootnotes()
{
    var myFootnotes = array_elements_by_name_with_className( "span", "footnote" );
    if( myFootnotes.length > 0 )
    {
        var endNoteContainer = initialize_endNote_Container();

        var endFootnotes =  makeChildElement( endNoteContainer, "h3", "end-note-header" );
        endFootnotes.appendChild( document.createTextNode( SectionIntro ) );
        
        //document.body.appendChild( endFootnotes );

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
    var endNotesContainer = document.getElementById( "footnotes-endnotes-container" );
    var myNote =  makeChildElement( endNotesContainer, "div", "footnote-endnote" );

    var myAnchor =  makeChildElement( myNote, "a", "end-note" );
    myAnchor.id = endnoteId( givenNumber );

    myAnchor.innerHTML = "<b>" + FootnoteIntroCaption + ( givenNumber + 1 ) + ".</b> ";

    var myContent = makeChildElement( myNote, "span", "end-note" );
    myContent.innerHTML = givenContent.innerHTML;

    myBackLink = makeChildElement( myNote, "a", "back-link" );
    myBackLink.innerHTML = "<span>" + FootnoteBackToTextCaption + "</span>";
    myBackLink.href = "#" + footnoteId( givenNumber );
}
function footnoteId( givenFootnoteNumber )
{
    return "footnote" + givenFootnoteNumber;
}
function endnoteId( givenFootnoteNumber )
{
    return "endNote" + givenFootnoteNumber;
}
function initialize_endNote_Container()
{
    var endNoteContainer = document.getElementById( "footnotes-endnotes-container" );
    if( ! endNoteContainer )
    {
        endNoteContainer = makeChildElement( document.body, "div", "footnotes-endnotes-container" );
        endNoteContainer.id = "footnotes-endnotes-container";
    }
    endNoteContainer.className = "footnote-endnote";    
    return endNoteContainer;
}
