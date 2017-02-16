//get a reference to the element
var myBtn = document.getElementById('btnSearch');

//add event listener
myBtn.addEventListener('click', function (event) {
    event.preventDefault();
    testFunction();
});

function testFunction() {
    var days = [];
    var dayCount = 0;
    var inputElements = document.getElementsByClassName('inputDay');
    var time = slider[0].noUiSlider.get();

    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            days[dayCount++] = inputElements[i].value;

        }
    }
    var fee = [];
    var feeCount = 0;
    var inputElements = document.getElementsByClassName('inputFee');

    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            fee[feeCount++] = inputElements[i].value;
        }
    }

    var search = [document.getElementById('ipSearch').value];

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var response = JSON.stringify(xmlhttp.responseText);
                console.log((xmlhttp.responseText))
                if (response['msg'] == 'Invalid entry') {
                    window.location.replace('/login')
                }
                put_doctors(xmlhttp.responseText);
                console.log((xmlhttp.responseText))
            }
            else if (xmlhttp.status == 400) {
                console.log('There was an error 400');
            }
            else {
                console.log('something else other than 200 was returned');
            }
        }
    };
    xmlhttp.open("POST", "http://10.3.0.237:3005/api/doctors", true);
    // xmlhttp.setRequestHeader('Access-Control-Allow-Headers', 'http://localhost:3000/');
    // xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000/search');
    // xmlhttp.setRequestHeader('Access-Control-Allow-Methods', 'POST');
    // xmlhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET');
    // xmlhttp.withCredentials = true;
    // if ($window.sessionStorage.token) {
    //   xmlhttp.setRequestHeader("Authorization", "Bearer " +  sessionStorage.jwt);
    //   }
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("name=" + search + "&&cost=" + fee + "&&days=" + days + "&&time=" + time + "&&jwt=" + sessionStorage.jwt);
}

var el = document.getElementsByClassName('ipCheckbox');

for (var i = 0; i < el.length; i++) {
    el[i].onclick = testFunction;

}

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
slider[0].noUiSlider.on('update', function () {
    var value = slider[0].noUiSlider.get();
    // inputFormat.value = value[0];
    value[0] = formatTime(value[0]);
    value[1] = formatTime(value[1]);

    var start = document.getElementsByClassName('noUi-handle-lower');
    var end = document.getElementsByClassName('noUi-handle-upper');
    start[0].innerHTML = '<br><br>' + value[0];
    end[0].innerHTML = '<br><br>' + value[1];
    testFunction();
});

function formatTime(time) {
    if (time > 12) {
        time -= 12;
        time = Math.ceil(time);
        time = time + '&nbspPM'
    }
    else {
        time = Math.ceil(time);
        time = time + '&nbspAM'
    }
    return time;
}

