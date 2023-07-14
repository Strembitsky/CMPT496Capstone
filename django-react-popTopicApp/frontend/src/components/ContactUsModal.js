import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from "reactstrap";

const contactUsContent = `Thank you for reaching out to us!

We value your feedback, inquiries, and suggestions. Our customer support team is here to assist you and provide the necessary information.

Contact Methods:
- Email: You can send us an email at contact@yourwebsite.com. We strive to respond to all emails within 24 hours.
- Phone: If you prefer to speak with us directly, you can reach us at +1-123-456-7890 during our business hours.

Business Hours:
- Monday to Friday: 9:00 AM to 6:00 PM (local time)
- Saturday and Sunday: Closed

Support Topics:
Our customer support team can assist you with the following topics:
- Product inquiries and information
- Order status and tracking
- Returns and exchanges
- Technical issues or website support
- General feedback or suggestions

When contacting us, please provide the following information to help us assist you more effectively:
- Your full name
- Order number (if applicable)
- Detailed description of your inquiry or issue

We appreciate your patience and understanding. Rest assured, we will do our best to address your concerns in a timely manner.

Your satisfaction is our top priority, and we are committed to providing excellent customer service. If you have any further questions or need assistance, please don't hesitate to contact us.

Thank you!`;

export default class ContactUsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { toggleModal } = this.props;
        return (
            <Modal isOpen={true} toggle={toggleModal} size="xl">
                <ModalHeader toggle={toggleModal} style={{ backgroundColor: "#1a202c", borderColor: "#1a202c", color: "#e2e8f0" }}>
                    Contact Us
                </ModalHeader>
                <ModalBody style={{ backgroundColor: "#16151a", color: "#e2e8f0", overflowX: "auto" }}>
                    <div>
                        <div className="contact-us">
                            <pre
                                className="contact-content"
                                style={{
                                    fontSize: 16,
                                    whiteSpace: "pre-wrap",
                                    overflowWrap: "break-word",
                                    paddingLeft: "20px",
                                    textIndent: "-20px",
                                    color: "lightgrey"
                                }}
                            >
                                {contactUsContent}
                            </pre>
                        </div>
                    </div>
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
