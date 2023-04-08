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
import Cookies from "js-cookie";

export function Signup() {
  const fname = useRef('');
  const lname = useRef('');
  const myuser = useRef('');
  const mypass = useRef('');
  let navigate = useNavigate();


  async function sendData(first, last, user, pass) {
    var theans = "";
    const req = await axios.post('/signup', {"username":user,"password":pass,"first_name": first,"last_name": last})
    .then((response) => {
      console.log(response);
      theans = response.data.message;
      //token = response.data.token;
      Cookies.set('userid', user);
      //Cookies.set('username', user);
      //apiClient.defaults.headers.common["Authorization"] = token;
    return theans;
    }, (error) => {
      console.log(error);
    });
    return theans;
  }
  const routeChange = () => {
    let path = `/home`;
    navigate(path);
  };
  const login = () => {
    let path = `/`;
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
                className="error-user">Failed to create account</div>
                      <form className="login-form">
                  <input ref={fname} type="text" id="Fname" placeholder="Firstname"className="loginFields"></input>
                  <input ref={lname} type="text" id="Lname" placeholder="Lastname" className="loginFields"></input>
              
            </form>
              <form className="login-form">
                  <input ref={myuser} type="text" id="Username" placeholder="Username"className="loginFields"></input>
                  <input ref={mypass} type="password" id="Password" placeholder="Password" className="loginFields"></input>
              
            </form>
            <a
                href="#"
                onClick={login}
                className="createAccountButton"
              >
                Have an account? Log In
              </a>
            <div className="buttondiv">
                <button
                  className="login-button"
                  type="button"
                  value="Submit"
                  onClick={async () => {
                    const theToken = await sendData(
                      fname.current.value,
                      lname.current.value,
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
                  SignUp
                </button>
              </div>
  
              
          </div>
      </div>
    );
  }