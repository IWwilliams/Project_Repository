console.log("coursecatalogue.js");

let catalogue = document.getElementById('allcourseinfo');

async function load_course_list(api) {
    let courseList = await getFetch(api);
    idList = [];
    courseList.forEach(course => idList.push(course['name']));
    console.log(idList);
    return idList;
}

async function loadSectionList(api) {
    let sectionList = await getFetch(api);
    idList = [];
    sectionList.forEach(section => idList.push(section));
    console.log(idList);
    return idList;
}

window.addEventListener('load', async function (evt){
    evt.preventDefault();
    console.log('Course catalogue page selected');

    console.log("test fetch");

    var apiString = "http://localhost:8080/api/v1/course";
    var apiResponse = await getFetch(apiString);
    console.log(apiResponse);
    if(apiResponse.length == 0){
        catalogue.innerHTML = "No courses found";
        return -1;
    }
    
    var formattedOutput = []
    // apiResponse.forEach(object => formattedOutput.push(object.id));
    for(var i = 0; i < apiResponse.length; i++){
        formattedOutput += i + 1 + ")" + apiResponse[i].name + "\n"
        console.log(formattedOutput);
    }
    
    catalogue.innerHTML = formattedOutput;
});