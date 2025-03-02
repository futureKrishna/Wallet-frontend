import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToMainWalletApi, fetchMainWalletBalance } from './actions/AllActions';
import styles from './styles/mainWallet.module.css';

const MainWallet = () => {
  const [amount, setAmount] = useState('');
  const mainWalletBalance = useSelector((state) => state.wallet.mainWalletBalance);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    dispatch(fetchMainWalletBalance());
  }, [dispatch]);

  const handleAddMoney = async () => {
    await dispatch(addToMainWalletApi({ amount }));
    setAmount('');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Main Wallet</h2>
      <p className={styles.balance}>Balance: ${mainWalletBalance}</p>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleAddMoney} className={styles.button}>
        Add Money
      </button>
      {showToast && (
        <div className={styles.toast}>
          Money added successfully
        </div>
      )}
    </div>
  );
};

export default MainWallet;