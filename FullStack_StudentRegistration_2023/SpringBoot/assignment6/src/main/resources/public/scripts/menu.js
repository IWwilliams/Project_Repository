console.log("menu.js");

const menuForm = document.getElementById('menu');

//Welcome message
if(sessionStorage.getItem("studentName") === null) {
    document.getElementById('welcome').innerHTML = "Welcome to student registration!";
}
else {
    document.getElementById('welcome').innerHTML = "Hi "+sessionStorage.getItem("studentName")+"!";
}

menuForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    console.log('register button pressed');

    //Creates a [key,value] for each radio button and pulls the value on submit
    const data = new FormData(menuForm);
    let menuOption = "";
    for(let output of data) {
        //prints output as [key, value]
        //so output[1] = name of selected option
        console.log(output[1]);
        menuOption = output[1];
    }

    switch(menuOption) {
        case "add_course":
            load_page("addCourse.html");
            break;
        case "remove_course" :
            load_page("removeCourse.html");
            break;
        case "search_course":
            load_page("search.html");
            break;
        case "view_registrations":
            load_page("displayStudent.html");
            break;
        case "view_course_catalogue":
            load_page("displayCatalogue.html");
            break;
        case "quit_command":
            alert("Thanks for registering! You will be logged out now");
            sessionStorage.clear();
            load_page("index.html");
            break;
        default:
            console.log("nothing");
    }
});

