import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { fetchMainWalletBalance, fetchMyEmployees, fetchMyWalletEmployees } from './actions/AllActions'
import { logout } from './redux/authSlice'

function Layout() {
  const user=useSelector((state)=>state.auth.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const {mainWalletBalance} = useSelector((state) => state.wallet);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  useEffect(()=>{
    if(user?.is_admin){
      dispatch(fetchMyEmployees())
      dispatch(fetchMyWalletEmployees())
      dispatch(fetchMainWalletBalance())
    }
  },[])

  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#333' }}>
        {user?.is_admin?
          <>
            <NavLink to="/get-all-users" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>
              Add New Employees
            </NavLink>
            <NavLink to="/my-employees" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>
              My Employees
            </NavLink>
            <NavLink to="/wallet" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>
              Main Wallet - <span style={{fontWeight: 'bold',color:'#007BFF',marginLeft:'3px'}}>{mainWalletBalance}</span>
            </NavLink>
            {token && (
              <button onClick={handleLogout} style={{ cursor:'pointer' , color: 'white', background: 'red', border: 'none', padding: '5px 10px' }}>
                Logout
              </button>
            )}
          </>
        :
        <>
          <NavLink style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>
            Check Wallet Balance
          </NavLink>
          {token && (
            <button onClick={handleLogout} style={{ cursor:'pointer' , color: 'white', background: 'red', border: 'none', padding: '5px 10px' }}>
              Logout
            </button>
          )}
        </>
        }
      </nav>  
      <div><Outlet/></div>
    </>
  )
}

export default Layout