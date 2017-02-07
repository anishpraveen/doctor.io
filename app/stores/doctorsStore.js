var dispatcher = require("../dispatcher");
var doctorService = require("../services/doctorService");

function DoctorStore() {
    var listeners = [];

    function onChange(listener) {
        getDoctors(listener);
        listeners.push(listener);
    }
    
    function getDoctors(cb){
        doctorService.getDoctors().then(function (res) {
            cb(res);
        });
    }

    function addDoctor(doctor) {
        doctorService.addDoctor(doctor).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function deleteDoctor(doctor) {
        doctorService.deleteDoctor(doctor).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function triggerListeners() {
        getDoctors(function (res) {
            listeners.forEach(function (listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "doctor") {
            switch (split[1]) {
                case "addDoctor":
                    addDoctor(payload.doctor);
                    break;
                case "deleteDoctor":
                    deleteDoctor(payload.doctor);
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = DoctorStore();