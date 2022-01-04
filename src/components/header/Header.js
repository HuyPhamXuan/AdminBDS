import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {getPusher} from '../Pusher/pusher';
import authApi from "../../api/authApi";
import axiosadmin from '../../api/axiosadmin';

function Header(props) {

  const history = useHistory();


  const logOut = () => {
    authApi.logOut(logOutSuccess);
    getPusher() && getPusher().disconnect();
  }

  const logOutSuccess = () => {
    delete axiosadmin.defaults.headers.common["Authorization"];
    localStorage.removeItem('token');
    history.replace('/');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token?', token);
    if (token) {
      axiosadmin.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }, [])

  return (
    <header className="header">
      <nav className="navbar">
        {/* Search Box*/}
        <div className="search-box">
          <button className="dismiss">
            <i className="icon-close" />
          </button>
          <form id="searchForm" action="#" role="search">
            <input type="search" placeholder="What are you looking for..." className="form-control" />
          </form>
        </div>
        <div className="container-fluid">
          <div className="navbar-holder d-flex align-items-center justify-content-between">
            {/* Navbar Header*/}
            <div className="navbar-header">
              {/* Navbar Brand */}
              <Link to="/home" className="navbar-brand d-none d-sm-inline-block">
                <div className="brand-text d-none d-lg-inline-block"><string>admin quadaland</string></div></Link>
            </div>
            {/* Navbar Menu */}
            <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
              <  li className="nav-item"><Link onClick={logOut} className="nav-link logout"> <span className="d-none d-sm-inline">LogOut</span><i className="fa fa-sign-out" /></Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;