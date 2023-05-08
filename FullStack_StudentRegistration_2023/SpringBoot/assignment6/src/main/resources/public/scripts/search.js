console.log("search.js");

let currentStudent = sessionStorage.getItem("studentId");
console.log(currentStudent);

window.addEventListener('load', async function (evt) {
    evt.preventDefault();

    idList = await load_course_list(getAllCoursesAPI);
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

courseForm.addEventListener('submit', async function(evt) {
    evt.preventDefault();

    console.log("search button pressed");
    let courseSearched = document.getElementById("courseIdList").value;
    console.log(courseSearched);
    sessionStorage.setItem("courseSearched", courseSearched);
    let allCourse = await getFetch(getAllCoursesAPI);
    console.log(allCourse);
    idList = [];
    allCourse.forEach(course => {
                                if(course['name'] == courseSearched) {
                                    idList.push("\nCourse Name: "+course['name']+"\nHas Prerequisites: "+course['hasPrerequisite']+" \nCourse Capacity: "+course['capacity'])
                                    sectionList = [];
                                    if(course['enrolledSections'].length==0) {
                                        sectionList.push("No sections available");
                                    }
                                    else {
                                        course['enrolledSections'].forEach(section => sectionList.push(" "+section['sectionNum']+" "));
                                    }
                                    idList.push("\nCourse Sections Available:" +sectionList);
                                }
                            });
    document.getElementById("courseinfo").innerHTML = "Here is the information for " +courseSearched+": \n"+idList;
    


});