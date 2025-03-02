import axios from "axios";
import { setAllUsers, setMyEmployees } from "../redux/employeeSlice";
import { setMyWalletEmployees, setMainWallet } from "../redux/walletSlice";

const baseRoute='http://localhost:4000'

export const fetchMyEmployees = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${baseRoute}/my-employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(setMyEmployees(res.data));
  } catch (error) {
    console.error('Failed to fetch my employees', error);
  }
};


export const assignWalletApi = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res=await axios.post(
      'http://localhost:4000/assign-wallet',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data
  } catch (error) {
    console.error('Failed to assign wallet', error);
  }
};


export const fetchMyWalletEmployees = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${baseRoute}/my-wallet-employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch(setMyWalletEmployees(res.data));
  } catch (error) {
    console.error("Failed to fetch my wallet employees", error);
  }
};


export const walletTransactionApi = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:4000/wallet-transaction",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        alert(err.message);
      });
    } else {
      alert("Failed to perform wallet transaction. Please try again later.");
    }
    console.error("Failed to do wallet transaction", error);
  }
};


export const fetchAllUsers = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${baseRoute}/get-all-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(setAllUsers(res.data));
  } catch (error) {
    console.error('Failed to fetch All Users', error);
  }
};


export const addEmployeesApi = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res=await axios.post(
      'http://localhost:4000/add-employees',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Failed to Add employees', error);
  }
};


export const fetchMainWalletBalance = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${baseRoute}/get-wallet-balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(setMainWallet(res.data.balance));
  }
    catch (error) {
      console.error('Failed to fetch main wallet balance', error);
      if (error.response) {
        console.error('API Response:', error.response.data);
      }
    }
};

export const addToMainWalletApi = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      `${baseRoute}/add-money`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch(setMainWallet(res.data.balance));
  } catch (error) {
    console.error('Failed to add to main wallet', error);
  }
};