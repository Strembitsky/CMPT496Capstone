import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from "reactstrap";

const shippingPolicyContent = `Thank you for shopping with us at PopTopic!

We want to ensure a smooth and enjoyable shopping experience for all our customers, including a hassle-free shipping process.
Please read our shipping policy carefully to understand our procedures and expectations regarding shipping.

Processing Time:
Once your order is placed and payment is confirmed, our team will process and pack your items with care.
Please allow 1-3 business days for order processing before shipment.
During peak seasons or promotional periods, processing times may be slightly longer.
We appreciate your patience.

Shipment Methods and Carriers:
We use reputable shipping carriers to deliver your Funko Pop items safely and efficiently.
The available shipping methods will be displayed during the checkout process.
You can choose the one that best suits your needs.
We currently offer standard shipping and express shipping options.

Shipping Rates:
Shipping rates are calculated based on various factors, including the destination,
package weight, and shipping method chosen.
The shipping cost will be displayed during the checkout process before you make the payment.

Delivery Time:
The estimated delivery time depends on the shipping method and the destination of your order.
Standard shipping usually takes between 7-14 business days for domestic orders.
International orders may take longer due to customs clearance procedures.
If you choose express shipping, your order will be delivered within 2-5 business days,
depending on the destination.

Tracking Information:
Once your order is shipped, we will provide you with a tracking number via email.
You can use the tracking number to monitor the progress of your shipment and estimated delivery date.
Please note that tracking information may take a few days to update after the shipment is processed.

Shipping Restrictions:
We currently offer shipping within the United States and select international destinations.
Please check the available shipping options during the checkout process.
Some items may be restricted from international shipping due to licensing agreements or customs regulations.

Address Accuracy:
It is essential to provide accurate and complete shipping information,
including your full name, shipping address, and contact details.
We are not responsible for any delays or delivery issues caused by incorrect
or incomplete address information provided by the customer.

Customs and Duties:
For international orders, please be aware that customs duties, taxes,
or import fees may be applied by the destination country's customs authorities.
Any additional charges related to customs clearance are the responsibility of the customer.
We recommend checking with your local customs office for more information about potential fees.

Lost or Damaged Packages:
We take great care in packing and ensuring the safe delivery of your order.
However, in rare cases, packages may be lost or damaged during transit.
If your package is lost or significantly delayed, please contact our customer support team,
and we will work with the shipping carrier to resolve the issue.
In the case of a damaged package, please take photos of the packaging and the damaged items
and contact our customer support team within 48 hours of delivery for assistance.

Order Tracking and Support:
If you have any questions or concerns about your order, shipping, or any related inquiries,
please feel free to reach out to our customer support team.
You can contact us through our website's contact page or via email or phone,
as provided in the contact information.

We strive to provide excellent customer service and ensure that your Funko Pop items reach you in a timely and secure manner.
If you have any further questions or need assistance with shipping-related matters, please don't hesitate to contact our friendly customer support team.

Happy shopping!`;


export default class ShippingPolicyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { toggleModal } = this.props;
        return (
            <Modal isOpen={true} toggle={toggleModal} size="xl">
                <ModalHeader toggle={toggleModal} style={{ backgroundColor: "#1a202c", borderColor: "#1a202c", color: "#e2e8f0" }}>
                    Shipping Policy
                </ModalHeader>
                <ModalBody style={{ backgroundColor: "#16151a", color: "#e2e8f0", overflowX: "auto" }}>
                    <div>
                        <div className="shipping-policy">
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
                                {shippingPolicyContent}
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