import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";
import companyapi from '../../api/companyapi.js'
import MyFooter from "../MyFooter/MyFooter";
const UpdateCompany = () => {


    const MySwal = withReactContent(Swal)
    const { username } = useParams();
    const history = useHistory();

    const [user, setUser] = useState({});

    useEffect(() => {
        companyapi.getCompanyByUsername(username).then(res => setUser(res)).catch(err => console.log(err));
        console.log(user);
    }, [])

    const setValue = (e) => {
        var temp = {}
        Object.assign(temp, user)
        temp[e.target.name] = e.target.value;
        setUser(temp);
    }

    const onRoleChange = e => {
        const rolename = e.target.value;
        const t = { ...user, role: rolename };
        setUser(t);
    }

    const updateUser = async (e) => {
        e.preventDefault();
        // console.log(user);
        // userapi.addUser(user);
        const { full_name, phone, address, email, facebook, instagram, twitter } = user;
        const data = { full_name, phone, address, email, facebook, instagram, twitter }
        companyapi.updateCompanyByUsername(username, data, updateCompanySuccess, updateCompanyError);
    }

    const updateCompanySuccess = () => {
        Swal.fire(
            'Success!',
            'Updated company successfully.',
            'success'
        );
        history.goBack();
    }

    const updateCompanyError = (err) => {
        Swal.fire(
            'Cannot update company!'
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
                            <h2 className="no-margin-bottom">Form Edit Company</h2>
                        </div>
                    </header>
                    {/* Breadcrumb*/}
                    <div className="breadcrumb-holder container-fluid">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/company">Company</Link></li>
                            <li className="breadcrumb-item active">Edit Company</li>
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
                                                            <input type="text" name="username" value={user?.user?.username} className="form-control" disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="line" />s
                                                <div className="form-group row">
                                                    <label className="col-sm-3 form-control-label">Fullname</label>
                                                    <div className="col-sm-3">
                                                        <input onChange={setValue} type="text" name="full_name" value={user.full_name} className="form-control" />
                                                    </div>
                                                </div>

                                                <div className="line" />
                                                <div className="form-group row">
                                                    <label className="col-sm-3 form-control-label">Phone</label>
                                                    <div className="col-sm-3">
                                                        <input onChange={setValue} type="number" name="phone" value={user.phone} className="form-control" />
                                                    </div>
                                                </div>

                                                <div className="line" />
                                                <div className="form-group row">
                                                    <label className="col-sm-3 form-control-label">Address</label>
                                                    <div className="col-sm-3">
                                                        <input onChange={setValue} type="text" name="address" value={user.address} className="form-control" />
                                                    </div>
                                                </div>

                                                <div className="line" />
                                                <div className="form-group row">
                                                    <label className="col-sm-3 form-control-label">Email</label>
                                                    <div className="col-sm-3">
                                                        <input onChange={setValue} type="text" name="email" value={user.email} className="form-control" />
                                                    </div>
                                                </div>

                                                <div className="line" />
                                                <div className="form-group row">
                                                    <label className="col-sm-3 form-control-label">Facebook</label>
                                                    <div className="col-sm-3">
                                                        <input onChange={setValue} type="text" name="facebook" value={user.facebook} className="form-control" />
                                                    </div>
                                                </div>

                                                <div className="line" />
                                                <div className="form-group row">
                                                    <label className="col-sm-3 form-control-label">Instagram</label>
                                                    <div className="col-sm-3">
                                                        <input onChange={setValue} type="text" name="instagram" value={user.instagram} className="form-control" />
                                                    </div>
                                                </div>

                                                <div className="line" />
                                                <div className="form-group row">
                                                    <label className="col-sm-3 form-control-label">Twitter</label>
                                                    <div className="col-sm-3">
                                                        <input onChange={setValue} type="text" name="twitter" value={user.twitter} className="form-control" />
                                                    </div>
                                                </div>

                                                <div className="line" />
                                                <div className="form-group row">
                                                    <div className="col-sm-4 offset-sm-3">
                                                        {/* <button type="reset" className="btn btn-secondary" style={{ marginRight: 2 }}>Cancel</button> */}
                                                        <button type="submit" className="btn btn-primary" style={{marginLeft : 250}} onClick={updateUser}>Save changes</button>
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

export default UpdateCompany;