import { useRef, useState, useEffect, useCallback } from 'react';
import './login.css';
import axios from '../axios';
import Account from './account';
import './Home.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Cookies from "js-cookie";
export function Home() {
    const type = useRef('');
    const balance = useRef('');
    const [accounts, setAccounts] = useState([])

    async function newAccount(type, balance) {
        var theans = "";
        const req = await axios.post('/accounts', {"user":Cookies.get('userid'),"type":type, "balance":balance})
        .then((response) => {
          console.log(response);
          theans = response.data.message;
        return theans;
        }, (error) => {
          console.log(error);
        });
        return theans;
      }

	const fetchData = useCallback(async () => {
		const data = await axios.get('/accounts/' + Cookies.get('userid'))
			.then((response) => {
				console.log(response);
                setAccounts(response.data.accounts);
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
            <h1 className="title2">Accounts for {Cookies.get('userid')}:</h1>
            <div className="accountsHome">
              {accounts.map((account) => (
					<Account
						//keys={channel.conversationID}
						type={account.type}
                        balance={account.balance}
						//id={channel._id}
					/>

				))}
                <div className="newaccount">
                <input ref={type} type="text" id="accType" placeholder="Account Type"className="accountCreate"></input>
                <input ref={balance} type="text" id="accBalance" placeholder="Balance" className="accountCreate"></input>
                <button
                  className="newAccount"
                  type="button"
                  value="Submit"
                  onClick={async () => {
                    const theToken = await newAccount(
                        type.current.value,
                        balance.current.value
                    );
                    
                  }}
                >
                  +
                </button>
                </div>
                </div>
          </div>
      </div>
    );
  }