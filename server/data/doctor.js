
var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var TimingSchema = new Schema({
    day: {type: String, trim: true, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    start: { type: Number, trim: true, min: 0, max: 22 },
    end: { type: Number, trim: true, min: 1, max: 23  } 
})

var ClinicSchema = new Schema({
    name: { type: String, trim: true },
    address: { type: String, trim: true },
    timing: [TimingSchema],
    cost:  { type: Number, trim: true }    
})

var DoctorSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String},
    image: {type: String},
    post: {type: String},
    education:   [String],
    exp: { type: Number, trim: true },
    clinic: [ClinicSchema]
});


var Doctor = mongoose.model('doctors', DoctorSchema);

module.exports = mongoose.model("doctor", DoctorSchema);