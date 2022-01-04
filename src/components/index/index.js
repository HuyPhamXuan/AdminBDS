import React, { Component, useState, useEffect } from 'react'
import MyFooter from "../MyFooter/MyFooter";
import { Line, Pie, Bar } from 'react-chartjs-2';
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";
import './style.css'
import userapi from '../../api/userapi';
import companyapi from '../../api/companyapi';
import customerapi from '../../api/customerapi.js';
import propertyapi from "../../api/propertyapi";
const DashBoard =() => {
  const [totalUser, setTotalUser] = useState(null);
  const [totalCompany, setTotalCompany] = useState(null);
  const [totalCustomer, setTotalCustomer] = useState(null);
  const [totalProperty, setTotalProperty] = useState(null);
  const getDataUser = async () => {
    const response = await userapi.getAll()
    setTotalUser(response.count);
  }
  const getDataCompany = async () => {
    const response = await companyapi.getAll()
    setTotalCompany(response.count);
  }
  const getDataCustomer = async () => {
    const response = await customerapi.getAll()
    setTotalCustomer(response.count);
  }
  const getDataProperty = async () => {
    const response = await propertyapi.getAll()
    setTotalProperty(response.count);
  }
  useEffect(() => {
    getDataUser();
    getDataCompany();
    getDataCustomer();
    getDataProperty();
}, []);
    const state = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Property',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40, 50, 60, 70, 100, 30]
          }
        ]
    }
    
    return (
      <>
        <Header/>
        <div className="d-flex p-2 col-example" style={{overflowX: 'hiden', overflowY: 'auto'}}>
          <SideBar/>
          <div className="content-inner">
            {/* Page Header*/}
            <header className="page-header">
                <div className="container-fluid">
                  <h2 className="no-margin-bottom">DashBoard</h2>
                </div>
            </header>
            {/* Dashboard Counts Section*/}
            <section className="dashboard-counts no-padding-bottom">
              <div className="container-fluid">
              <div className="row bg-white has-shadow">
              {/* Item */}
              <div className="col-xl-3 col-sm-6">
                <div className="item d-flex align-items-center">
                  <div className="icon bg-violet"><i className="icon-user" /></div>
                  <div className="title"><span>Users<br /></span>
                    <div className="progress">
                      <div role="progressbar" style={{ width: '100%', height: '4px' }} className="progress-bar bg-violet fix-processbar" />
                    </div>
                  </div>  
                  <div className="number"><strong>{totalUser}</strong></div>
                </div>
              </div>
              {/* Item */}
              <div className="col-xl-3 col-sm-6">
                <div className="item d-flex align-items-center">
                  <div className="icon bg-red"><i className="icon-padnote" /></div>
                  <div className="title"><span>Companies<br /></span>
                    <div className="progress">
                      <div role="progressbar" style={{ width: '100%', height: '4px' }} className="progress-bar bg-red fix-processbar" />
                    </div>
                  </div>
                  <div className="number"><strong>{totalCompany}</strong></div>
                </div>
              </div>
              {/* Item */}
              <div className="col-xl-3 col-sm-6">
                <div className="item d-flex align-items-center">
                  <div className="icon bg-green"><i className="icon-bill" /></div>
                  <div className="title"><span>Customers<br /></span>
                    <div className="progress">
                      <div role="progressbar" style={{ width: '100%', height: '4px' }} className="progress-bar bg-green fix-processbar" />
                    </div>
                  </div>
                  <div className="number"><strong>{totalCustomer}</strong></div>
                </div>
              </div>
              {/* Item */}
              <div className="col-xl-3 col-sm-6">
                <div className="item d-flex align-items-center">
                  <div className="icon bg-orange"><i className="icon-check" /></div>
                  <div className="title"><span>Properties<br /></span>
                    <div className="progress">
                      <div role="progressbar" style={{ width: '100%', height: '4px' }} className="progress-bar bg-orange fix-processbar" />
                    </div>
                  </div>
                  <div className="number"><strong>{totalProperty}</strong></div>
                </div>
              </div>
            </div>
                <h3 style={{paddingTop: 20}}>Report Property By Bar Chart</h3>
                <Bar 
                  width={100}
                  height={30} data={state} />
                <br />
                <br />
                <h3 style={{paddingTop: 20}}>Report Property By Line Chart</h3>
                <Line  width={100}
                  height={15}
                  data={state} />
              </div>
            </section>
            {/* Page Footer*/}
            <MyFooter></MyFooter>
          </div>
        </div>
      </>
    )
}


export default DashBoard;