function put_doctors(doctors) {
    // console.log( JSON.parse(doctors));
    var arr;
    var results = document.getElementById('results');
    arr = JSON.parse(doctors);
    var response = arr[0];
    var msg = arr[1];
    // console.log(chk);
    if (response['response'] == -1) {
        results.innerHTML = msg['msg'];
        return;
    }
    var dr = arr.doctors;
    dr = createSlots(arr);

    results.innerHTML = '';
    for (var index = 0; index < dr.length; index++) {
        var element = dr[index];
        var br = document.createElement('br');
        var hr = document.createElement('hr');
        var panel = document.createElement('div');
        var panel_body = document.createElement('div');
        var docterDetails = document.createElement('div');
        var doctor = document.createElement('div');
        var doctorName = document.createElement('span');
        var doctorPost = document.createElement('span');
        var profileImg = document.createElement('img');
        var appoinment = document.createElement('div');
        var appoinmentBtn = document.createElement('button');
        var clearfix = document.createElement('div');
        var locations = document.createElement('div');
        var loc1 = document.createElement('div');
        var loc1Name = document.createElement('span');
        var loc1Addr = document.createElement('span');
        var loc2 = document.createElement('div');
        var loc2Name = document.createElement('span');
        var loc2Addr = document.createElement('span');
        var timings = document.createElement('div');
        var slots = document.createElement('div');
        var slots2 = document.createElement('div');
        var weekend1 = document.createElement('div');
        var locations = document.createElement('div');
        var costs = document.createElement('span');
        var costs2 = document.createElement('span');
        var vertical_line = document.createElement('div');

        // Setting attributes
        panel.setAttribute('id', 'doc' + index);
        panel.setAttribute('class', 'panel');
        doctor.setAttribute('class', 'doctor');
        doctorName.setAttribute('class', 'name');
        doctorPost.setAttribute('class', 'post');
        docterDetails.setAttribute('class', 'docterDetails');
        panel_body.setAttribute('class', 'panel-body');
        appoinment.setAttribute('class', 'appoinment');
        appoinmentBtn.setAttribute('class', 'btn btn-primary pointer');
        clearfix.setAttribute('class', 'clearfix');
        loc1.setAttribute('class', 'left loc1');
        loc2.setAttribute('class', 'left loc2');
        loc1Name.setAttribute('class', 'name');
        loc1Addr.setAttribute('class', 'addr');
        loc2Name.setAttribute('class', 'name');
        loc2Addr.setAttribute('class', 'addr');
        slots.setAttribute('class', 'weekday timings');
        slots2.setAttribute('class', 'weekday timings');
        weekend1.setAttribute('class', 'weekend timings');
        locations.setAttribute('class', 'locations');
        costs.setAttribute('class', 'costs');
        costs2.setAttribute('class', 'costs');
        vertical_line.setAttribute('class', 'vertical-line');
        profileImg.setAttribute('src', '/' + element.image);

        doctorName.innerText = element.name;
        doctorPost.innerHTML = element.post + '<br>' + element.education + '<br>' + element.exp + 'Years EXP';
        appoinmentBtn.innerText = 'Make Appointment';
        loc1Name.innerText = element.clinic[0].name;
        loc2Name.innerText = element.clinic[1].name;
        loc1Addr.innerHTML = element.clinic[0].address;
        loc2Addr.innerHTML = element.clinic[1].address;
        // console.log(element.clinic[0].slot);
        for (var i = 0; i < element.clinic[0].slot.length; i++) {
            var slot = element.clinic[0].slot[i];
            slots.innerHTML += '<span class="left">' + slot.days + '&nbsp:</span>';
            slots.innerHTML += '<span class="right">' + slot.time + '</span>';
            slots.appendChild(clearfix);
        }
        for (var i = 0; i < element.clinic[1].slot.length; i++) {
            var slot = element.clinic[1].slot[i];
            slots2.innerHTML += '<span class="left">' + slot.days + '&nbsp:</span>';
            slots2.innerHTML += '<span class="right">' + slot.time + '</span>';
            slots2.appendChild(clearfix);
        }
        costs.innerHTML = element.clinic[0].cost + ' INR/hours<br><br>'
        costs2.innerHTML = element.clinic[1].cost + ' INR/hours<br><br>'

        doctor.appendChild(profileImg);
        loc1.appendChild(loc1Name);
        loc1.innerHTML += '<br>';
        loc1.appendChild(loc1Addr);
        loc1.appendChild(slots);
        loc1.appendChild(clearfix);
        loc1.innerHTML += '<div class="clearfix"></div>';
        loc1.appendChild(costs);
        locations.appendChild(loc1);
        locations.appendChild(vertical_line);
        loc2.appendChild(loc2Name);
        loc2.innerHTML += '<br>';
        loc2.appendChild(loc2Addr);
        loc2.appendChild(slots2);
        loc2.appendChild(clearfix);
        loc2.innerHTML += '<div class="clearfix"></div>';
        loc2.appendChild(costs2);
        locations.appendChild(loc2);
        doctor.appendChild(profileImg);
        doctor.appendChild(doctorName);
        doctor.appendChild(br);
        doctor.appendChild(doctorPost);
        docterDetails.appendChild(doctor);
        appoinment.appendChild(appoinmentBtn);
        panel_body.appendChild(appoinment);
        panel_body.appendChild(docterDetails);
        panel_body.appendChild(clearfix);
        panel_body.appendChild(hr);
        panel_body.appendChild(locations);
        panel.appendChild(panel_body);
        results.appendChild(panel);
    }
}

