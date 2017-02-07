var mongoose = require("mongoose");
var Doctor = require("../data/doctor");
var _ = require("underscore");

var router = require("express").Router();
router.route("/doctors/:id?").get(getDoctors).post(addDoctor).delete(deleteDoctor);

function getDoctors(req, res) {
    Doctor.find(function (err, doctors) {
        if (err)
            res.send(err);
        else
            res.json(doctors);
    });
}

function addDoctor(req, res) {
    var doctor = new Doctor(_.extend({}, req.body));
    doctor.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json(doctor);
    });
}

function deleteDoctor(req, res) {
    var id = req.params.id;
    Doctor.remove({ _id: id }, function (err, removed) {
        if (err)
            res.send(err)
        else
            res.json(removed);
    });
}

module.exports = router;