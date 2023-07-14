import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from "reactstrap";

const cancellationPolicyContent = `Thank you for choosing our services!

We understand that circumstances may arise where you need to cancel your order or booking.
Please read our cancellation policy carefully to understand the procedures and guidelines regarding cancellations.

Order/Booking Cancellation:
- If you wish to cancel your order or booking, please contact our customer support team as soon as possible.
- We will process your cancellation request and provide you with any applicable refunds or credits, depending on the circumstances and our cancellation policy.
- Please note that cancellations may be subject to certain conditions, such as cancellation fees or restrictions based on the type of order or booking.

Refunds and Credits:
- The eligibility for refunds or credits depends on the specific terms and conditions associated with your order or booking.
- We will review your cancellation request and inform you about any applicable refund or credit options available.
- Refunds or credits may be issued based on factors such as the cancellation notice period, any applicable fees, or the availability of alternative options.

Cancellation Fees:
- In some cases, cancellation fees may apply depending on the type of order or booking and the timing of the cancellation.
- The specific cancellation fees, if any, will be communicated to you at the time of cancellation and will be based on our cancellation policy.

Exceptions and Special Circumstances:
- Certain orders or bookings may have specific cancellation policies or restrictions due to their nature or unique requirements.
- Examples include non-refundable or non-cancellable items, special events or promotions, or personalized/customized orders.
- Please review the terms and conditions associated with your specific order or booking for any exceptions or special circumstances.

Contact Us:
- If you have any questions or need assistance regarding cancellations, refunds, or any related inquiries, please don't hesitate to contact our customer support team.
- You can reach out to us through our website's contact page or via email or phone, as provided in the contact information.

We value your satisfaction and strive to provide excellent customer service. If you have any further questions or need clarification regarding our cancellation policy, please feel free to contact us.

Thank you!`;

export default class CancellationPolicyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { toggleModal } = this.props;
        return (
            <Modal isOpen={true} toggle={toggleModal} size="xl">
                <ModalHeader toggle={toggleModal} style={{ backgroundColor: "#1a202c", borderColor: "#1a202c", color: "#e2e8f0" }}>
                    Cancellation Policy
                </ModalHeader>
                <ModalBody style={{ backgroundColor: "#16151a", color: "#e2e8f0", overflowX: "auto" }}>
                    <div>
                        <div className="cancellation-policy">
                            <pre
                                className="policy-content"
                                style={{
                                    fontSize: 16,
                                    whiteSpace: "pre-wrap",
                                    overflowWrap: "break-word",
                                    paddingLeft: "20px",
                                    textIndent: "-20px",
                                    color: "lightgrey"
                                }}
                            >
                                {cancellationPolicyContent}
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
