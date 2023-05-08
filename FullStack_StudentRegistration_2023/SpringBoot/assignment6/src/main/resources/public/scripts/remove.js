console.log("remove.js");

let currentStudent = sessionStorage.getItem("studentId");
console.log(currentStudent);

window.addEventListener('load', async function (evt) {
    evt.preventDefault();

    courses = await getFetch("http://localhost:8080/api/v1/student/enrollments/"+currentStudent);
    idList = [];
    courses.forEach(course => idList.push(course[0]));

    if(idList.length == 0) {
        this.document.getElementById("noCourses").innerHTML = "Hmm.. Looks like you are not registered in any courses! Unfortunately you can quit before you even start."
    }

    let courseIds = document.getElementById('courseIdList'), id=idList;
    //Iterate through courseIds list and add each as an option in form
    for(let i = 0; i < idList.length; i++) {
        let option = document.createElement("OPTION"),
                    txt = document.createTextNode(idList[i]);
        option.appendChild(txt);
        courseIds.insertBefore(option, courseIds.lastChild);
    }
});

const courseForm = document.getElementById("CourseList");
const sectionForm = document.getElementById("CourseSection");

courseForm.addEventListener('submit', async function(evt) {
    evt.preventDefault();

    //save value that was selected in dropdown
    let selectedCourse = document.getElementById("courseIdList");
    sessionStorage.setItem("selectedCourse", selectedCourse.value);

    sectionList = await getFetch("http://localhost:8080/api/v1/student/enrollments/"+currentStudent);
    idList = [];
    sectionList.forEach(section => (section[0]==sessionStorage.getItem("selectedCourse") ? idList.push(section[1]): null));

    //Remove old sections from dropdown
    let oldSections = document.getElementById('courseSectionList').options;
    for(i=oldSections.length; i>0; i--) {
        oldSections.remove(i);
    }

    //Populate section list dropdown
    let sections = document.getElementById('courseSectionList'), id=idList;

    document.getElementById('defaultSection').innerHTML = "Please choose the section";
    for(let i = 0; i < idList.length; i++) {
        let option = document.createElement("OPTION"),
                    txt = document.createTextNode(idList[i]);
        option.appendChild(txt);
        sections.insertBefore(option, sections.lastChild);
    }
});

//When section is selected and submitted
sectionForm.addEventListener('submit', async function(evt) {
    console.log("submit button pressed");

    //Send selected section and selected course and current student to enroll student api
    let selectedSection = document.getElementById("courseSectionList").value;
    let selectedCourse = sessionStorage.getItem("selectedCourse");
    deleteFetch("http://localhost:8080/api/v1/section/"+selectedSection+"/course/"+selectedCourse+"/students/"+currentStudent);
    alert("Course Succesfully removed!");
    
});