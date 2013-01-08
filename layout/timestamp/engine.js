function appendTimestamp( givenParent )
{
    var myTimeStamp = new Date( document.lastModified );
    var myString;
    with ( myTimeStamp ) 
    {
        var myYear = getFullYear();
        var myMonth = monthName( getMonth() );
        var myDay = dayName( getDay() );
        var myDate = getDate();
        var myTime = appendZero( getHours() ) + ":" + appendZero( getMinutes() ) + " " + getGMToffset( myTimeStamp);
        myString = myDay + ", " + myDate + " " + myMonth + " " + myYear + " года, " + myTime;
    }
    appendOnlyChild( givenParent, document.createTextNode( myString ) );
}
function getGMToffset( givenTimeStamp ) 
{
    var myString = "(GMT ";
    with ( givenTimeStamp ) 
    {
        var myOffset = getTimezoneOffset(); 
        var myAbs = Math.abs( myOffset );
        var myMinutes = myAbs % 60 ; 
        var myHours = ( myAbs - myMinutes ) / 60 ;
        myString += ( myOffset > 0 ?  '- ':'+ ') + appendZero( myHours ) + ':' + appendZero( myMinutes );
    }
    return myString + ")";
}
function appendZero( givenNumber )
{
    return ( givenNumber < 10 ? "0" + givenNumber: ""+ givenNumber );
}
function monthName( monthNumber )
{
    var months = [ "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря" ];
    return months[ monthNumber ];
}
function dayName( dayNumber )
{
    var days = [ "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота" ];
    return days[ dayNumber ];
}
