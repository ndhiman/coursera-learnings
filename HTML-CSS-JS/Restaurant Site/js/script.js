$(function () {
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
        console.log("in here");
      $("#collapsable-nav").collapse("hide");
    }
  });
});
