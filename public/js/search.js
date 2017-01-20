 //get a reference to the element
  var myBtn = document.getElementById('btnSearch');

  //add event listener
  myBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var search = [document.getElementById('ipSearch').value];
    // $.ajax({
    //   url: 'http://dental.io:3000/users/drlist',
    //   data: data,
    //   method: 'POST'
    // }).then(function (response) {
    //   // Do stuff with the response, like add it to the page dynamically.
    // //   $('#results').append(response);
    //   console.log(response);
    //   alert('hihihihi');
    // }).catch(function (err) {
    //   console.error(err);
    // });

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
    xmlhttp.send("name="+search);
  });

//   $('#formSearch').on('submit', function (event) {
//     event.preventDefault(); // Stop the form from causing a page refresh.
//     var data = {
//       username: $('#ipSearch').val()
//     };
//     alert('hi');
    
//   });