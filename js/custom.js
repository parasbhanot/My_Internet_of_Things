$(".nav a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});

// remove class when All monitors are selected  

$("#buttonM").on("click", function(){
   $(".nav").find(".active").removeClass("active");
});


// remove class when All controls are selected 

$("#buttonC").on("click", function(){
   $(".nav").find(".active").removeClass("active");
});