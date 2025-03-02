import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles/home.module.css';

function Home() {
  return (
    <div className={styles.homeContainer}>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink to="/login" className={styles.navLink}>Login</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/register" className={styles.navLink}>Register</NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>
        <h1 className={styles.heading}>Manage Your Employees and Your Company</h1>
        <p className={styles.text}>
          Welcome to the Employee Management System. Here, you can manage your employees, track their performance, and handle all your company's needs efficiently.
        </p>
        <p className={styles.text}>
          Use the navigation bar above to access different features of the system. Whether you need to add new employees, view existing ones, or manage their wallets, we've got you covered.
        </p>
      </div>
    </div>
  );
}

export default Home;