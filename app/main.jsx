var React = require("react");
var ReactDOM = require("react-dom");
var DoctorsList = require("./components/DoctorsList.jsx");
var MenuBar = require("./components/MenuBar.jsx");
var SearchDoctor = require("./components/SearchDoctor.jsx");
var Filters = require("./components/Filters.jsx");
var Footer = require("./components/Footer.jsx");


var doctorsStore = require("./stores/doctorsStore");
var _doctors = [];
var getDoctorsCallback = function(doctors){
    _doctors = doctors;
    render();
};
doctorsStore.onChange(getDoctorsCallback);


// var _doctors = [{ name: "Dr. Michael Faradai", post: "Dental Implant Surgeon" },
//                 { name: "Dr. Caroline Barton", post: "Dental Assistant" }];

function render() {
    ReactDOM.render(
    <div>
        <MenuBar doctors={_doctors} />
        <div className="container">
            <div className="clearfix"></div>
            <SearchDoctor />
            <div className="clearfix"></div>
            <Filters />
            <div id="results" className="panel-group"> </div>
            {/*<!--{
                _doctors.map(function(s,index){
                    return(
                        <DoctorsList info={s} key={"doctors"+index} />
                    )         
                })
            }-->*/}
            <div className="clearfix"></div>
        </div>
        <Footer />
    </div>
        , document.getElementById("container"));
}
render();