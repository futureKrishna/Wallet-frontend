import React from 'react';
import { useSelector } from 'react-redux';

function WalletTransaction() {
  const myEmployees = useSelector((state) => state.employees.myEmployees);
  return (
    <div>
      <h2>Update Wallets</h2>
      {myEmployees?.map((emp) => (
        <div key={emp.id}>
          <li>{emp.username}</li>
        </div>
      ))}
    </div>
  );
}

export default WalletTransaction;