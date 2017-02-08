var React = require("react");

module.exports = React.createClass({
    render: function () {
        return (
            <div id="divFees" className="sideMenu">
                <p>Fees</p>
                <hr className="sideHr" />
                <div className="checkboxGroup"><span className="spanCheckbox">
                    <input id="slab1" type="checkbox" name="slabs" value="slab1" className="ipCheckbox inputFee" />
                    <label id="slab1lbl" htmlFor="slab1"> <span>Free - 100</span></label></span><br /><span className="spanCheckbox">
                        <input id="slab2" type="checkbox" name="slabs" value="slab2" className="ipCheckbox inputFee" />
                        <label id="slab2lbl" htmlFor="slab2"><span>100 - 250</span></label></span><br /><span className="spanCheckbox">
                        <input id="slab3" type="checkbox" name="slabs" value="slab3" className="ipCheckbox inputFee" />
                        <label id="slab3lbl" htmlFor="slab3"><span>250 - 500</span></label></span><br /><span className="spanCheckbox">
                        <input id="slab4" type="checkbox" name="slabs" value="slab4" className="ipCheckbox inputFee" />
                        <label id="slab4lbl" htmlFor="slab4"><span>500 - 1000</span></label></span><br /><span className="spanCheckbox">
                        <input id="slab5" type="checkbox" name="slabs" value="slab5" className="ipCheckbox inputFee" />
                        <label id="slab5lbl" htmlFor="slab5"><span>1000 - 1500</span></label></span><br /><span className="spanCheckbox">
                        <input id="slab6" type="checkbox" name="slabs" value="slab6" className="ipCheckbox inputFee" />
                        <label id="slab6lbl" htmlFor="slab6"><span>1500 - 2000</span></label></span><br /><span className="spanCheckbox">
                        <input id="slab7" type="checkbox" name="slabs" value="slab7" className="ipCheckbox inputFee" />
                        <label id="slab7lbl" htmlFor="slab7"><span>2000 - 2500</span></label></span><br /></div>
            </div>
        )
    }
})