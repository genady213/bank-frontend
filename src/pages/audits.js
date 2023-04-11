import { useRef, useEffect, useCallback, useState } from 'react';
import './audits.css';
import axios from '../axios';
import Audit from './Audit'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate, useParams,
} from 'react-router-dom';
import Cookies from "js-cookie";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export function Audits() {
  const { audit } = useParams()
  let navigate = useNavigate();
  const [theAudits, setTheAudits] = useState([])
	const [noAudits, setNoAudits] = useState(false)

  const routeChange = () => {
    let path = `/home`;
    navigate(path);
  };
  useEffect(() => {
    if (Cookies.get('userid') == null || Cookies.get('userid') == "") {
      let path = `/`;
      navigate(path);
    }}, []);

  

    useEffect(() => {
      //console.log(audit);
      const data = axios.get('/audits/' + audit)
			.then((response) => {
				console.log(response);
        console.log(response.data.data.length)
        if (!response.data.data.length){setNoAudits(true)}
        setTheAudits(Object.values(response.data.data));
			}, (error) => {
				console.log(error);
			});

	}, [])


  const userAudits = noAudits ? (
		<Audit noAudits={noAudits} />
	) : (
		theAudits.map((audit) => (
			<Audit
        amount={audit.amount}
        context={audit.context}
			/>
		))
	)

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
        <h3 className="amount">Transaction History:</h3>
        
        <div className="topTransaction"><div className="amount">Amount</div><div className="amount">Context</div></div>
        
        <div className="audits">{userAudits}</div>
          </div>
      </div>
    );
  }