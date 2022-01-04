import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';


export default ({ company, visible, handleClose }) => {

    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>Fullname: </Col>
                    <Col>{company && company.full_name}</Col>
                </Row>
                <Row>
                    <Col>Phone: </Col>
                    <Col>{company && company.phone}</Col>
                </Row>
                <Row>
                    <Col>Email: </Col>
                    <Col>{company && company.email}</Col>
                </Row>
                <Row>
                    <Col>Address: </Col>
                    <Col>{company && company.address}</Col>
                </Row>
                <Row>
                    <Col>User: </Col>
                    <Col>{company && company.user}</Col>
                </Row>
                <Row>
                    <Col>Facebook: </Col>
                    <Col><i className="fa fa-facebook" ></i>/{company && company.facebook}</Col>
                </Row>
                <Row>
                    <Col>Instagram: </Col>
                    <Col><i className="fa fa-instagram" ></i>/{company && company.instagram}</Col>
                </Row>
                <Row>
                    <Col>Twitter: </Col>
                    <Col><i className="fa fa-twitter" ></i>/{company && company.twitter}</Col>
                </Row>

                <Row>
                    <Col>Created at: </Col>
                    <Col>{company && company.created_at && new Date(company.created_at).toLocaleDateString()}</Col>
                </Row>
                <Row>
                    <Col>Deleted at: </Col>
                    <Col>{company && company.deleted_at && new Date(company.deleted_at).toLocaleDateString()}</Col>
                </Row>
                <Row>
                    <Col>Updated at: </Col>
                    <Col>{company && company.updated && new Date(company.updated).toLocaleDateString()}</Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
          </Button>
            </Modal.Footer>
        </Modal>
    )
}