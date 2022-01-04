import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar"
import userapi from '../../api/userapi'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import MyFooter from "../MyFooter/MyFooter";
export default function ActionUser() {
    const history = useHistory();
    const MySwal = withReactContent(Swal);

    const [user, setUser] = useState({
        username: '',
        password: '',
        //is_active: false,
        role: 'admin'
    });

    const setValue = (e) => {
        var temp = {
            username: '',
            password: '',
            //is_active: false,
            role: ''
        }
        Object.assign(temp, user)
        temp[e.target.name] = e.target.value;
        setUser(temp);
        // console.log(temp);
    }

    const onRoleChange = e => {
        const rolename = e.target.value;
        const t = { ...user, role: rolename };
        setUser(t);
    }

    const addUser = async (e) => {
        e.preventDefault();
        // console.log(user);
        userapi.addUser(user, addUserSuccess, addUserError);
        //history.goBack();
    }


    const addUserSuccess = () => {
        Swal.fire(
            'Success!',
            'Added customer successfully.',
            'success'
        );
        history.goBack();
    }

    const addUserError = (err) => {
        Swal.fire(
            'Cannot add user!'
        );
    }

    return (
        <>
            <Header />
            <div className="page-content d-flex align-items-stretch" style={{overflowX: 'hiden', overflowY: 'auto'}}>
                <SideBar />
                <div className="content-inner">
                    {/* Page Header*/}
                    <header className="page-header">
                        <div className="container-fluid">
                            <h2 className="no-margin-bottom">Form User</h2>
                        </div>
                    </header>
                    {/* Breadcrumb*/}
                    <div className="breadcrumb-holder container-fluid">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/users">User</Link></li>
                            <li className="breadcrumb-item active">Add User</li>
                        </ul>
                    </div>
                    {/* Forms Section*/}
                    <section className="forms">
                        <div className="container-fluid">
                            <div className="row">
                                {/* Form Elements */}
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header d-flex align-items-center">
                                            <h3 className="h4">Descriptions</h3>
                                        </div>
                                        <div className="card-body">
                                            <form className="form-horizontal" >
                                                <div>
                                                    <div className="line" />
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 form-control-label">Name</label>
                                                        <div className="col-sm-9">
                                                            <input onChange={setValue} type="text" name="username" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="line" />
                                                <div className="form-group row">
                                                    <label className="col-sm-3 form-control-label">Password</label>
                                                    <div className="col-sm-3">
                                                        <input onChange={setValue} type="password" name="password" className="form-control" />
                                                    </div>
                                                </div>

                                                {/* <div className="form-group row">
                                            <label className="col-sm-3 form-control-label">Active</label>
                                            <div className="col-sm-3">
                                                <div className="i-checks">
                                                    <input type="checkbox"
                                                        name="isActive"
                                                        className="checkbox-template"
                                                        onChange={(e) => setUser({...user, role: e.target.checked})}/>
                                                </div>
                                            </div>
                                        </div> */}

                                                <div className="line" />
                                                <div className="form-group row">
                                                    <label className="col-sm-3 form-control-label">System user</label>
                                                    <div className="col-sm-9">
                                                        <select onChange={onRoleChange}>
                                                            <option value="admin">Admin</option>
                                                            <option value="company">Company</option>
                                                            <option value="customer">Customer</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="line" />
                                                <div className="form-group row">
                                                    <div className="col-sm-4 offset-sm-3">
                                                        {/* <button type="reset" className="btn btn-secondary" style={{ marginRight: 2 }}>Cancel</button> */}
                                                        <button type="submit" className="btn btn-primary" style={{ marginLeft: 250  }} onClick={addUser}>Save changes</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Page Footer*/}
                    <MyFooter></MyFooter>
                </div>
            </div>
        </>
    )
}
