//This is a general js file that should be included in all html files for functions used across all pages

console.log('index');

//All api endpoints
const getAllStudentsAPI = "http://localhost:8080/api/v1/student";
const addStudentAPI = "http://localhost:8080/api/v1/student";
const getAllCoursesAPI = "http://localhost:8080/api/v1/course";
const addNewCourse = "http://localhost:8080/api/v1/course";
//Add student Id to end
const getStudentEnrollments = "http://localhost:8080/api/v1/student/enrollments/";
//Add ucid to end
const getStudent = "http://localhost:8080/api/v1/student/specific/";
const getCourseSections = "http://localhost:8080/api/v1/course/sections/";


//Load new html address
function load_page(htmlFile) {
    window.location.href = "http://localhost:8080/" + htmlFile;
}

function postFetch(api, data) {
    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            data
        )
    })
}

//get from server
async function getFetch(api) {
    let response = await fetch(api);
    return response.json();
}

//Delete from server - should not need this**
function deleteFetch(api) {
    fetch(api, {
        method: 'DELETE'
    })
}

function putFetch(api) {
    fetch(api, {
        method: 'PUT'
    })
}

let backToMenu = document.getElementById("BackMenu");
backToMenu.addEventListener("click", function(evt) {
    console.log("Menu button clicked");
    load_page("menu.html");
});




