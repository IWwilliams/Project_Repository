console.log('loadCourseList');

//Function to load list and iterate through specific column from getFetch
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



