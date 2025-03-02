import React, { useEffect, useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { assignWalletApi, fetchMainWalletBalance, fetchMyEmployees, fetchMyWalletEmployees, walletTransactionApi } from './actions/AllActions';
import styles from './styles/myEmployees.module.css';

const transactionReducer = (state, action) => {
  switch (action.type) {
    case "SET_AMOUNT":
      return {
        ...state,
        [action.payload.userId]: {
          ...state[action.payload.userId],
          amount: action.payload.amount,
        },
      };
    case "SET_TYPE":
      return {
        ...state,
        [action.payload.userId]: {
          ...state[action.payload.userId],
          type: action.payload.type,
        },
      };
    case "RESET":
      return {};
    default:
      return state;
  }
};

const MyEmployees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myEmployees = useSelector((state) => state.employees.myEmployees);
  const myWalletEmployees = useSelector((state) => state.wallet.myWalletEmployees);
  const [transactions, dispatchTransaction] = useReducer(transactionReducer, {});
  const mainWalletBalance = useSelector((state) => state.wallet.mainWalletBalance);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [invalidAmount, setInvalidAmount] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCheckboxChange = (userId) => {
    setSelectedEmployees((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  useEffect(() => {
    dispatch(fetchMyEmployees());
  }, []);

  const handleAssignWallet = async () => {
    await dispatch(assignWalletApi({ employeeIds: selectedEmployees }));
    await dispatch(fetchMyEmployees());
    await dispatch(fetchMyWalletEmployees());
    setSelectedEmployees([]);
    setToastMessage('Wallets assigned successfully');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleTransactionChange = (userId, field, value) => {
    setInvalidAmount({ [userId]: mainWalletBalance < value });
    dispatchTransaction({ type: field === "amount" ? "SET_AMOUNT" : "SET_TYPE", payload: { userId, [field]: value } });
  };

  const handleTransactionWallet = async () => {
    const transactionData = Object.entries(transactions).map(([userId, data]) => ({
      employee_id: userId,
      amount: Number(data.amount) || 0,
      transaction_type: data.type || "credit",
    }));
    await dispatch(walletTransactionApi({ transactions: transactionData }));
    dispatchTransaction({ type: "RESET" });
    dispatch(fetchMainWalletBalance());
    setToastMessage('Transaction successful');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
    setInvalidAmount({})
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Already Assigned Wallet Employees</h2>
        <ul className={styles.employeeList}>
          {myWalletEmployees.map((user) => (
            <div key={user.id} className={styles.employeeItem}>
              <li className={styles.employeeName}>{user.username}</li>
              <input
                type="number"
                placeholder="Enter amount"
                value={transactions[user.id]?.amount || ""}
                onChange={(e) => handleTransactionChange(user.id, "amount", e.target.value)}
                className={styles.input}
              />
              {invalidAmount[user.id] && <div className={styles.invalidAmount}>Invalid Amount</div>}
              <select
                value={transactions[user.id]?.type || "credit"}
                onChange={(e) => handleTransactionChange(user.id, "type", e.target.value)}
                className={styles.select}
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
          ))}
        </ul>
        <button
          onClick={handleTransactionWallet}
          disabled={Object.keys(transactions).length === 0}
          className={styles.button}
        >
          Update Wallet Amount
        </button>
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>My Total Employees</h2>
        <ul className={styles.employeeList}>
          {myEmployees.map((user) => (
            <div key={user.id} className={styles.employeeItem}>
              <div className={styles.employeeInfo}>
                <li className={styles.employeeName}>{user.username}</li>
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                  className={styles.checkbox}
                />
              </div>
            </div>
          ))}
        </ul>
        <button
          onClick={handleAssignWallet}
          disabled={selectedEmployees.length === 0}
          className={styles.button}
        >
          Assign Wallet
        </button>
      </div>
      {showToast && (
        <div className={styles.toast}>
          {toastMessage}
        </div>
      )}
    </>
  );
};

export default MyEmployees;