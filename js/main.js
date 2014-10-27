$(document).ready(function() {
  Livestax.on("pet-finder.newpet", function(petName) {
    $(".js-pet-names").prepend("<a href='#' class='list-group-item'>" + petName + "</a>");
  });
});
