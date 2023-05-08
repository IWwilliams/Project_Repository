const form = document.getElementById("loginform");
const guest = document.getElementById("guestbutton");
const register = document.getElementById("registerbutton");

form.addEventListener("submit", formSubmit);
guest.addEventListener("submit", guestSubmit);
register.addEventListener("submit", registerSubmit);

function load_page(htmlFile) {
  window.location.href = "http://localhost:8080/" + htmlFile;
}

async function getFetch(api) {
  let response = await fetch(api);
  console.log(response);
  return response.json();
}

async function formSubmit(e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let fetch = "http://localhost:8080/api/ticket/showtime/1";

  let response = await getFetch(fetch);
  var myarray = response.map((result) => { return JSON.parse(result) });
  console.log(myarray);
  myarray.map((reult))
  sessionStorage.setItem("token", user.uname);
  load_page("movies.html");
}

function guestSubmit(e) {
  e.preventDefault();
  load_page("movies.html");
}

function registerSubmit(e) {
  e.preventDefault();
  load_page("register.html");
}
