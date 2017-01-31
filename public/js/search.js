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