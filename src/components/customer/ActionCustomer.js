import React from 'react';

function ActionCustomer(props) {
    return (
        <div className="content-inner">
            {/* Page Header*/}
            {/* <div className='sweet-loading'>
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={30}
            color={'#796aeebd'}
            loading={loading}
          />
        </div> */}
            <header className="page-header">
                <div className="container-fluid">
                    <h2 className="no-margin-bottom">Form Customer</h2>
                </div>
            </header>
            {/* Breadcrumb*/}
            <div className="breadcrumb-holder container-fluid">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active">Customer</li>
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
                                        <div className="form-group row">
                                            <label className="col-sm-3 form-control-label">Name</label>
                                            <div className="col-sm-3">
                                                <input type="text" name="name" className="form-control" />
                                            </div>
                                            <label className="col-sm-3 form-control-label" style={{ textAlign: 'center' }}>Address</label>
                                            <div className="col-sm-3">
                                                <input type="text" name="address" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="line" />
                                        <div className="form-group row">
                                            <label className="col-sm-3 form-control-label">Phone</label>
                                            <div className="col-sm-3">
                                                <input type="text" name="phone" className="form-control" />
                                            </div>
                                            <label className="col-sm-3 form-control-label" style={{ textAlign: 'center' }}>Email</label>
                                            <div className="col-sm-3">
                                                <input type="email" name="email" className="form-control" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="line" />    
                                            <div className="form-group row">
                                                <label className="col-sm-3 form-control-label">Password</label>
                                                <div className="col-sm-9">
                                                    <input type="password" name="password" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="line" />
                                        <div className="form-group row">
                                            <label htmlFor="fileInput" className="col-sm-3 form-control-label">Avatar</label>
                                            <div className="col-sm-9">
                                                <input type="file" className="form-control-file" />
                                                <div className="fix-cart">
                                                    <img src={'http://via.placeholder.com/400x300'} id="output" className="fix-img" alt="avatar" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="line" />
                                        <div className="form-group row">
                                            <label className="col-sm-3 form-control-label">Active</label>
                                            <div className="col-sm-3">
                                                <div className="i-checks">
                                                    <input type="checkbox"
                                                        name="isActive"
                                                        className="checkbox-template" />
                                                </div>
                                            </div>
                                            <label className="col-sm-3 form-control-label" style={{ textAlign: 'center' }}>Verify Email <br /></label>
                                            <div className="col-sm-3">
                                                <div className="i-checks">
                                                    <input type="checkbox"
                                                        name="isVerifyEmail"
                                                        className="checkbox-template" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="line" />
                                        <div className="form-group row">
                                            <label className="col-sm-3 form-control-label">System user</label>
                                            <div className="col-sm-9">
                                                <select className="form-control mb-3" name="roleId" >

                                                    <option  >Admin</option>
                                                    <option  >Company</option>
                                                    <option  >Customer</option>
                                                </select>
                                            </div>


                                        </div>
                                        <div className="line" />
                                        <div className="form-group row">
                                            <div className="col-sm-4 offset-sm-3">
                                                <button type="reset" className="btn btn-secondary" style={{ marginRight: 2 }}>Cancel</button>
                                                <button type="submit" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ActionCustomer;