var React = require("react");
var HeaderLinks = require("./HeaderLinks.jsx")
var SchoolInfo = require("./SchoolInfo.jsx")
module.exports = React.createClass({
    render:function(){
        return(
            <div className="header_bg">
                <a href="/"><img id="logo" src="images/icons/logo.svg" alt="Dental.io Logo" /> </a>
                <HeaderLinks  />
                <img id="hamberg"  src="/images/icons/menu.svg" alt="Open Menu" className="pointer" />
                
            </div>
            
        )
    }
})