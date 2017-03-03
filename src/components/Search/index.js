
import React, { Component } from 'react';

import MenuBar from '../MenuBar'
import SearchDoctor from '../SearchDoctor'
import Filters from '../Filters'
import Footer from '../Footer'

export default class Search extends Component {
    componentWillMount() {
        const script = document.createElement("script");

        script.src = "/js/search.js";
        script.async = true;

        document.body.appendChild(script);
    }
    render() {
        return (
            <div >
                <div>
                    <MenuBar />
                    <div className="container">
                        <div className="clearfix"></div>
                        <SearchDoctor />
                        <div className="clearfix"></div>
                        <Filters />
                        <div id="results" className="panel-group"> </div>
                        <div className="clearfix"></div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
