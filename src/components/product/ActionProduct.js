import React from 'react';

function ActionProduct(props) {
    return (
        <div className="content-inner">
            {/* Page Header*/}
            <div className='sweet-loading'>

            </div>
            <header className="page-header">
                <div className="container-fluid">
                    <h2 className="no-margin-bottom">Forms Producer</h2>
                </div>
            </header>
            {/* Breadcrumb*/}
            <div className="breadcrumb-holder container-fluid">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active">Producer</li>
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
                                    <h3 className="h4">Description</h3>
                                </div>
                                <div className="card-body">
                                    <form className="form-horizontal"  >
                                        <div className="form-group row">
                                            <label className="col-sm-3 form-control-label">Name Producer</label>
                                            <div className="col-sm-9">
                                                <input name="name" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="line" />
                                        <div className="form-group row">
                                            <label className="col-sm-3 form-control-label">Description</label>
                                            <div className="col-sm-9">
                                                <input name="desc" type="text" placeholder="Note" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="line" />
                                        <div className="form-group row">
                                            <label className="col-sm-3 form-control-label">Address</label>
                                            <div className="col-sm-9">
                                                <input name="address" type="text" placeholder="Note" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="line" />
                                        <div className="form-group row">
                                            <label className="col-sm-3 form-control-label">Categories</label>
                                            <div className="col-sm-9">

                                                <div className="i-checks" style={{ display: 'inline-block', paddingRight: 35 }} >
                                                    <input name="categoryId"  type="radio" className="radio-template" />

                                                    <label>lll</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="line" />
                                        <div className="form-group row">
                                            <label htmlFor="fileInput" className="col-sm-3 form-control-label">Image</label>
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
                                            <div className="col-sm-9">
                                                <div className="i-checks">
                                                    <input type="checkbox"
                                                        name="isActive"
                                                        className="checkbox-template" />
                                                    <label htmlFor="checkboxCustom1"></label>
                                                </div>
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

export default ActionProduct;