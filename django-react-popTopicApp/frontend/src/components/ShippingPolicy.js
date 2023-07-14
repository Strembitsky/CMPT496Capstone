import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from "reactstrap";

const shippingPolicyContent = `
  Shipping Policy

  Thank you for shopping with us at Funko Pop Central! We want to ensure a smooth and enjoyable shopping experience for all our customers, including a hassle-free shipping process. Please read our shipping policy carefully to understand our procedures and expectations regarding shipping.

  1. Processing Time:
    - Once your order is placed and payment is confirmed, our team will process and pack your items with care.
    - Please allow 1-3 business days for order processing before shipment. During peak seasons or promotional periods, processing times may be slightly longer. We appreciate your patience.

  2. Shipment Methods and Carriers:
    - We use reputable shipping carriers to deliver your Funko Pop items safely and efficiently.
    - The available shipping methods will be displayed during the checkout process. You can choose the one that best suits your needs.
    - We currently offer standard shipping and express shipping options.

  ... (rest of the shipping policy content)
`;

export default class ShippingPolicyModal extends React.Component {
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
                    <h5 className="text-center mt-3">{shippingPolicyContent}</h5>
                </ModalBody>
                <ModalFooter style={{ backgroundColor: "#1a202c", color: "#e2e8f0", borderTop: "none" }}>
                    <Button className="btn btn-success" onClick={toggleModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    };
}