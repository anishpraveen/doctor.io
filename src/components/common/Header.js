import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';


class Header extends React.Component {
    constructor(props) {
        super();
        this.logOut = this.logOut.bind(this);
    }

    logOut(event) {
        event.preventDefault();
        this.props.actions.logOutUser();
    }

    render() {
        if (this.props.logged_in) {
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
        } else {
            return (
                <nav>
                    <IndexLink to="/" activeClassName="active">Home</IndexLink>
                    {" | "}
                    <Link to="/login" activeClassName="active">Login</Link>
                    
                </nav>
            );
        }
    }
}

Header.propTypes = {
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return { logged_in: state.session };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(sessionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);