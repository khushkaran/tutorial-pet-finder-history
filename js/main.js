$(document).ready(function() {
  Livestax.on("pet-finder.newpet", function(petName) {
    $(".js-pet-names").prepend("<a href='#' class='list-group-item'>" + petName + "</a>");
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
