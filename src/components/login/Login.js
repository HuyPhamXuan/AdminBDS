import React, { useEffect, useState } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import authApi from '../../api/authApi';
import axiosadmin from '../../api/axiosadmin';
import {createPusher} from '../Pusher/pusher';

function Login(props) {
    const MySwal = withReactContent(Swal)

    const history = useHistory();

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [icon, setIcon] = useState('fa-eye')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleUsernameInput(event) {
        setUsername(event.target.value)
    }

    function handlePasswordInput(event) {
        setPassword(event.target.value)
    }

    async function logIn(event) {
        console.log('alo');
        event.preventDefault();
        await authApi.logIn({
            username,
            password
        }, loginSuccess, loginFailed);


    }

    const loginSuccess = (response) => {
        const { role } = response;
        if ((role == 'super_user') || (role == 'admin')) {
            const token = response.access_token
            axiosadmin.defaults.headers.common['Authorization'] = `Bearer ${token}`
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('role', response.role);
            history.replace('/home');
            createPusher()
        } else {
            console.log('alo')
            const swal = new Swal.fire(
                'Error!',
                `Cannot login with ${role} role`,
                'error'
            );
        }
        
    }

    const loginFailed = (err) => {
        if (err === 'not_found.read.user') {
            // alert('Username not found');
            Swal.fire(
                'Username not found!',
                'Please try again.',
                'error'
            );
        }
        if (err) {
            // alert('Username not found');
            Swal.fire(
                'Username or password incorrect!',
                'Please try again.',
                'error'
            );
        }
        
        // // alert('Login failed');
        // if (err.message === 'Unauthorized') {
        //     // alert('Username not found');
        //     Swal.fire(
        //         'Username not found!',
        //         'Please try again.',
        //         'error'
        //     );
        // }
    }

    const passwordToggle = () => {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <div className="page login-page">
            <div className="container d-flex align-items-center">
                <div className="form-holder has-shadow">
                    <div className="row">
                        {/* Logo & Information Panel*/}
                        <div className="col-lg-6">
                            <div className="info d-flex align-items-center">
                                <div className="content">
                                    <div className="logo">
                                        <h1>QUADALAND admin</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Form Panel    */}
                        <div className="col-lg-6 bg-white">
                            <div className="form d-flex align-items-center">
                                <div className="content">
                                    <form >
                                        <div className="form-group">
                                            <input onChange={handleUsernameInput} type="User" name="user" value={username} className="input-material" placeholder="User" />
                                            {/* <label  className="label-material">Email</label> */}
                                        </div>
                                        <div className="form-group" style={{position: 'relative'}}>
                                            <i className={isShowPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} style={{position: 'absolute', right: 5, top: 15}} onClick={passwordToggle}></i>
                                            <input onChange={handlePasswordInput} type={isShowPassword ? "text" : "password"} name="password" value={password} className="input-material" placeholder="Password" />

                                            {/* <label className="label-material">Password</label> */}
                                        </div>
                                        <button onClick={logIn} className="btn btn-primary">Login</button>
                                    </form><Link to="#" className="forgot-pass" style={{ marginTop: 15 }}>Forgot Password?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyrights text-center">
                <p>Design by <a href="https://bootstrapious.com/p/admin-template" className="external">Truong Hai</a>
                </p>
            </div>

        </div>
    );
}

export default Login;