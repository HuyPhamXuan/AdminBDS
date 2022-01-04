import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';
import userapi from '../../api/userapi';
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar"
import MyFooter from "../MyFooter/MyFooter";
const ChangePassword = () => {


    const MySwal = withReactContent(Swal)
    const history = useHistory();

    const [user, setUser] = useState({});

    useEffect(() => {

    }, [])

    const setValue = (e) => {
        var temp = {};
        Object.assign(temp, user)
        temp[e.target.name] = e.target.value;
        setUser(temp);
    }

    const changePassword = async (e) => {
        e.preventDefault();
        console.log(user);
        // const { username } = jwt(localStorage.getItem('token'))
        userapi.changeCurrentUserPassword(user, changePasswordSuccess, changePasswordError);
    }

    const changePasswordSuccess = () => {
        Swal.fire(
            'Success!',
            'Changed password successfully.',
            'success'
        );
        history.goBack();
    }

    const changePasswordError = (err) => {
        Swal.fire(
            'Cannot change password!',
        );
    }

    return (
        <>
            <Header />
            <div className="page-content d-flex align-items-stretch">
                <SideBar />
                <div className="content-inner">
                    {/* Page Header*/}
                    <header className="page-header">
                        <div className="container-fluid">
                            <h2 className="no-margin-bottom">Form Change Password</h2>
                        </div>
                    </header>
                    {/* Breadcrumb*/}
                    <div className="breadcrumb-holder container-fluid">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                            <li className="breadcrumb-item active">Chage Password</li>
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
                                            <div className="line" />
                                            <div className="form-group row">
                                                <label className="col-sm-3 form-control-label">Current Password</label>
                                                <div className="col-sm-3">
                                                    <input onChange={setValue} type="password" name="old_password" className="form-control" />
                                                </div>
                                            </div>
                                            <form className="form-horizontal" >
                                                <div className="line" />
                                                <div className="form-group row">
                                                    <label className="col-sm-3 form-control-label">Password</label>
                                                    <div className="col-sm-3">
                                                        <input onChange={setValue} type="password" name="new_password" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="line" />
                                                <div className="form-group row">
                                                    <label className="col-sm-3 form-control-label">Confirm Password</label>
                                                    <div className="col-sm-3">
                                                        <input onChange={setValue} type="password" name="confirmed_new_password" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="line" />
                                                <div className="form-group row">
                                                    <div className="col-sm-4 offset-sm-3">
                                                        {/* <button type="reset" className="btn btn-secondary" style={{ marginRight: 2 }}>Cancel</button> */}
                                                        <button type="submit" className="btn btn-primary" onClick={changePassword}>Save changes</button>
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

export default ChangePassword;