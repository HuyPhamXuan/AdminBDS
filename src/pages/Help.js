import React from 'react';
import SideBar from '../components/sideBar/SideBar';
import Header from '../components/header/Header'
function Help(props) {
    return (
        <>
        <Header/>
        <div className="page-content d-flex align-items-stretch">
            <SideBar/>
        <div>
           help 
        </div>
        </div>
        </>
    );
}

export default Help;