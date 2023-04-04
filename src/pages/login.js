import { useRef, useEffect } from 'react';
import './login.css';
import axios from '../axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

export function Login() {
  const myuser = useRef('');
  const mypass = useRef('');
  let navigate = useNavigate();


  async function sendData(user, pass) {
    var theans = "";
    const req = await axios.post('/login', {"username":user,"password":pass})
    .then((response) => {
      console.log(response);
      theans = response.data.message;
      //token = response.data.token;
      //Cookies.set('userid', response.data.id);
      //Cookies.set('username', user);
      //apiClient.defaults.headers.common["Authorization"] = token;
    return theans;
    }, (error) => {
      console.log(error);
    });
    return theans;
  }
  const routeChange = () => {
    let path = `/Home`;
    navigate(path);
  };
  const routeChangeRegister = () => {
    let path = `/Register`;
    navigate(path);
  };

      return (
        <div className="login-main">
            <div className="login-top">
                <h1 className="title">ATM</h1>
        </div>
            <div className="login-middle">
              <div 
                id = "error"
                className="error-user">Username or Password Incorrect</div>
              <form className="login-form">
                  <input ref={myuser} type="text" id="Username" placeholder="Username"className="loginFields"></input>
                  <input ref={mypass} type="password" id="Password" placeholder="Password" className="loginFields"></input>
              
            </form>
            <a
                href="#"
                className="createAccountButton"
              >
                Create Account
              </a>
            <div className="buttondiv">
                <button
                  className="login-button"
                  type="button"
                  value="Submit"
                  onClick={async () => {
                    const theToken = await sendData(
                      myuser.current.value,
                      mypass.current.value
                    );
                    if (theToken == 'Success') {
                      //Cookies.set('token', token);
                      routeChange();
                    } else {
                      document.getElementById('error').style.visibility =
                        'visible';
                    }
                  }}
                >
                  Login
                </button>
              </div>
  
              
          </div>
      </div>
    );
  }