function dropDown(){
    var div = document.getElementById("nav");
    div.style.display = "block";
}
function closeNav(){
    var div = document.getElementById("nav");
    div.style.animation="navSlideOut 0.5s forwards";
    setTimeout(Non,500);
    function Non(){
        div.style.display="none";
        div.style.animation="navSlide 0.5s";
    }
}

