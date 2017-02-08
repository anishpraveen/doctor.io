var React = require("react");

module.exports = React.createClass({
    render: function () {
        return (
            <div id="divWeekday" className="sideMenu">
                <p>Availability</p>
                <div className="slider">
                    <div className="sliders">             </div>
                </div><br />
                <hr className="sideHr" />
                <div className="checkboxGroup"><span className="spanCheckbox">
                    <input id="Monday" type="checkbox" name="days" value="Monday" className="ipCheckbox inputDay" />
                    <label id="Mondaylbl" htmlFor="Monday"><span>Monday</span></label></span><br /><span className="spanCheckbox">
                        <input id="Tuesday" type="checkbox" name="days" value="Tuesday" className="ipCheckbox inputDay" />
                        <label id="Tuesdaylbl" htmlFor="Tuesday"><span>Tuesday</span></label></span><br /><span className="spanCheckbox">
                        <input id="Wednesday" type="checkbox" name="days" value="Wednesday" className="ipCheckbox inputDay" />
                        <label id="Wednesdaylbl" htmlFor="Wednesday"><span>Wednesday</span></label></span><br /><span className="spanCheckbox">
                        <input id="Thursday" type="checkbox" name="days" value="Thursday" className="ipCheckbox inputDay" />
                        <label id="Thursdaylbl" htmlFor="Thursday"><span>Thursday</span></label></span><br /><span className="spanCheckbox">
                        <input id="Friday" type="checkbox" name="days" value="Friday" className="ipCheckbox inputDay" />
                        <label id="Fridaylbl" htmlFor="Friday"><span>Friday</span></label></span><br /><span className="spanCheckbox">
                        <input id="Saturday" type="checkbox" name="days" value="Saturday" className="ipCheckbox inputDay" />
                        <label id="Saturdaylbl" htmlFor="Saturday"><span>Saturday</span></label></span><br /><span className="spanCheckbox">
                        <input id="Sunday" type="checkbox" name="days" value="Sunday" className="ipCheckbox inputDay" />
                        <label id="Sundaylbl" htmlFor="Sunday"><span>Sunday</span></label></span><br /></div>
            </div>
        )
    }
})