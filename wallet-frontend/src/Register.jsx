import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './actions/AuthActions';
import styles from './styles/register.module.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    dispatch(registerUser({ username, password, is_admin: isAdmin }));
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        Register as an Employer
      </label>
      <button onClick={handleRegister} disabled={username.length===0 || password.length===0} className={styles.button}>
        Register
      </button>
    </div>
  );
};

export default Register;