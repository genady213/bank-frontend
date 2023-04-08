import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
  } from 'react-router-dom';
import Cookies from 'js-cookie';
import './account.css';

function Account({type,balance}) {
    
  let navigate = useNavigate();
    const routeChange = () => {
        let path = `/home/account/`;
        navigate(path);
      };
    return(
        <div className="account"
        onClick={routeChange}>
             {<h3>{type} </h3>
             }
             <h3>${balance} </h3>
        </div>

    )


}

export default Account