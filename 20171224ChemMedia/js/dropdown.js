window.onload = function(){
    (function(){
        var hoverDelay = 200;
    function dropDown(){
          $(".nav_items:hover").children("ul.nav_dropdown").slideDown();
    }
    var hoverTime;
 $(".nav_items").hover(function(){
     clearTimeout(hoverTime);
     hoverTime = setTimeout(dropDown,hoverDelay);
 },function(){
      $(this).children("ul.nav_dropdown").slideUp();
 });
    })()
}