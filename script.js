"use strict";
$(document).ready(() => {
  let checked = $("#menu").prop("checked");
  //Close navigation bar if user clicks outside
  $(".content").on("click", () => {
    if (!checked && screen.width < 768) {
      $(".menu-content").css("max-height", 0);
    }
  });
});
