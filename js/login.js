
//get a reference to the element
var myBtn = document.getElementById('btnLogin');

//add event listener
myBtn.addEventListener('click', function (event) {
    event.preventDefault();
    login();
});

function login(){
    
    var username = [document.getElementById('ipUsername').value];
    var password = [document.getElementById('ipPassword').value];
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var token = JSON.parse(xmlhttp.responseText)
                // Store
                if (typeof token['token'] !== 'undefined' ) {
                    sessionStorage.jwt = token['token'];
                    window.location.replace('/search')
                }
                else{
                    document.getElementById('error').innerText = "Invalid Credentials";
                    document.getElementById('ipUsername').style.color = "red";
                    document.getElementById('ipPassword').style.color = "red";
                }
            }
            else if (xmlhttp.status == 400) {
                console.log('There was an error 400');
            }
            else {
                console.log('something else other than 200 was returned');
            }
        }
    };
    xmlhttp.open("POST", "login", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("username=" + username + "&&password=" + password);
}