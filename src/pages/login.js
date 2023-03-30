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
                >
                  Login
                </button>
              </div>
  
              
          </div>
      </div>
    );
  }