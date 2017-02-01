 //get a reference to the element
  var myBtn = document.getElementById('btnSearch');

  //add event listener
  myBtn.addEventListener('click', function(event) {
    event.preventDefault();
    testFunction();
  });

function testFunction() {
      var days = [];
    var dayCount = 0;
    var inputElements = document.getElementsByClassName('inputDay');
    var time = slider[0].noUiSlider.get();

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
            //    console.log(xmlhttp.responseText);
               put_doctors(xmlhttp.responseText);
            //    document.getElementById("results").innerHTML = xmlhttp.responseText;

           }
           else if (xmlhttp.status == 400) {
              console.log('There was an error 400');
           }
           else {
               console.log('something else other than 200 was returned');
           }
        }
    };
    xmlhttp.open("POST", "/users/drlist", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("name="+search+"&&cost="+fee+"&&days="+days+"&&time="+time);
}

var el = document.getElementsByClassName('ipCheckbox');

for (var i = 0; i < el.length; i++) {
    el[i].onclick = testFunction;
    
}


// var inputFormat = document.getElementById('input-Start');
var slider = document.getElementsByClassName('sliders');

noUiSlider.create(slider[0], {
	start: [9, 17],
	connect: true,
	range: {
		'min': 7,
		'max': 22
	},
    margin: 3,
	behaviour: 'drag',
});
slider[0].noUiSlider.on('update', function(){
    var value = slider[0].noUiSlider.get();
    // inputFormat.value = value[0];
    value[0] = formatTime(value[0]);
    value[1] = formatTime(value[1]);
        
    var start = document.getElementsByClassName('noUi-handle-lower');
    var end = document.getElementsByClassName('noUi-handle-upper');
    start[0].innerHTML = '<br><br>'+value[0];
    end[0].innerHTML = '<br><br>'+value[1];
    testFunction();
});

function formatTime(time){
    if(time>12){
        time-=12;
        time = Math.ceil(time);
        time = time+'&nbspPM'
    }
    else{
        time = Math.ceil(time);
        time = time+'&nbspAM'
    }
    return time;
}

function put_doctors(doctors){
    // console.log( JSON.parse(doctors));
    var arr ;
    arr = JSON.parse(doctors);
    var dr = arr.doctors;
    console.log(dr);
    var results = document.getElementById('results');
    results.innerHTML = ''; 
    // for (var index = 0; index < dr.length; index++) {
    //     var element = dr[index];
    //     var br = document.createElement('br');
    //     var hr = document.createElement('hr');
    //     var panel = document.createElement('div');
    //     var panel_body = document.createElement('div');
    //     var docterDetails = document.createElement('div');
    //     var doctor = document.createElement('div');
    //     var doctorName = document.createElement('span');
    //     var doctorPost = document.createElement('span');
    //     var profileImg = document.createElement('img');
    //     var appoinment = document.createElement('div');
    //     var appoinmentBtn = document.createElement('button');
    //     var clearfix = document.createElement('div');
    //     var locations = document.createElement('div');
    //     var loc1 = document.createElement('div');
    //     var loc1Name = document.createElement('span');
    //     var loc1Addr = document.createElement('span');
    //     var timings = document.createElement('div');
    //     var weekday1 = document.createElement('div');
    //     var weekend1 = document.createElement('div');
    //     var locations = document.createElement('div');
        
    //     // Setting attributes
    //     panel.setAttribute('id', 'doc'+index);
    //     panel.setAttribute('class', 'panel');
    //     doctor.setAttribute('class', 'doctor');
    //     doctorName.setAttribute('class', 'name');
    //     doctorPost.setAttribute('class', 'post');
    //     docterDetails.setAttribute('class', 'docterDetails');
    //     panel_body.setAttribute('class', 'panel-body');
    //     appoinment.setAttribute('class', 'appoinment');
    //     appoinmentBtn.setAttribute('class', 'btn btn-primary pointer');
    //     clearfix.setAttribute('class', 'clearfix');
    //     loc1.setAttribute('class', 'left loc1');
    //     loc1Name.setAttribute('class', 'name');
    //     loc1Addr.setAttribute('class', 'addr');
    //     weekday1.setAttribute('class', 'weekday');
    //     weekend1.setAttribute('class', 'weekend');
    //     locations.setAttribute('class', 'locations');
    //     profileImg.setAttribute('src', '/'+element.image);

    //     doctorName.innerText = element.name;
    //     doctorPost.innerHTML = element.post+'<br>'+element.education+'<br>'+element.exp+'Years EXP';
    //     appoinmentBtn.innerText = 'Make Appointment';
    //     loc1Name.innerText = element.clinic[0].name;
    //     loc1Addr.innerHTML = element.clinic[0].address;
    //     console.log(element.clinic[0].slot);
    //     // for (var i = 0; i < element.clinic[0].slot.length; i++) {
    //     //     var slot = element.clinic[0].slot[i];
    //     //     weekday1.innerHTML += '<span class="left">'+slot.start+'</span>';
    //     //     weekday1.innerHTML += '<span class="right">'+slot.time+'</span>';
    //     //     weekday1.appendChild(clearfix);
    //     // }
        

    //     doctor.appendChild(profileImg);
    //     loc1.appendChild(loc1Name);
    //     loc1.innerHTML += '<br>';
    //     loc1.appendChild(loc1Addr);
    //     loc1.appendChild(weekday1);
    //     locations.appendChild(loc1);
    //     // panel.appendChild(panel_body);
    //     // panel.appendChild(panel_body);
    //     doctor.appendChild(profileImg);
    //     doctor.appendChild(doctorName);
    //     doctor.appendChild(br);
    //     doctor.appendChild(doctorPost);
    //     docterDetails.appendChild(doctor);
    //     appoinment.appendChild(appoinmentBtn);
    //     panel_body.appendChild(appoinment);
    //     panel_body.appendChild(docterDetails);
    //     panel_body.appendChild(clearfix);
    //     panel_body.appendChild(hr);
    //     panel_body.appendChild(locations);
    //     panel.appendChild(panel_body);
    //     results.appendChild(panel);
    // }
}