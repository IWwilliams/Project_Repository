console.log("register.js");

//get proper address. Current address is a dummy value
let userList = getFetch("http://localhost:8080/api/v1/student");

function searchUser(data, id) {
    for(var i; i<data.length; i++) {
        if(data[i]['email']==id) {
            return true;
        }

    }
    return false;
}

function blankFieldAlert(formName){
    let elements = formName.elements;
    for(let i = 0; i< elements.length; i++){
        if(elements[i].value == ""){
            alert("Please fill out all fields!");
            return true;
        }
    }
    return false;
}

registerForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    console.log('register button clicked');

    if(blankFieldAlert(registerForm)==true){
        console.log("Blank fields found");
        return -1;
    }

    //ADD 
    var username = registerForm.username.value;
    var fname = registerForm.fname.value;
    var lname = registerForm.lname.value;
    var address = registerForm.fname.value;
    var password = registerForm.address.value;
    var email = registerForm.email.value;
    var cc = registerForm.cc.value;
    console.log(email);

    if(searchUser(userList, email)==true){
        console.log("USER FOUND");
        alert("We found a profile matching this information. Please login.")
        return -1;
    }else{
        //CHECK DATA INPUT 
        postFetch(addUserAPI, {"username": username, "password": password, "fname": fname, "lname": lname, "address": address, "cc":cc} );
        console.log("User added");
        //load_page("movie.html");
    }


})

