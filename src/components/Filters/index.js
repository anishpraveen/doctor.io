
import React, { Component } from 'react';

import FilterService from '../FilterService'
import FilterDay from '../FilterDay'
import FilterCost from '../FilterCost'

export default class Filters extends Component {
    render() {
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
        );
    }
}
