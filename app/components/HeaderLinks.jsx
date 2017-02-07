var React = require("react");


module.exports = React.createClass({
   render:function(){
       return(
           <span className="headerLinks" >
                <a href="/">HOME</a>
                <a href="#">ABOUT</a>
                <span className="active ">
                    <a>DOCTORS</a>
                </span>            
                <a href="#">MEDICAL HISTORY   </a>
                <a href="#">APPOINTMENTS</a>
                <a href="#">COMMUNICATION</a>
                <a href="#">PROFILE</a>
                <a href="#">Logout</a>
            </span>
       )
   } 
});