$(document).ready(function() {
  var signedRequest = $("body").data("signed-request");

  Livestax.on("pet-finder.newpet", function(petName) {
    $(".notice").hide();
    $(".js-pet-names").prepend("<a href='#' class='list-group-item'>" + petName + "</a>");
    $.post("/addtohistory", {pet_name: petName, signed_request: signedRequest});
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
