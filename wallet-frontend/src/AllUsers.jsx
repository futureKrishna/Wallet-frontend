import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAllUsers } from './redux/employeeSlice';
import { addEmployeesApi, fetchAllUsers } from './actions/AllActions';
import styles from './styles/allUsers.module.css';

const AllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsers = useSelector((state) => state.employees.allUsers);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleCheckboxChange = (userId) => {
    setSelectedEmployees((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAddEmployees = async () => {
    await dispatch(addEmployeesApi({ employeeIds: selectedEmployees }));
    await dispatch(setAllUsers(allUsers.filter(user => !selectedEmployees.includes(user.id))));
    setSelectedEmployees([]);
    navigate('/my-employees');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Users</h2>
      <ul className={styles.userList}>
        {allUsers.map((user) => (
          <li key={user.id} className={styles.userItem}>
            <div className={styles.userInfo}>
              <span>{user.username}</span>
              <input
                type="checkbox"
                checked={selectedEmployees.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
                className={styles.checkbox}
              />
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddEmployees}
        disabled={selectedEmployees.length === 0}
        className={styles.addButton}
      >
        Add as Employee
      </button>
    </div>
  );
};

export default AllUsers;