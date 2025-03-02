import { useEffect } from "react";
import { fetchMainWalletBalance } from "./actions/AllActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styles from './styles/employeeDashboard.module.css';

const EmployeeDashboard = () => {
  const mainWalletBalance = useSelector((state) => state.wallet.mainWalletBalance);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMainWalletBalance());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Employee Wallet</h2>
      {mainWalletBalance > 0 ? (
        <div className={styles.balance}>${mainWalletBalance}</div>
      ) : (
        <div className={styles.emptyMessage}>Sorry, your wallet is empty.</div>
      )}
    </div>
  );
};

export default EmployeeDashboard;