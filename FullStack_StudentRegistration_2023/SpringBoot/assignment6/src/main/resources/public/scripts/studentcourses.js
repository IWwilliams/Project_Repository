console.log("studentCourses.js");

var currentStudent = sessionStorage.getItem("studentId");
// var api = "http://localhost:8080/api/v1/student/";

//Get Text Box Form Element
let enrollments = document.getElementById('studentcourseinfo');

window.addEventListener('load', async function (evt) {
    evt.preventDefault();
    console.log('Student courses page selected');
    if (currentStudent == null) {
        console.log("Login potentially by-passed");
        return -1;
    }
    //if no blank fields were found - get values and send to server
    console.log("test fetch");
    var apiString = getStudentEnrollments.concat(currentStudent);
    var apiResponse = await getFetch(apiString);
    console.log(apiResponse);
    if (apiResponse.length == 0) {
        enrollments.innerHTML = "No enrolled courses found";
        return -1;
    }
    var formattedOutput = ""
    for (var i = 0; i < apiResponse.length; i++) {
        formattedOutput += i + 1 + ") " + apiResponse[i][0] + "\n";
    }
    enrollments.innerHTML = formattedOutput;
}); 

