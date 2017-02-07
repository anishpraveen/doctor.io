var React = require("react");

module.exports = React.createClass({
    render:function(){
        return(
            <div className="footer">
                DENTAL.io &copy; 2015 All Rights Reserved
                <span className="text">                    
                    <a href="#">TERMS OF USE</a>
                    and
                    <a href="#">PRIVACY POLICY</a>
                    | Designed by
                    <a href="#">PIXELSPOTSTUDIO.COM</a>
                </span>
            </div>
        )
    }
})