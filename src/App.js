import { Login } from './pages/login';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Signup } from './pages/signup';
import { Home } from './pages/Home';
import { Audits } from './pages/audits';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/audits" element={<Audits />} />
    </Routes>
  );
}

export default App;
