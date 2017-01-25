 //get a reference to the element
  var myBtn = document.getElementById('btnSearch');

  //add event listener
  myBtn.addEventListener('click', function(event) {
    event.preventDefault();

    var days = [];
    var dayCount = 0;
    var inputElements = document.getElementsByClassName('inputDay');
    
    for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked)
        {
            days[dayCount++] = inputElements[i].value;
            
        }
    }
    // console.log(days);

    var fee = [];
    var feeCount = 0;
    var inputElements = document.getElementsByClassName('inputFee');
    
    for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked)
        {
            fee[feeCount++] = inputElements[i].value;
            
        }
    }
    // console.log(fee);

    var search = [document.getElementById('ipSearch').value];

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               document.getElementById("results").innerHTML = xmlhttp.responseText;
           }
           else if (xmlhttp.status == 400) {
              console.log('There was an error 400');
           }
           else {
               console.log('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("POST", "http://dental.io:3000/users/drlist", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("name="+search+"&&cost="+fee+"&&days="+days);
    // xmlhttp.send("cost="+fee);
  });

 function testFunction() {
      var days = [];
    var dayCount = 0;
    var inputElements = document.getElementsByClassName('inputDay');
    
    for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked)
        {
            days[dayCount++] = inputElements[i].value;
            
        }
    }
    // console.log(days);

    var fee = [];
    var feeCount = 0;
    var inputElements = document.getElementsByClassName('inputFee');
    
    for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked)
        {
            fee[feeCount++] = inputElements[i].value;
            
        }
    }
    // console.log(fee);

    var search = [document.getElementById('ipSearch').value];

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               document.getElementById("results").innerHTML = xmlhttp.responseText;
           }
           else if (xmlhttp.status == 400) {
              console.log('There was an error 400');
           }
           else {
               console.log('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("POST", "10.3.0.237:3000/users/drlist", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("name="+search+"&&cost="+fee+"&&days="+days);
  }
  var el = document.getElementsByClassName('ipCheckbox');
//   document.getElementsByClassName('spanCheckbox').onclick = aaa;

//  var myEl = document.getElementsByClassName('ipCheckbox');
//  console.log(myEl.length);
// myEl[0].addEventListener('click', function() {
//     alert('Hello world again!!!');
// }, false);
for (var i = 0; i < el.length; i++) {
    el[i].onclick = testFunction;
    
}