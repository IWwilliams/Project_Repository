
async function dataLoad() {

let allStudents = await getFetch(getAllStudentsAPI);

if(allStudents.length == 0) {
    console.log("Student Dataloader Executed");
    postFetch(addStudentAPI, {'username': 'Sally', 'password': 'sally', 'ucid': '900'});
    postFetch(addStudentAPI, {'username': 'Denise', 'password': 'denise', 'ucid': '750'});
    postFetch(addStudentAPI, {'username': 'Harry', 'password': 'harry', 'ucid': '888'});
    postFetch(addStudentAPI, {'username': 'Peter', 'password': 'peter', 'ucid': '654'});
    postFetch(addStudentAPI, {'username': 'Helen', 'password': 'helen', 'ucid': '5322'});
    postFetch(addStudentAPI, {'username': 'Helga', 'password': 'helga', 'ucid': '387211'});
}

let allCourses = await getFetch(getAllCoursesAPI);
if(allCourses.length == 0) {
    console.log("Course Dataloader Executed");
    postFetch(addNewCourse, {'name': "ENSF607",  'startTime': '2022-11-01',  'endTime': "2022-11-04",  "capacity": 6, "hasPrerequisite": "FALSE"})
    postFetch(addNewCourse, {'name': "ENSF611",  'startTime': '2022-11-01',  'endTime': "2022-11-04",  "capacity": 6, "hasPrerequisite": "TRUE"})
    postFetch(addNewCourse, {'name': "ENSF612",  'startTime': '2022-11-01',  'endTime': "2022-11-04",  "capacity": 6, "hasPrerequisite": "FALSE"})
    postFetch(addNewCourse, {'name': "ENE600",  'startTime': '2022-11-01',  'endTime': "2022-11-04",  "capacity": 6, "hasPrerequisite": "FALSE"})
    postFetch(addNewCourse, {'name': "ENG450",  'startTime': '2022-11-01',  'endTime': "2022-11-04",  "capacity": 6, "hasPrerequisite": "FALSE"})
    postFetch(addNewCourse, {'name': "ENE555",  'startTime': '2022-11-01',  'endTime': "2022-11-04",  "capacity": 6, "hasPrerequisite": "FALSE"})

    
}

console.log(allCourses);
console.log(allStudents);
}

dataLoad();
