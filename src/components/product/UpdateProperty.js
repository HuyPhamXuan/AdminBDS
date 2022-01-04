import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';
import propertyapi from '../../api/propertyapi'
import SideBar from '../sideBar/SideBar.js';
import Header from "../header/Header";
import slugify from "slugify";

import {
    GoogleMap,
    LoadScript,
    Marker
} from '@react-google-maps/api';

const UpdateProperty = () => {

    const MySwal = withReactContent(Swal)
    const [OldSlug, setOldSlug] = useState("");
    const { slug } = useParams();
    //const {MySlug} = useParams();
    const history = useHistory();
    const [Slug, setSlug] = useState({});
    //const MySlug = useParams().slug;

    useEffect(() => {
        propertyapi.getPropertyBySlug(slug).then(res => {
            console.log(res);
            setSlug(res)
            setOldSlug(res.slug)
        }).catch(err => console.log(err));
    }, [])

    const setValue = (e) => {
        var temp = {}
        Object.assign(temp, Slug)
        temp[e.target.slug] = e.target.value;
        setSlug(temp);
    }

    const UpdateProperty = async (e) => {
        e.preventDefault();
        //console.log(Slug);
        //const {slug: oldSlug} = Slug; 
        // const temp = Slug.details;
        var { title, description, address, area, price, coordinate } = Slug.details;
        area = parseInt(area);
        price = parseInt(price);
        // const { slug, sale_method, approval_status } = Slug;
        const { sale_method, approval_status } = Slug;
        const data = { sale_method, approval_status, details: { title, description, address, area, price, coordinate } };
        // console.log(data);
        propertyapi.updatePropertyBySlug(OldSlug, data, updatePropertySuccess, updatePropertyError);
    }

    const updatePropertySuccess = () => {
        Swal.fire(
            'Success!',
            'Updated property successfully.',
            'success'
        );
        history.goBack();
    }

    const updatePropertyError = (err) => {
        Swal.fire(
            'Cannot update property!'
        );
    }

    const onCheckBoxChange = (e) => {
        setSlug({ ...Slug, approval_status: e.target.checked });
    }

    const onSaleMethodsChange = e => {
        //const salemethodsname = e.target.value;
        //const t = { ...Slug, sale_method: salemethodsname };
        setSlug({ ...Slug, sale_method: e.target.value });
    }

    const onDetailChange = e => {
        const { name } = e.target;
        const { value } = e.target;
        var temp = {};
        Object.assign(temp, Slug);
        temp.details[e.target.name] = value;
        if (name == 'title') {
            temp.slug = slugify(value.toLowerCase())
        }
        setSlug(temp)
    }

    const onMapClick = e => {
        // console.log(e.latLng.lat());
        const lat = e.latLng.lat();
        const long = e.latLng.lng();
        var temp = {};
        Object.assign(temp, Slug);
        temp.details.coordinate.latitude = lat;
        temp.details.coordinate.longitude = long;   
        // console.log(lat, long);
        setSlug(temp)
        console.log(Slug)
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
                            <h2 className="no-margin-bottom">Form Update Property</h2>
                        </div>
                    </header>
                    {/* Breadcrumb*/}
                    <div className="breadcrumb-holder container-fluid">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/property">Property</Link></li>
                            <li className="breadcrumb-item active">Update Property</li>
                        </ul>
                    </div>
                    {/* Forms Section*/}
                    {Slug &&
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
                                                            <label className="col-sm-3 form-control-label">Slug</label>
                                                            <div className="col-sm-9">
                                                                <input onChange={setValue} type="text" name="slug" value={Slug.slug} className="form-control" disabled />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="line" />
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 form-control-label">Title</label>
                                                        <div className="col-sm-3">
                                                            <input onChange={onDetailChange} type="text" name="title" value={Slug && Slug.details && Slug.details.title} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="line" />
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 form-control-label">Description</label>
                                                        <div className="col-sm-3">
                                                            <textarea onChange={onDetailChange} type="text" name="description" value={Slug && Slug.details && Slug.details.description} className="form-control" />
                                                        </div>
                                                    </div>

                                                    <div className="line" />
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 form-control-label">Address</label>
                                                        <div className="col-sm-3">
                                                            <input onChange={onDetailChange} type="text" name="address" value={Slug && Slug.details && Slug.details.address} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="line" />
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 form-control-label">Area</label>
                                                        <div className="col-sm-3">
                                                            <input onChange={onDetailChange} type="number" name="area" value={Slug && Slug.details && Slug.details.area} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="line" />
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 form-control-label">Price</label>
                                                        <div className="col-sm-3">
                                                            <input onChange={onDetailChange} type="number" name="price" value={Slug && Slug.details && Slug.details.price} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="line" />
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 form-control-label">Coordinate</label>

                                                        <div className="col-sm-3">
                                                            <LoadScript
                                                                googleMapsApiKey="AIzaSyD3f7zKjWfHwPEddYaeTIqivDYBXOH87Mk"
                                                            >
                                                                <GoogleMap
                                                                    mapContainerStyle={{
                                                                        width: '400px',
                                                                        height: '400px'
                                                                    }}
                                                                    center={Slug && Slug.details && {
                                                                        lat: parseFloat(Slug.details.coordinate.latitude),
                                                                        lng: parseFloat(Slug.details.coordinate.longitude)
                                                                    }}
                                                                    zoom={10}
                                                                    onClick={onMapClick}
                                                                >
                                                                    { /* Child components, such as markers, info windows, etc. */}
                                                                    <>
                                                                        <Marker position={Slug && Slug.details && {
                                                                            lat: parseFloat(Slug.details.coordinate.latitude),
                                                                            lng: parseFloat(Slug.details.coordinate.longitude)
                                                                        }} />
                                                                    </>
                                                                </GoogleMap>
                                                            </LoadScript>

                                                        </div>
                                                    </div>
                                                    {/* <div className="line" />
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 form-control-label">Coordinate</label>
                                                        <div className="col-sm-3">
                                                            <input onChange={onDetailChange} type="string" name="Coordinate_latitude" value={Slug && Slug.details && parseFloat(Slug.details.coordinate.latitude)} className="form-control" />
                                                            <input onChange={onDetailChange} type="string" name="Coordinate_longtitude" value={Slug && Slug.details && parseFloat(Slug.details.coordinate.longitude)} className="form-control" />
                                                        </div>
                                                    </div> */}
                                                    <div className="line" />
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 form-control-label">Sale Method</label>
                                                        <div className="col-sm-3">
                                                            <select value={Slug?.sale_method} onChange={onSaleMethodsChange}>
                                                                <option value="for_rent">For Rent</option>
                                                                <option value="for_sale">For Sale</option>
                                                            </select>
                                                            {/* <input onChange={setValue} type="text" name="sale_method" value={Slug.sale_method} className="form-control" /> */}
                                                        </div>
                                                    </div>
                                                    <div className="line" />
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 form-control-label">ApprovalStatus</label>
                                                        <div className="col-sm-3">
                                                            <div className="i-checks">
                                                                <input type="checkbox"
                                                                    name="approvalstatus"
                                                                    checked={Slug.approval_status}
                                                                    className="checkbox-template"
                                                                    onChange={onCheckBoxChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="line" />
                                                    <div className="form-group row">
                                                        <div className="col-sm-4 offset-sm-3">
                                                            <button type="reset" className="btn btn-secondary" style={{ marginRight: 2 }}>Cancel</button>
                                                            <button type="submit" className="btn btn-primary" onClick={UpdateProperty}>Save changes</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>}
                    {/* Page Footer*/}

                </div>
            </div>
        </>
    )
}

export default UpdateProperty;

