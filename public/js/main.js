$(document).ready(function() {
  var signedRequest = $("body").data("signed-request");

  if ($(".js-pet-names a").length > 0) {
    $(".notice").hide();
  };

  Livestax.on("pet-finder.newpet", function(petName) {
    $(".notice").hide();
    $(".js-pet-names").prepend("<a href='#' class='list-group-item'>" + petName + "</a>");
    $.post("/addtohistory", {pet_name: petName, signed_request: signedRequest});
  });

  Livestax.menu.set("Clear History", "eraser", function() {
    $.post("/clearhistory", {signed_request: signedRequest});
    $(".js-pet-names a").remove();
    $(".notice").show();
  });

  $(document.body).on("click", ".js-pet-names a", function(event) {
    var clickedLink, petName;
    clickedLink = event.target;
    petName = clickedLink.text;
    $(".js-pet-names a").removeClass("active");
    $(clickedLink).addClass("active");
    Livestax.store.set("getpet", petName);
  });
});
