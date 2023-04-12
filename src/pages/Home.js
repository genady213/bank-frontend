import { useRef,  useEffect, useCallback } from 'react';
import './login.css';
import axios from '../axios';
import Account from './account';
import './Home.css';
import Popup from 'reactjs-popup';
import TextField from '@mui/material/TextField';
import useState from 'react-usestateref' 

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Cookies from "js-cookie";
export function Home() {
  const [version, setVersion, versionRef] = useState()
  const [accountSend, setAccountSend, accountSendRef] = useState()
  const context = useRef('');
  const balances = useRef('');
    const type = useRef('');
    const balance = useRef('');
    const [accounts, setAccounts] = useState([])
    const [open, setOpen] = useState(false);  
    const closeModal = () => {
      setOpen(false)
    };
    let navigate = useNavigate();
    const [audit, setAudit, auditRef] = useState()
    const audits = () => {
      let path = `/audits/` + auditRef.current;
      navigate(path);
    };
    const logout = () => {
        let path = `/`;
        Cookies.set('userid', "");
        navigate(path);
      };
      useEffect(() => {
        if (Cookies.get('userid') == null || Cookies.get('userid') == "") {
          let path = `/`;
          navigate(path);
        }}, []);
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

      async function getAccount() {
        var theans = "";
        const req = await axios.get('/accounts/' + Cookies.get('userid') + '/' + accountSendRef.current)
        .then((response) => {
          console.log(response);
          theans = response.data.message;
        return theans;
        }, (error) => {
          console.log(error);
        });
        return theans;
      }

      async function newTransaction(amount,context) {
        var theans = "";
        const req = await axios.put('/transaction', {"amount":amount,"account":accountSendRef.current, "version":versionRef.current, "context":context})
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
                <div className="Logoutbutton">
            <a
                href="#"
                onClick={logout}
                className="logout"
              >
                LogOut
              </a></div>
            <h1 className="title2">Accounts for {Cookies.get('userid')}:</h1>
            <div className="accountsHome">
            <Popup
            open={open} closeOnDocumentClick onClose={closeModal}
          >
            {close => (
              <div className="modal">
                <button className="close" onClick={closeModal}>
                  &times;
                </button>
                <div className="popupheader">New Transaction</div>
                <div className="textFieldArea">
                  <TextField className="textFields" label="Context" inputRef={context} />
                  <TextField className="textFields" label="Amount" inputRef={balances} />
                  <div id = "error2" className="error-user">Transaction Create Failed</div>
                  <div className="popupButtonArea">
                    <button className="popupButton"
                    onClick={async() => {
                      const redirectSuccess = await newTransaction(balances.current.value,context.current.value);
                      console.log(redirectSuccess)
                            if(redirectSuccess == "Success"){ 
                               fetchData();
                               close();
                              }else{
                              document.getElementById("error2").style.visibility = 'visible';
                              } 
                      }}
                    >Add Transaction</button>
                  </div>
                </div>
              </div>
            )}
          </Popup>
              {accounts.map((account) => (
                <div className="account" onClick={() => {setOpen(o => !o); setAccountSend(account._id); setVersion(account.version)}}> 
					<Account 
            keys={account._id}
						type={account.type}
            balance={account.balance}
            version={account.version}
            /><a
            href="#"
            onClick={() => {setAudit(account._id); audits()}}
            className="audits"
          >
            View Past Transactions
          </a></div>

				))}
                <div className="newaccount">
                <input ref={type} type="text" id="accType" placeholder="Account Type"className="accountCreate"></input>
                <input ref={balance} type="text" id="accBalance" placeholder="Balance" className="accountCreate"></input>
                <button
                  className="newAccountButton"
                  type="button"
                  value="Submit"
                  onClick={async () => {
                    const theToken = await newAccount(
                        type.current.value,
                        balance.current.value
                    );
                    fetchData();
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