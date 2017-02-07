var dispatcher = require("../dispatcher");

function DoctorStore() {
    var listeners = [];
    var doctors = [{ name: "Dr. Michael Faradai", post: "Dental Implant Surgeon" },
                    { name: "Dr. Caroline Barton", post: "Dental Assistant" },
                    { name: "Dr. Melissa Franklin", post: "Restorative Dentistry" }];
    function getDoctors() {
        return doctors;
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    function addDoctor(doctor) {
        doctors.push(doctor)
        triggerListeners();
    }

    function deleteDoctor(doctor) {
        var _index;
        doctors.map(function (s, index) {
            if (s.name === doctor.name) {
                _index = index;
            }
        });
        doctors.splice(_index, 1);
        triggerListeners();
    }

    function triggerListeners() {
        listeners.forEach(function (listener) {
            listener(doctors);
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
        getDoctors: getDoctors,
        onChange: onChange
    }
}

module.exports = DoctorStore();