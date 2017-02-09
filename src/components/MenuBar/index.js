
import React, { Component } from 'react';


export default class MenuBar extends Component {
    static propTypes = {}
    static defaultProps = {}
    state = {}

    render() {
        
        return (
            <div >
                <div className="header_bg">
                    <a href="/"><img id="logo" src="images/icons/logo.svg" alt="Dental.io Logo" /> </a>
                    <span className="headerLinks" >
                        <a href="/">HOME</a>
                        <a href="#">ABOUT</a>
                        <span className="active ">
                            <a>DOCTORS</a>
                        </span>
                        <a href="#">MEDICAL HISTORY   </a>
                        <a href="#">APPOINTMENTS</a>
                        <a href="#">COMMUNICATION</a>
                        <a href="#">PROFILE</a>
                        <a href="#">Logout</a>
                    </span>
                    <img id="hamberg" src="/images/icons/menu.svg" alt="Open Menu" className="pointer" />

                </div>
            </div>
        );
    }
}
