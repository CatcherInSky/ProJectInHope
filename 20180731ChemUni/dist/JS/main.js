var mySwiper = new Swiper('.pc-slider .swiper-container',{
    loop: true,
    autoplay: 3000,
    calculateHeight:true,
    pagination:'.pc-slider .pagination',
    paginationClickable: true,

});
var Swiper = new Swiper('.mobile-slider .swiper-container',{
    loop: true,
    autoplay: 3000,
    calculateHeight:true,
    pagination:'.mobile-slider .pagination',
    paginationClickable: true,

});
function closeNav(){
    var div = document.getElementById("mobileNav");
    div.style.display = "none";
}

function dropDown(){
    var div = document.getElementById("mobileNav");
    div.style.display = "unset";
}