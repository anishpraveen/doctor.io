
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
                // console.log(xmlhttp.responseText);
                var token = JSON.parse(xmlhttp.responseText)
                // console.log(token['token'])
                // Store
                if (typeof token['token'] !== 'undefined' ) {
                    sessionStorage.jwt = token['token'];
                    window.location.replace('/search')
                }
                else{
                    // alert(token['msg'])
                    document.getElementById('error').innerText = "Invalid Credentials";
                    document.getElementById('ipUsername').style.color = "red";
                    // document.getElementById('ipUsername').style.backgroundColor = "red";
                    document.getElementById('ipPassword').style.color = "red";
                    // document.getElementById('ipPassword').style.backgroundColor = "red";
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
    xmlhttp.open("POST", "http://10.3.0.237:3005/login", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("username=" + username + "&&password=" + password);
}