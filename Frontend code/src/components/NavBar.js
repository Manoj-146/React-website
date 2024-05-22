// components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ loggedIn, onLogin, onLogout }) => {

  return (
    <nav className='navbar'>
      <h3 style={{margin:'0px', marginLeft: "30px"}}><Link to="/" style={{textDecoration:"none", color: "white"}}>Ecommerce Website</Link></h3>
      {loggedIn ? (
          <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
            <button><Link to="/" style={{color:'white', textDecoration:'none'}} onClick={onLogout}>Logout</Link></button>
            <Link to="/cart" style={{color:'white', textDecoration:'none'}}><button>Cart</button></Link>
          </div>
      ) : (
          <button className="Login-btn" onClick={onLogin} >Login</button>
      )}
    </nav>
  );
};

export default NavBar;
