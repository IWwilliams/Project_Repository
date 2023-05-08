console.log("login.js");

//Check to see if any of the elements in the form are blank 
function blankFieldAlert(formName) {
  //alert user if try to submit with any blank fields
  let elements = formName.elements;
  for(let i = 0; i<elements.length; i++) {
    if(elements[i].value == "") {
      alert("Please fill out all fields!");
      return true;
    }
  }
  return false;
} 

//Stored variables for student
let studentName;
let password;
let studentId;

//LoginButton handler
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginForm.addEventListener('submit', async function(evt) {
  evt.preventDefault();
  console.log('login button clicked');

    //check to see if any fields are blank
  if(blankFieldAlert(loginForm)==true) {
    console.log("Blank fields found");
    return -1;
  }

  studentName = loginForm.name.value;
  password = loginForm.password.value;
  studentId = loginForm.studentId.value;

  //Search for student in database
  let student = await getFetch(getStudent.concat(studentId));
  console.log(student);

  //Searching for invalid credentials
  if(student['error'] == "Internal Server Error" || student['username'] != studentName || student['password'] != password) {
    alert("Invalid credentials! Please try again or register if you are a new student");
    //clear textboxes
    
    return -1;
  }

  //if student is found - check that the name and password also matches
  sessionStorage.setItem("studentName", studentName);
  sessionStorage.setItem("password", password);
  sessionStorage.setItem("studentId", studentId);
  load_page("menu.html");

  });


registerForm.addEventListener('submit', async function(evt) {
    evt.preventDefault();
    console.log('register button clicked');
  
      //check to see if any fields are blank
    if(blankFieldAlert(registerForm)==true) {
      console.log("Blank fields found");
      return -1;
    }
  
    //if no blank fields were found - get values and send to server
    studentName = registerForm.name.value;
    password = registerForm.password.value;
    studentId = registerForm.studentId.value;

    //Search for student in database -- if found, say student exists and please login. 
    //If not found send a post fetch to the server to add the student and redirect page.

    let student = await getFetch(getStudent.concat(studentId));
      if(student['error'] == "Internal Server Error") {
        sessionStorage.setItem("studentName", studentName);
        sessionStorage.setItem("password", password);
        sessionStorage.setItem("studentId", studentId);
        postFetch(addStudentAPI, {'username': studentName, 'password': password, 'ucid': studentId});
        load_page("menu.html");
        return 1;
      }

    alert("We found a user with the entered information. If you are an existing student please log in!");
  
    });




