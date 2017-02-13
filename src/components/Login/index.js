
import React, { Component } from 'react';
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';  
import * as sessionActions from '../../actions/sessionActions';

import './style.css';
import Footer from '../Footer'
export default class LogInPage extends Component {
    constructor(props) {
    super(props);
    this.state = {credentials: {username: 'root', password: 'root12'}}
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
        const script = document.createElement("script");

        script.src = "/js/login.js";
        script.async = true;

        document.body.appendChild(script);
    }
  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onSave(event) {
    event.preventDefault();
    this.props.actions.logInUser(this.state.credentials);
  }
    render() {
        // const { className, ...props } = this.props;
        return (
            <div >
                <div className="header_bg">
                    <img id="logo" src="images/icons/logo.svg" alt="Dental.io Logo" />
                    <span className="headerLinks" >
                        <a href="/">HOME</a>
                        <button className="pointer" id="btnHeader">LOGIN / REGISTER</button>
                    </span>
                    <img id="hamberg" src="/images/icons/menu.svg" alt="Open Menu" />
                </div>
                <div className="content">
                    <p className="welcome">Welcome Back</p>
                    <p className="subText">Changing the way people feel about dentistry</p>
                    <form >
                        <input className="form-input" type="text" name="username" id="ipUsername"
                            value={this.state.credentials.username}
                            ref="username"
                            onChange={this.onChange} placeholder="Username" required /><br />
                        <input className="form-input" type="password" name="password" id="ipPassword"
                            value={this.state.credentials.password}
                            onChange={this.onChange}
                            ref="password"
                            placeholder="Password" required /><br />
                        <div className="errors" id="error"></div>
                        <input className="btn btn-primary loginBtn pointer" type="submit" value="Login" id="btnLogin"  />  
                    </form>
                    <a className="actions" href="#">Forgot Password ?</a>
                    <hr className="line"></hr>
                    <div className="actions register">Don’t have an account yet? <a href="#">REGISTER</a></div>
                </div>
                <div className="guest">
                    Hi there! <br />
                    <span className="subText2">don’t need to signin? get connected as</span>
                    <br />
                    <button className="btn btn-guest loginBtn pointer" id="btnGuest"> GUEST </button>
                </div>
                <Footer />
            </div>
        );
    }
    
}
function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(LogInPage);