function createSlots(dr) {
    if (dr.length < 1)
        console.log('&nbsp No results as per criteria');
    else {
        for (var count = 0; count < dr.length; count++) {
            for (var countClinic = 0; countClinic < 2; countClinic++) {
                dr[count].clinic[countClinic].slot = new Array;
                var k = 0;
                var slot = [];
                var startDay, endDay, time, nextDay;
                var startTime, endTime;
                for (i = 0; i <= 6; i++) {
                    startDay = dr[count].clinic[countClinic].timing[i].day;
                    if (dr[count].clinic[countClinic].timing[i].start < 0) {
                        continue;
                    }
                    endDay = dr[count].clinic[countClinic].timing[i].day;
                    // Time manipulation
                    {
                        startTime = dr[count].clinic[countClinic].timing[i].start;
                        startTime = getTime(startTime);
                        endTime = dr[count].clinic[countClinic].timing[i].end;
                        endTime = getTime(endTime);
                    }
                    time = startTime + ' - ' + endTime;
                    var startDayArr = dr[count].clinic[countClinic].timing[i];
                    for (var j = i + 1; j <= 6; j++) {
                        nextDay = dr[count].clinic[countClinic].timing[j];
                        if (nextDay.start == startDayArr.start && nextDay.end == startDayArr.end) {
                            endDay = dr[count].clinic[countClinic].timing[j].day;
                            if (endDay == 'Friday') {
                                endDay = ' - ' + endDay;
                                // console.log(countClinic+'cli'+ i+'i, j'+j+' '+endDay)
                                j++; i++;
                                dr[count].clinic[countClinic].slot.push({ days: startDay + endDay, time: time });
                                break;
                            }
                            i++;
                        }
                        else {
                            if (startDay == endDay)
                                endDay = '';
                            else
                                endDay = ' - ' + endDay
                            dr[count].clinic[countClinic].slot.push({ days: startDay + endDay, time: time });
                            break;
                        }
                    }
                    if (j == 7) {
                        if (startDay == endDay)
                            endDay = '';
                        else
                            endDay = ' - ' + endDay
                        dr[count].clinic[countClinic].slot.push({ days: startDay + endDay, time: time });
                    }
                    // console.log(i+'i, j'+j+' qqq '+endDay)
                    if (j <= 6)
                        startDay = dr[count].clinic[countClinic].timing[j];
                    if (startDay.day == 'Friday') {
                        startTime = startDay.start;
                        startTime = getTime(startTime);
                        endTime = startDay.end;
                        endTime = getTime(endTime);
                        time = startTime + ' - ' + endTime;

                        dr[count].clinic[countClinic].slot.push({ days: startDay.day, time: time });
                        j++; i++;
                    }
                }
            }
        }
        return dr;
    }
}

function getTime(time) {
    if (time > 12) {
        time = time - 12;
        var length = Math.ceil(Math.log(time + 2) / Math.LN10);
        if (length > 1)
            time = time + ':00 PM';
        else
            time = '0' + time + ':00 PM';
    }
    else {
        var length = Math.ceil(Math.log(time + 1) / Math.LN10);
        if (length > 1)
            time = time + ':00 AM';
        else
            time = '0' + time + ':00 AM';
    }
    return time;
}

//get a reference to the element
var logout = document.getElementById('aLogout');

//add event listener
logout.addEventListener('click', function (event) {
    event.preventDefault();
    sessionStorage.removeItem('jwt');
    window.location.replace('/login')
});