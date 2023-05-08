let theaters = ["Theater1", "Theater2", "Theater3"];
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myTheater() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function load_page(htmlFile) {
  window.location.href = "http://localhost:8080/" + htmlFile;
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
