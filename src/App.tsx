import { NavLink, Outlet, Route, Routes } from 'react-router-dom';

import Home from 'pages/home';
import Users from 'pages/users';

import logo from './assets/images/logo.webp';
import './App.scss';

const Layout = () => (
  <div className="layout-container">
    <header className="header">
      <NavLink to="/">
        <img alt="Company Logo" className="logo" src={logo} />
      </NavLink>
      <nav>
        <ul style={{ display: 'flex', gap: '20px' }}>
          <li>
            <NavLink
              to="/"
              style={{
                fontWeight: 'bold',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              style={{
                fontWeight: 'bold',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    <Outlet />
  </div>
);

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route element={<Home />} path="/" />
      <Route element={<Users />} path="/users" />
    </Route>
  </Routes>
);

export default App;
