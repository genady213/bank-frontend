import { useRef, useEffect, useCallback } from 'react';
import './audits.css';
import axios from '../axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Cookies from "js-cookie";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export function Audits() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/home`;
    navigate(path);
  };
  useEffect(() => {
    if (Cookies.get('userid') == null || Cookies.get('userid') == "") {
      let path = `/`;
      navigate(path);
    }}, []);

    const fetchData = useCallback(async () => {
		const data = await axios.get('/audits/' + Cookies.get('userid'))
			.then((response) => {
				console.log(response);
                //setAccounts(response.data.accounts);
			}, (error) => {
				console.log(error);
			});

	}, [])

    useEffect(() => {
		fetchData()
	}, [fetchData])

      return (
        <div className="login-main">
            <div className="login-top">
                <h1 className="title">ATM</h1>
        </div>
            <div className="login-middle">
            <div
          className="arrow"
          
        >
          <ArrowBackIosNewIcon onClick={() => {
            routeChange();
          }}/>
        </div>
          </div>
      </div>
    );
  }