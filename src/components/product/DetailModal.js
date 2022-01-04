import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import './style.css'

export default ({ detail, visible, handleClose }) => {

    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>Address: </Col>
                    <Col>{detail && detail.address}</Col>
                </Row>
                <Row>
                    <Col>Area: </Col>
                    <Col>{detail && detail.area}</Col>
                </Row>
                <Row>
                    <Col>Coordinate: </Col>
                    <Col>{detail && detail.coordinate && detail.coordinate.latitude + ', ' + detail.coordinate.longitude}</Col>
                </Row>
                <Row>
                    <Col>Created at: </Col>
                    <Col>{detail && detail.created_at && new Date(detail.created_at).toLocaleDateString()}</Col>
                </Row>
                <Row>
                    <Col>Deleted at: </Col>
                    <Col>{detail && detail.deleted_at && new Date(detail.deleted_at).toLocaleDateString()}</Col>
                </Row>
                <Row>
                    <Col>Description: </Col>

                    <Col><div className="description">{detail && detail.description}</div></Col>
                </Row>
                <Row>
                    <Col>Price: </Col>
                    <Col>{detail && detail.price}</Col>
                </Row>
                <Row>
                    <Col>Title: </Col>
                    <Col>{detail && detail.title}</Col>
                </Row>
                <Row>
                    <Col>Updated at: </Col>
                    <Col>{detail && detail.updated && new Date(detail.updated).toLocaleDateString()}</Col>
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