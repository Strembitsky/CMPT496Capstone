import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from "reactstrap";
import { FaCheckCircle } from "react-icons/fa";

export default class PurchaseSuccessModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { toggleModal } = this.props;
        return (
            <Modal isOpen={true} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal} style={{ backgroundColor: "#1a202c", borderColor: "#1a202c", color: "#e2e8f0" }}>
                    Purchase Success
                </ModalHeader>
                <ModalBody style={{ backgroundColor: "#16151a", color: "#e2e8f0" }}>
                    <div className="d-flex align-items-center justify-content-center">
                        <FaCheckCircle size={60} color="#29ff74" />
                    </div>
                    <h5 className="text-center mt-3">Congratulations! Your purchase was successful.</h5>
                </ModalBody>
                <ModalFooter style={{ backgroundColor: "#1a202c", color: "#e2e8f0", borderTop: "none" }}>
                    <Button className="btn btn-success" onClick={toggleModal}>
                        Awesome!
                    </Button>
                </ModalFooter>
            </Modal>
        );
    };
}