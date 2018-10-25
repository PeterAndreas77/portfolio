document.addEventListener(
  "Checkbox shift content",
  function() {
    let checkbox = document.getElementById("menu");
    let content = document.getElementsByClassName("content");
    if (checkbox.checked) {
      content.style.marginTop = "4rem";
      console.log("checked");
    }
  },
  false
);
