import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import userapi from '../../api/userapi';
import Header from "../header/Header";

import propertyapi from "../../api/propertyapi";
import CompanyModal from './CompanyModal';
import DetailModal from "./DetailModal";
import SideBar from '../sideBar/SideBar';

const MySwal = withReactContent(Swal)
let token;

const Property = (props) => {
    const [searchText, setSearchText] = useState('');
    const [properties, setProperties] = useState([]);
    // const [search, setSearch] = useState('');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [per_page, setPer_page] = useState(10);

    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({});

    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [modalCompanyInfo, setModalCompanyInfo] = useState({});




    const getData = async () => {
        const params = {
            page,
            per_page,
        }
        const response = await propertyapi.getAll(params);
        console.log(response);
        setProperties(response.result);
        setTotal(response.count);
    }

    const changePage = targetPage => {
        setPage(targetPage)
    }

    const changeItemPerPage = e => {
        setPer_page(e.target.value)
        setPage(1);
    }

    useEffect(() => {
        getData();
    }, [page, per_page])

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { searchText } = this.state;
        this.props.find_products(token, searchText).then(res => {
            this.setState({
                total: res.total
            })
        })
    }
    const handleRemove = (id) => {
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
                await this.props.delete_category(id, token);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const viewDetail = (companyIndex) => {
        setModalInfo(properties[companyIndex].details);
        setShowModal(true);
    }

    const viewCompany = (companyIndex) => {
        //console.log(properties[companyIndex]);
        setModalCompanyInfo(properties[companyIndex].company);
        setShowCompanyModal(true);
    }

    const deleteProperty = (slug) => {
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
                await propertyapi.deleteProperty(slug, deletePropertySuccess, deletePropertyFailed);
                getData();
            }
        })
    }

    const deletePropertySuccess = () => {
        Swal.fire(
            'Deleted!',
            'Property has been deleted.',
            'success'
        );
    }

    const deletePropertyFailed = (err) => {
        console.log(err);
    }

    const restoreProperty = async (slug) => {
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
                await propertyapi.restoreProperty(slug, restorePropertySuccess, restorePropertyFailed);
                getData();
            }
        })
    }

    const restorePropertySuccess = () => {
        Swal.fire(
            'Restored!',
            'Property has been Restored.',
            'success'
        );
    }

    const restorePropertyFailed = (err) => {
        console.log(err);
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
                            <h2 className="no-margin-bottom">Properties</h2>
                        </div>
                    </header>
                    {/* Breadcrumb*/}
                    <div className="breadcrumb-holder container-fluid">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Property</li>
                        </ul>
                    </div>
                    <section className="tables pt-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header d-flex align-items-center">
                                            <h3 className="h4">Data Table Property</h3>
                                            <Link to="/property/add" className="btn btn-primary" style={{ marginLeft: 900 }}> Create</Link>
                                        </div>
                                        <form onSubmit={(event) => this.handleSubmit(event)}
                                            className="form-inline md-form form-sm mt-0" style={{ justifyContent: 'flex-end', paddingTop: 5, paddingRight: 20 }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <select onChange={changeItemPerPage}>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                                <input
                                                    name="searchText"
                                                    value={searchText}
                                                    className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                                                    aria-label="Search" />
                                                <i className="fa fa-search" style={{ marginLeft: 10 }} aria-hidden="true"></i>
                                            </div>
                                        </form>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Number</th>
                                                            <th>Slug</th>
                                                            <th>Approval Status</th>
                                                            <th>Sale Method</th>
                                                            <th>Created at</th>
                                                            <th>Updated at</th>
                                                            <th>Deleted at</th>
                                                            <th style={{ textAlign: "center" }}>View Company</th>
                                                            <th style={{ textAlign: "center" }}>View Detail</th>
                                                            <th style={{ textAlign: "center" }}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {properties ? properties.map((item, index) => (
                                                            <tr>
                                                                <th scope="row">{(per_page * (page - 1)) + index + 1}</th>
                                                                <td>{item.slug}</td>
                                                                <td>
                                                                    <div className="i-checks">
                                                                        <input type="checkbox" checked={item.approval_status} className="checkbox-template" />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {item.sale_method}
                                                                </td>
                                                                <td>{item.created_at && new Date(item.created_at).toDateString()}</td>
                                                                <td>{item.updated_at && new Date(item.updated_at).toDateString()}</td>
                                                                <td>{item.deleted_at && new Date(item.deleted_at).toDateString()}</td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <div>
                                                                        {/* <span title='Edit' className="fix-action"><Link to={`categories/edit/1`}> <i className="fa fa-edit"></i></Link></span> */}
                                                                        <span title='View' onClick={() => viewCompany(index)} className="fix-action"><Link to="#"> <i className="fa fa-eye" ></i></Link></span>
                                                                    </div>
                                                                </td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <div>
                                                                        <span title='View' onClick={() => viewDetail(index)} className="fix-action"><Link to="#"> <i className="fa fa-eye" ></i></Link></span>
                                                                    </div>
                                                                </td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <div>
                                                                        {!item.deleted_at &&
                                                                            <>
                                                                                <span title='Edit' className="fix-action"><Link to={`/property/edit/${item.slug}`}> <i className="fa fa-edit"></i></Link></span>
                                                                                <span title='Delete' className="fix-action" onClick={() => deleteProperty(item.slug)}><Link to="#"> <i className="fa fa-trash" style={{ color: '#ff00008f' }}></i></Link></span>
                                                                            </>}
                                                                        {item.deleted_at && <span title='Restore' className="fix-action" onClick={() => restoreProperty(item.slug)}><Link to="#"><i class="fa fa-refresh"></i></Link></span>}
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                        )) : null}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-end">
                                    {Array.from({ length: Math.floor(total / per_page) + 1 }).map((item, index) => (
                                        <li class={page == index + 1 ? "page-item active" : "page-item"}>
                                            <a class="page-link" onClick={() => setPage(index + 1)}>{index + 1}</a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </section>
                    {/* Page Footer*/}
                    <CompanyModal visible={showCompanyModal} handleClose={() => setShowCompanyModal(false)} company={modalCompanyInfo} />
                    <DetailModal visible={showModal} handleClose={() => setShowModal(false)} detail={modalInfo} />
                    {/* <CompanyModal visible={showCompanyModal} handleClose={() => setShowCompanyModal(false)} detail={modalCompanyInfo} /> */}
                    {/* <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-end">
                            {Array.from({ length: Math.floor(total / per_page) + 1 }).map((item, index) => (
                                <li class={page == index + 1 ? "page-item active" : "page-item"}>
                                    <a class="page-link" onClick={() => setPage(index + 1)}>{index + 1}</a>
                                </li>
                            ))}
                        </ul>
                    </nav> */}
                </div >
            </div>
        </>
    );
}


export default Property;