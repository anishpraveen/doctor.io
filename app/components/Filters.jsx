var React = require("react");
var FilterService = require("../components/FilterService.jsx");
var FilterDay = require("../components/FilterDay.jsx");
var FilterCost = require("../components/FilterCost.jsx");

module.exports = React.createClass({
    render: function () {
        return (
            <div className="contentContainer">
                <div className="sideMenuGroup">
                    <FilterService />
                    <div className="clearfix"></div>
                    <FilterDay />
                    <div className="clearfix"></div>
                    <FilterCost />
                </div>
            </div>
        )
    }
})