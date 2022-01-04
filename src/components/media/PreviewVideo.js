import React, { useEffect, useState } from 'react';
import { Button, Modal, NavItem } from 'react-bootstrap';

import mediaapi from "../../api/mediaapi";

export default ({ slug, handleClose }) => {

    const [base64, setBase64] = useState('');

    useEffect(() => {
        fetchImage();
    }, [base64])

    const fetchImage = () => {
        mediaapi.getMediaBySlug(slug, loadImageSuccess);
    }

    const loadImageSuccess = (response) => {
        const base64 = Buffer.from(response, 'binary').toString('base64');
        setBase64('data:video/mp4;base64, ' + base64);
    }



    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Media Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <video src={base64 ? base64 : ''} alt="Loading..." width="100%" controls />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}