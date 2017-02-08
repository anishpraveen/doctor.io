var React = require("react");

module.exports = React.createClass({
    render: function () {
        return (
            <div id="divServices" className="sideMenu">
                <p>Services</p>
                <input id="ipServices" type="text" name="Services" />
                <input type="submit" value="" className="button pointer" />
                <hr className="sideHr" />
                <div className="checkboxGroup"><span className="spanCheckbox">
                    <input id="service1" type="checkbox" name="service" value="service1" className="ipCheckbox service" />
                    <label htmlFor="service1" className="first"><span>Services One</span></label></span><br /><span className="spanCheckbox">
                        <input id="service2" type="checkbox" name="service" value="service2" className="ipCheckbox service" />
                        <label htmlFor="service2"><span>Services Two</span></label></span><br /><span className="spanCheckbox">
                        <input id="service3" type="checkbox" name="service" value="service2" className="ipCheckbox service" />
                        <label htmlFor="service3"><span>Services Three</span></label></span><br /><span className="spanCheckbox">
                        <input id="service4" type="checkbox" name="service" value="service2" className="ipCheckbox service" />
                        <label htmlFor="service4"><span>Services Two</span></label></span><br /><span className="spanCheckbox">
                        <input id="service5" type="checkbox" name="service" value="service2" className="ipCheckbox service" />
                        <label htmlFor="service5"><span>Services Two</span></label></span><br /><span className="spanCheckbox">
                        <input id="service6" type="checkbox" name="service" value="service2" className="ipCheckbox service" />
                        <label htmlFor="service6"><span>Services Two</span></label></span><br /><span className="spanCheckbox">
                        <input id="service7" type="checkbox" name="service" value="service2" className="ipCheckbox service" />
                        <label htmlFor="service7"><span>Services Two</span></label></span><br /><span className="spanCheckbox">
                        <input id="service8" type="checkbox" name="service" value="service2" className="ipCheckbox service" />
                        <label htmlFor="service8"><span>Services Two</span></label></span><br /><span className="spanCheckbox">
                        <input id="service9" type="checkbox" name="service" value="service2" className="ipCheckbox service" />
                        <label htmlFor="service9"><span>Services Two</span></label></span></div>
            </div>
        )
    }
})