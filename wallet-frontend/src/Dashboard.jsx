import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './styles/dashboard.module.css';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const myEmployees = useSelector((state) => state.employees.myEmployees);
  const { myWalletEmployees, mainWalletBalance } = useSelector((state) => state.wallet);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome, {user?.username}</h1>
      {user?.is_admin ? (
        <div className={styles.buttonGroup}>
          <div className={styles.info}>
            Total Employees: {myEmployees?.length + myWalletEmployees?.length}
          </div>
          <div className={styles.info}>
            Total Wallet Balance: {mainWalletBalance}
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/employee-dashboard')}
          className={styles.employeeButton}
        >
          View Wallet
        </button>
      )}
    </div>
  );
};

export default Dashboard;