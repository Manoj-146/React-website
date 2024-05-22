// components/LoginModal.js
import React, { useState } from 'react';

const LoginModal = ({ onClose, onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    // e.preventDefault();
    if((!validateEmail(username))){
      setError('Invalid email address');
      return;
    }
    if ((password !== confirmPassword)) {
      setError('Passwords do not match');
      return;
    }
    setError('')
    onSignup(username, password);
    setUsername('');
    setPassword('');
    onClose();
  };

  const handleLogin=(e)=>{
    e.preventDefault();
    if(!validateEmail(username)){
      setError('Invalid email address');
      return;
    }
    setError('');
    onLogin(username, password);
    setUsername('');
    setPassword('');
    onClose();
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };


  return (
    <div className='modal-overlay'>
      <div className='login-page'>
        <div style={{ textAlign: 'end' }}>
          <button className='close-btn' onClick={onClose}>x</button>
        </div>
        {isLoginView ? (
          <>
            <h1>Login</h1>
            <input type="email" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='login-btn' onClick={handleLogin}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Don't have an account? <span onClick={() => setIsLoginView(false)} style={{ color: 'blue', cursor: 'pointer' }}>Sign up</span></p>
          </>
        ) : (
          <>
            <h1>Sign Up</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className='login-btn' onClick={handleSignup}>Sign Up</button>
            <p>Already have an account? <span onClick={() => setIsLoginView(true)} style={{ color: 'blue', cursor: 'pointer' }}>Login</span></p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
