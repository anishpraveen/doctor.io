var React = require("react");
var actions = require("../actions/DoctorActions");

module.exports = React.createClass({
    getInitialState:function(){
      return {
          name:""
      }  
    },
    searchDoctor:function(e){
        e.preventDefault();
        actions.searchDoctor(this.state);
    },
    handleInputChange:function(e){
      e.preventDefault();
      var name = e.target.name;
      var state = this.state;
      state[name] = e.target.value;
      this.setState(state);
    },
    render:function(){
        return(
            <div id="divSearch">
                <form id="formSearch" >
                    <span>
                        <input type="text" name="search" value="" id="ipSearch" className="form-input"  placeholder="Find Dentists/Clinic" />
                        <button className="btn  pointer" type="submit" id="btnSearch" >Search </button>
                    </span>
                </form>
                <div id="divSortBy" action="search.html" method="get">
                    Sort by:
                    <select id="ddlSortBy">
                        <option value="Popularity">Popularity</option>
                        <option value="Availability">Availability</option>
                        <option value="Cost">Cost</option>
                        <option value="Recomendations">Recomendations</option>
                    </select>
                </div>
                <div className="filterIcons">
                    <img src="/images/icons/search.svg" id="imgSearch" alt="Search" />
                    <img src="/images/icons/sort.svg" id="imgSort" alt="Sort" />
                    <img src="/images/icons/filter.svg" id="imgFilter" alt="Filter" />
                </div>
            
            </div>
        )
    }
})