var dispatcher = require("../dispatcher");

module.exports = {
    addDoctor:function(school){
        dispatcher.dispatch({
           doctor:doctor,
           type:"doctor:addDoctor" 
        });
    },
    deleteDoctor:function(doctor){
        dispatcher.dispatch({
           doctor:doctor,
           type:"doctor:deleteDoctor" 
        });
    }
}