import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar"
import userapi from '../../api/userapi'
import { Link } from 'react-router-dom';
import MyFooter from "../MyFooter/MyFooter";
const UpdateUser = () => {

    const { username } = useParams();
    const history = useHistory();
    const MySwal = withReactContent(Swal);

    const [user, setUser] = useState({});

    useEffect(() => {
        userapi.getUserByUsername(username).then(res => setUser(res)).catch(err => console.log(err));
    }, [])

    const setValue = (e) => {
        var temp = {
            password: '',
            is_active: false,
            //role: ''
        }
        Object.assign(temp, user)
        temp[e.target.name] = e.target.value;
        setUser(temp);
    }

    // const onRoleChange = e => {
    //     const rolename = e.target.value;
    //     const t = { ...user, role: rolename };
    //     setUser(t);
    // }

    const updateUser = async (e) => {
        e.preventDefault();
        // console.log(user);
        // userapi.addUser(user);
        const { password, is_active } = user;
        const data = { password, is_active }
        userapi.updateUserByUsername(username, data, updateUserSuccess, updateUserError);
        //history.goBack();
    }

    const updateUserSuccess = () => {
        Swal.fire(
            'Success!',
            'Updated user successfully.',
            'success'
        );
        history.goBack();
    }

    const updateUserError = (err) => {
        Swal.fire(
            'Cannot update user'
        );
    }

    const onCheckBoxChange = (e) => {
        setUser({ ...user, is_active: e.target.checked });
    }

    return (
        <>
            <Header />
            <div className="page-content d-flex align-items-stretch" style={{overflowX: 'hiden', overflowY: 'auto'}}>
                <SideBar />
                <>
                    <div className="content-inner">
                        {/* Page Header*/}
                        <header className="page-header">
                            <div className="container-fluid">
                                <h2 className="no-margin-bottom">Form Update User</h2>
                            </div>
                        </header>
                        {/* Breadcrumb*/}
                        <div className="breadcrumb-holder container-fluid">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/users">User</Link></li>
                                <li className="breadcrumb-item active">Update User</li>
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
                                                                <input type="text" name="username" value={user.username} className="form-control" disabled />
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
                                                    <div className="line" />
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 form-control-label">Active</label>
                                                        <div className="col-sm-3">
                                                            <div className="i-checks">
                                                                <input type="checkbox"
                                                                    name="isActive"
                                                                    checked={user.is_active}
                                                                    className="checkbox-template"
                                                                    onChange={onCheckBoxChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="line" />
                                        <div className="form-group row">
                                            <label className="col-sm-3 form-control-label">System user</label>
                                            <div className="col-sm-9">
                                                <select onChange={onRoleChange}>
                                                    <option value="admin">Admin</option>
                                                    <option value="company">Company</option>
                                                    <option value="customer">Customer</option>
                                                </select>
                                            </div>
                                        </div> */}
                                                    <div className="line" />
                                                    <div className="form-group row">
                                                        <div className="col-sm-4 offset-sm-3">
                                                            {/* <button type="reset" className="btn btn-secondary" style={{ marginRight: 2 }}>Cancel</button> */}
                                                            <button type="submit" className="btn btn-primary" style={{ marginLeft: 250  }} onClick={updateUser}>Save changes</button>
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
                </>
            </div>
        </>
    )
}

export default UpdateUser;