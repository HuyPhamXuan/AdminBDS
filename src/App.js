import './App.css';
import HomePage from './pages/HomePage';
import Header from './components/header/Header';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Property from './components/property/Property';
import Company from './components/company/Company';
import Customer from './components/customer/Customer';
import Role from './components/role/Role';
import User from './components/user/User';
import AboutPage from './pages/AboutPage';
import Help from './pages/Help';
import Login from './components/login/Login';
import AddProperty from "./components/property/AddProperty";
import SideBar from './components/sideBar/SideBar';
import ActionUser from './components/user/ActionUser';
import LoginPage from './pages/LoginPage';
import UpdateUser from './components/user/UpdateUser';
import ChangePassword from "./components/change-password";
import UpdateCustomer from './components/customer/UpdateCustomer';
import AddCustomer from './components/customer/AddCustomer';
import AddCompany from './components/company/AddCompany';
import UpdateCompany from './components/company/UpdateCompany';
import UpdateProperty from './components/property/UpdateProperty';
import PropertySaleMethods from './components/PropertySaleMethods/PropertySaleMethods';
import MediaTable from "./components/media";
import { useEffect } from 'react';
import Page404 from './components/404/404';
import {createPusher} from './components/Pusher/pusher';


function App() {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      return createPusher()
    }

}, [])

  return (
    <Router>
      <Switch>
        <Route path="/home" render ={() => {
            return localStorage.token ? <HomePage></HomePage> : <Redirect to="/login"></Redirect>
          }}>
          </Route>

        <Route path="/login" render ={() => {
            return !localStorage.token ? <Login></Login> : <Redirect to="/home"></Redirect>
          }}>
          </Route>
        <Route exact path="/property" render ={() => {
            return localStorage.token ? <Property></Property> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route path="/property/add" render ={() => {
            return localStorage.token ? <AddProperty></AddProperty> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route path="/company" render ={() => {
            return localStorage.token ? <Company></Company> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route exact path="/companies/add" render ={() => {
            return localStorage.token ? <AddCompany></AddCompany> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route exact path="/customer" render ={() => {
            return localStorage.token ? <Customer></Customer> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route exact path="/customers/add" render ={() => {
            return localStorage.token ? <AddCustomer></AddCustomer> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route path="/roles" render ={() => {
            return localStorage.token ? <Role></Role> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route path="/propertysalemethods" render ={() => {
            return localStorage.token ? <PropertySaleMethods></PropertySaleMethods> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route exact path="/users" render ={() => {
            return localStorage.token ? <User></User> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route exact path="/users/add" render ={() => {
            return localStorage.token ? <ActionUser></ActionUser> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        {/* <Route exact path="/users/add" component={ActionUser}></Route> */}
        <Route path="/users/edit/:username" render ={() => {
            return localStorage.token ? <UpdateUser></UpdateUser> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route path="/change-password" render ={() => {
            return localStorage.token ? <ChangePassword></ChangePassword> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route path="/customers/edit/:username" render ={() => {
            return localStorage.token ? <UpdateCustomer></UpdateCustomer> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route path="/property/edit/:slug" render ={() => {
            return localStorage.token ? <UpdateProperty></UpdateProperty> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route path="/companies/edit/:username" render ={() => {
            return localStorage.token ? <UpdateCompany></UpdateCompany> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
        <Route path="/media" render ={() => {
            return localStorage.token ? <MediaTable></MediaTable> : <Redirect to="/login"></Redirect>
          }}>
          </Route>
          <Route exact path="" render ={() => {
            return localStorage.token ? <Redirect to="/home"></Redirect> : <Redirect to="/login"></Redirect>
          }}>
            
            </Route>
        <Route><Page404></Page404></Route>
      </Switch>
    </Router>
  );
}

export default App;
