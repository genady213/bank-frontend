import { useRef, useEffect } from 'react';
import './login.css';

export function Login() {
  const myuser = useRef('');
  const mypass = useRef('');
      return (
        <div className="login-main">
            <div className="login-top">
                <h1 className="title">ATM</h1>
        </div>
            <div className="login-middle">
              <form className="login-form">
              <div 
                id = "error"
                className="error-user">Username or Password Incorrect</div>
                  <input ref={myuser} type="text" id="Username" placeholder="Username"className="loginFields"></input>
                  <br></br>
                  <input ref={mypass} type="password" id="Password" placeholder="Password" className="loginFields"></input>
                  <br></br>
                  <div className="buttondiv">
                <button
                  className="login-button"
                  type="button"
                  value="Submit"
                >
                  Login
                </button>
              </div>
  
              <a
                href="#"
                className="createAccountButton"
              >
                Create Account
              </a>
            </form>
          </div>
      </div>
    );
  }