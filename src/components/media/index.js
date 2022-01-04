import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import Header from "../header/Header";
import Form from 'react-bootstrap/Form'

import mediaapi from "../../api/mediaapi";
import SideBar from '../sideBar/SideBar';
import PreviewMedia from "./PreviewMedia";
import PreviewVideo from "./PreviewVideo";
import { FormFile } from 'react-bootstrap';
import MyFooter     from '../MyFooter/MyFooter'

const MySwal = withReactContent(Swal)
let token;

const MediaTable = () => {

    const [searchText, setSearchText] = useState('');
    const [media, setMedia] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [per_page, setPer_page] = useState(10);
    const [last_page, setLast_page] = useState(1);
    const [isModalVisible, setModalVisible] = useState(false);
    const [slug, setSlug] = useState('');
    const [isVideoModalVisible, setVideoModalVisible] = useState(false);
    const getData = async () => {
        const params = {
            page,
            per_page,
            sort_by: `-created_at`
        }
        const response = await mediaapi.getAll(params);
        // console.log(response);
        setMedia(response.result);
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

    useEffect(() => {
        getData();
    }, [page, per_page])

    const deleteMedia = slug => {
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
                mediaapi.deleteMedia(slug, deleteMediaSuccess, deleteMediaError);
            }
        })
        
    }

    const deleteMediaSuccess = () => {
        Swal.fire(
            'Deleted!',
            'Media has been deleted.',
            'success'
        );
        getData();
    }

    const deleteMediaError = () => {
        Swal.fire(
            'Error!',
            'Media hasn\'t been deleted.',
            'error'
        );
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const closeVideoModal = () => {
        setVideoModalVisible(false);
    }

    const previewMedia = (slug) => {
        setSlug(slug)
        setModalVisible(true);
    }

    const previewVideo = (slug) => {
        setSlug(slug)
        setVideoModalVisible(true);
    }

    const uploadMedia = e => {
        e.preventDefault();
        var formData = new FormData();
        for(var i of e.target.files) {
            // console.log(i.name);
            formData.append('files', i)
        }
        mediaapi.addMedia(formData, uploadImageSuccess, uploadImageError)
    }

    const uploadImageSuccess = () => {
        Swal.fire(
            'Upload Media!',
            'Media has been uploaded.',
            'success'
        );
        getData();

    }

    const uploadImageError =() =>{
        Swal.fire(
            'Error!',
            'Media hasn\'t been uploaded.',
            'error'
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
                            <h2 className="no-margin-bottom">Media</h2>
                        </div>
                    </header>
                    {/* Breadcrumb*/}
                    <div className="breadcrumb-holder container-fluid">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                            <li className="breadcrumb-item active">Media</li>
                        </ul>
                    </div>
                    <section className="tables pt-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header d-flex align-items-center" style={{justifyContent: 'space-between'}}>
                                            <h3 className="h4">Data Table Media</h3>
                                            <Form>
                                                <Form.Group>
                                                    <Form.File type="file" accept="image/png, image/jpeg" id="exampleFormControlFile1" label="Upload media" onChange={e => uploadMedia(e)} multiple/>
                                                </Form.Group>
                                            </Form>
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
                                            </div>
                                        </form>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-hover table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th>Number</th>
                                                            <th>Filename</th>
                                                            <th>Size</th>
                                                            <th>Visibility</th>
                                                            <th>Type</th>
                                                            <th>User</th>
                                                            <th>Created at</th>
                                                            <th>Updated at</th>
                                                            <th>Deleted at</th>
                                                            <th>View</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {media ? media.map((item, index) => (
                                                            <tr>
                                                                <th scope="row">{(per_page * (page - 1)) + index + 1}</th>
                                                                <td>{item.file_name}</td>
                                                                <td>{item.file_size}</td>
                                                                <td>{item.visibility}</td>
                                                                <td>{item.type}</td>
                                                                <td>{item.user}</td>
                                                                <td>{item.created_at && new Date(item.created_at).toDateString()}</td>
                                                                <td>{item.updated_at && new Date(item.updated_at).toDateString()}</td>
                                                                <td>{item.deleted_at && new Date(item.deleted_at).toDateString()}</td>
                                                                
                                                                <td style={{ textAlign: "center" }}>
                                                                    <div>
                                                                        {item.type == "image" && <span title='View' className="fix-action" onClick={() => previewMedia(item.slug)}><Link to="#"> <i className="fa fa-eye" ></i></Link></span>}
                                                                        {item.type == "video" && <span title='View' className="fix-action" onClick={() => previewVideo(item.slug)}><Link to="#"> <i className="fa fa-eye" ></i></Link></span>}
                                                                    </div>
                                                                </td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <div>
                                                                        {!item.deleted_at && <span title='Delete' className="fix-action" onClick={() => deleteMedia(item.slug)}><Link to="#"> <i className="fa fa-trash" style={{ color: '#ff00008f' }}></i></Link></span>}        
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
                                    {Array.from({ length: last_page}).map((item, index) => (
                                        <li class={page == index + 1 ? "page-item active" : "page-item"}>
                                            <a class="page-link" onClick={() => setPage(index + 1)}>{index + 1}</a>
                                        </li>
                                    ))}
                                    </ul>
                                 </nav>
                                </div>
                            </div>
                        </div>
                    </section>
                    {isModalVisible && <PreviewMedia handleClose={closeModal} slug={slug} />}
                    {isVideoModalVisible && <PreviewVideo handleClose={closeVideoModal} slug={slug} />}
                    {/* Page Footer*/}
                    <MyFooter></MyFooter>
                </div >
            </div>
        </>
    )

}

export default MediaTable;