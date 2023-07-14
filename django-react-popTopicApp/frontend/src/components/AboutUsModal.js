import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from "reactstrap";

const aboutUsContent = `Welcome to PopTopic!

About Us:
We are a passionate team of Funko Pop collectors and enthusiasts dedicated to bringing you the best selection of Funko Pop figures and related merchandise. Our goal is to provide a one-stop-shop for all your Funko Pop needs, catering to both casual collectors and avid fans alike.

Product Quality:
We understand the importance of collecting authentic and high-quality Funko Pop items. That's why we source our products from authorized distributors and ensure their authenticity. Each item goes through a careful quality control process to ensure that it meets our standards before reaching our customers.

Wide Selection:
We pride ourselves on offering a wide range of Funko Pop figures, including popular characters from movies, TV shows, anime, video games, and more. Our inventory is regularly updated to include the latest releases and hard-to-find exclusives. We strive to provide a diverse selection that caters to various interests and preferences.

Secure Shopping:
We prioritize the security and privacy of our customers. Our website utilizes industry-standard encryption technology to protect your personal and financial information. You can shop with confidence, knowing that your data is handled securely.

Fast Shipping:
We understand the excitement of receiving your Funko Pop items promptly. That's why we strive to process and ship orders as quickly as possible. Our shipping methods are reliable, and we work with reputable carriers to ensure that your order arrives safely and on time.

Excellent Customer Service:
We are committed to providing exceptional customer service. If you have any questions, concerns, or need assistance with your order, our friendly and knowledgeable support team is here to help. You can reach us through our contact page, and we will respond promptly.

We appreciate your support and trust in us as your go-to source for Funko Pop figures. We are continuously improving and expanding our offerings to enhance your collecting experience.

Thank you for choosing PopTopic!

Happy collecting!`;

export default class AboutUsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { toggleModal } = this.props;
        return (
            <Modal isOpen={true} toggle={toggleModal} size="xl">
                <ModalHeader toggle={toggleModal} style={{ backgroundColor: "#1a202c", borderColor: "#1a202c", color: "#e2e8f0" }}>
                    About Us
                </ModalHeader>
                <ModalBody style={{ backgroundColor: "#16151a", color: "#e2e8f0", overflowX: "auto" }}>
                    <div>
                        <div className="about-us">
                            <pre
                                className="about-content"
                                style={{
                                    fontSize: 16,
                                    whiteSpace: "pre-wrap",
                                    overflowWrap: "break-word",
                                    paddingLeft: "20px",
                                    textIndent: "-20px",
                                    color: "lightgrey"
                                }}
                            >
                                {aboutUsContent}
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
