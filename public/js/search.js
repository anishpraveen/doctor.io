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

    xmlhttp.open("POST", "/users/drlist", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("name="+search+"&&cost="+fee+"&&days="+days);
    // xmlhttp.send("cost="+fee);
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


var inputFormat = document.getElementById('input-Start');
var slider = document.getElementsByClassName('sliders');

noUiSlider.create(slider[0], {
	start: [9, 17],
	connect: true,
	range: {
		'min': 7,
		'max': 22
	},
	behaviour: 'drag',
});
slider[0].noUiSlider.on('update', function(){
    var value = slider[0].noUiSlider.get();
    inputFormat.value = value[0];
    testFunction();
});



// slider.addEventListener('change', function( values, handle ) {
//     alert('hi='+handle);
// 	inputFormat.value = values[handle];
// });

// inputFormat.addEventListener('change', function(){
//     alert( slider.noUiSlider.get() );
// 	sliderFormat.noUiSlider.set(this.value);
// });


