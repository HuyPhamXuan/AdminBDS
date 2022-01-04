import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axiosadmin from '../../api/axiosadmin';
import userapi from '../../api/userapi';
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";
import MyFooter from "../MyFooter/MyFooter";
import jwt_decode from "jwt-decode";


function User(props) {
    const MySwal = withReactContent(Swal);

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [per_page, setPer_page] = useState(10);
    const [last_page, setLast_page] = useState(1);
    const token = localStorage.getItem('token');
    const currentRole = jwt_decode(token).role;
    console.log(currentRole);

    const deleteUser = (username) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.value) {
                // await this.props.delete_category(id, token);
                await userapi.deleteUser(username, deleteUserSuccess, deleteUserFailed);
                getData();
            }
        })
    }

    const deleteUserSuccess = () => {
        Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
        );
    }

    const deleteUserFailed = (err) => {
        console.log(err);
    }

    const restoreUser = async (username) => {
        //await userapi.restoreUser(username);
        //getData();
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.value) {
                // await this.props.delete_category(id, token);
                await userapi.restoreUser(username, restoreUserSuccess, restoreUserFailed);
                getData();
            }
        })
    }

    const restoreUserSuccess = () => {
        Swal.fire(
            'Restored!',
            'User has been Restored.',
            'success'
        );
    }

    const restoreUserFailed = (err) => {
        console.log(err);
    }

    const getData = async () => {
        const params = {
            page,
            per_page,
            search,
            sort_by: `-created_at`
        }
        const response = await userapi.getAll(params)
        // console.log(response);
        setUsers(response.result)
        console.log(response)
        setTotal(response.count);
        setLast_page(response.last_page);
    }


    const changePage = targetPage => {
        setPage(targetPage)
    }

    const changeItemPerPage = e => {
        setPer_page(e.target.value)
        setPage(1);
    }

    const searchUser = e => {
        e.preventDefault();
        setPage(1);
        getData();
    }

    useEffect(() => {
        getData();
    }, [page, per_page]);
    return (
        <>
            <Header />
            <div className="d-flex p-2 col-example" style={{overflowX: 'hiden', overflowY: 'auto'}}>
                <SideBar />
                <div className="content-inner">
                    {/* Page Header*/}
                    <header className="page-header">
                        <div className="container-fluid">
                            <h2 className="no-margin-bottom">Users</h2>
                        </div>
                    </header>
                    {/* Breadcrumb*/}
                    <div className="breadcrumb-holder container-fluid">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                            <li className="breadcrumb-item active">Users</li>
                        </ul>
                    </div>
                    <section className="tables pt-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header d-flex align-items-center" style={{}} >
                                            <h3 className="h4">Data Table Users</h3>
                                            <Link to='/users/add' className="btn btn-primary" style={{ marginLeft: 960 }} > Create</Link>
                                        </div>
                                        <form
                                            className="form-inline md-form form-sm mt-0" style={{ justifyContent: 'flex-end', paddingTop: 5, paddingRight: 20 }}
                                            onSubmit={searchUser}>
                                            <div style={{ display: 'flex' }}>
                                                <select onChange={changeItemPerPage}>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                                <input
                                                    name="searchText"
                                                    value={search}
                                                    onChange={e => setSearch(e.target.value)}
                                                    className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                                                    aria-label="Search" />
                                                    <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
                                            </div>
                                        </form>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-hover table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th>Number</th>
                                                            <th>Name</th>
                                                            <th style={{ textAlign: "center" }}>Role</th>
                                                            <th style={{ textAlign: "center" }}>Active</th>
                                                            <th>Created at</th>
                                                            <th>Deleted at</th>
                                                            <th style={{ textAlign: "center" }}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {users ? users.map((item, index) => (
                                                            <tr>
                                                                <th scope="row">{(per_page * (page - 1)) + index + 1}</th>
                                                                <td>{item.username}</td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <div class="i-checks">
                                                                        {item.role}
                                                                    </div>
                                                                </td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <div className="i-checks">
                                                                        <input type="checkbox" checked={item.is_active} className="checkbox-template" />
                                                                    </div>
                                                                </td>
                                                                <td>{new Date(item.created_at).toDateString()}</td>
                                                                <td>{item.deleted_at ? new Date(item.deleted_at).toDateString() : ''}</td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <div>
                                                                        {item.role !== 'super_user' && !item.deleted_at &&
                                                                            <>
                                                                                <span title='Edit' className="fix-action"><Link to={`/users/edit/${item.username}`}> <i className="fa fa-edit"></i></Link></span>
                                                                                {currentRole === 'super_user' && <span title='Delete' className="fix-action" onClick={() => deleteUser(item.username)}><Link to="#"> <i className="fa fa-trash" style={{ color: '#ff00008f' }}></i></Link></span>}
                                                                            </>}
                                                                        {currentRole == 'super_user' && item.deleted_at && <span title='Restore' className="fix-action" onClick={() => restoreUser(item.username)}><Link to="#"><i class="fa fa-refresh"></i></Link></span>}
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        )) : null}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-end">
                                            {Array.from({ length: last_page }).map((item, index) => (
                                                <li class={page == index + 1 ? "page-item active" : "page-item"}>
                                                    <a class="page-link" onClick={() => changePage(index + 1)}>{index + 1}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Page Footer*/}
                    <MyFooter></MyFooter>
                </div>
                <p className="line-height:30px;font-size:18px;"></p>
            </div>
        </>
    );
}

export default User;