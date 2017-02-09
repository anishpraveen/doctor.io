
import React, { Component } from 'react';


export default class SearchDoctor extends Component {
    render() {        
        return (
            <div id="divSearch">
                <form id="formSearch" >
                    <span>
                        <input type="text" name="search" value="" id="ipSearch" className="form-input"  
                                value={this.props.searchString}
                                ref="searchStringInput"
                                onChange={this.handleChange}  
                                placeholder="Find Dentists/Clinic" />
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
        );
    }
}
