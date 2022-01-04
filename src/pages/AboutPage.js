import React from 'react';
import SideBar from '../components/sideBar/SideBar';
import Header from '../components/header/Header'
function AboutPage(props) {
    return (
        <>
            <Header />
            <div className="page-content d-flex align-items-stretch">
                <SideBar />
                <div>
                    About page
            </div>
            </div>
        </>
    );
}

export default AboutPage;