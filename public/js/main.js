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

  var clearHistory = function() {
    $.post("/clearhistory", {signed_request: signedRequest});
    $(".js-pet-names a").remove();
    $(".notice").show();
  };

  Livestax.menu.set("Clear History", "eraser", function() {
    var flashData = {
      message: "Sure you want to clear your history?",
      dismiss: function() {},
      confirm: clearHistory
    };

    var dialogData = {
      title: "Are you sure?",
      message: "Are you sure you want to clear your history? This is an irreversible action and cannot be undone.",
      buttons: [
        {
          title: "Yes",
          callback: clearHistory,
          type: "danger"
        },
        {
          title: "Cancel",
          callback: function(){},
          type: "ok"
        }
      ]
    };
    //Livestax.dialog.show(dialogData); //uncomment this if you want to use the dialog
    Livestax.flash.danger(flashData); // uncomment this if you want to use the flash message
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
