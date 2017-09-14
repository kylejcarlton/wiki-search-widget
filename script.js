$(document).ready(function(){

  $("#searchbox").keypress(function(e){
    //https://stackoverflow.com/questions/9146651/trigger-an-event-on-click-and-enter
    //https://stackoverflow.com/questions/20791954/pressing-enter-doesnt-trigger-button-click
    //https://stackoverflow.com/questions/16061202/i-hit-the-enter-key-on-keyboard-and-page-refreshes-how-do-i-prevent-this-and-st
    if(e.which == 13){
      event.preventDefault();
      performSearch();
    }
  });

  $("#wikisearch").click(function(){
    performSearch();
  });

  function performSearch(){
    var searchString = $("#searchbox").focus().val();
    var settings = {
      "async": true,
      "crossDomain": true,
      "dataType": "jsonp",
      "url": "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch="+searchString+"&srlimit=11",
      "method": "GET"
    }
    $.ajax(settings).done(function(response){
      $("#results").empty();
      $("#results").append("<h2>Top Ten Results for '"+searchString+"'</h2>");
      for(i=1; i<11; i++){
        $("#results").append("<h3 style='display: none'><b><a href='https://en.wikipedia.org/?curid="+response.query.search[i].pageid+"' target='_blank'>"+response.query.search[i].title+"</a></b></h3>");
        $("#results").append("<p style='display: none'>"+response.query.search[i].snippet+"...</p>");
      }
      $("#results").append("<p style='display: none'><a href='https://en.wikipedia.org/wiki/Special:Search/"+searchString+"' target='_blank'>...See More Results on Wikipedia</a></p>");
      $("h2").fadeIn();
      $("h3").fadeIn('slow');
      $("p").fadeIn(2000);
    });
  } //END PERFORMSEARCH
}); //END DOC READY JS
