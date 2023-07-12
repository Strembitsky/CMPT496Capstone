import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from "reactstrap";

export default class CartModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.cart,
        };
    }
    handleChange = e => {
        let { name, value } = e.target;
        const cart = { ...this.state.cart, [name]: value };
        this.setState({ cart });
    };
    handleClose = () => {
        const { toggleAdd } = this.props;
        toggleAdd(); // Call the toggleAdd function to close the Modal
    };
    render() {
        const { toggleAdd, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggleAdd} size="lg" style={{minWidth: "50%", minHeight: "50%"} }>
                <ModalHeader toggle={toggleAdd} style={{ backgroundColor: "#1f1e25", borderColor: "#141318", paddingLeft: "20px", color: "#e2e8f0"}}>View Cart</ModalHeader>
                <ModalBody style={{ backgroundColor: "#1f1e25"}}>
                    <div>
                        <h2 style={{ textDecoration: 'underline', paddingLeft: '10px', color: "#e2e8f0" }}>{"test"}</h2>
                    </div>
                    <div className="d-flex align-items-top">
                        <div className="item-details">
                            <div>
                                <h4 style={{ color: "#e2e8f0", marginTop: "20px"}}>Description</h4>
                                <p style={{ color: "#718096" }}>{"test"}</p>
                            </div>
                            <div>
                                <div style={{ display: "flex", alignItems: "top" }}>
                                    <div>
                                        <h4 style={{ color: "#e2e8f0" }}>Genre</h4>
                                        <p style={{ color: "#718096" , width: "100px"}}>{"test"}</p>
                                    </div>
                                    <div style={{ marginLeft: "125px" }}>
                                        <h4 style={{ color: "#e2e8f0"}}>Size</h4>
                                        <p style={{ color: "#718096"}}>{"test"}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{ display: "flex", alignItems: "top" }}>
                                    <div>
                                        <h4 style={{ color: "#e2e8f0" }}>In Stock?</h4>
                                        <p style={{ color: "#718096", width: "100px" }}>{"test" ? "No" : "Yes"}</p>
                                    </div>
                                    <div style={{ marginLeft: "125px" }}>
                                        <h4 style={{ color: "#e2e8f0" }}>Release Date</h4>
                                        <p style={{ color: "#718096" }}>{"test"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter style={{ backgroundColor: "#1f1e25", borderColor: "#141318" }}>
                    <div style={{ marginTop: "20px", marginRight: "15px", alignItems: "center" }}>
                        <p style={{ color: "#29ff74", fontWeight: "bold" }}>{"test"}</p>
                    </div>
                    <Button color="success" onClick={() => onSave(this.state.cart)}>
                    </Button>
                    <p></p>
                    <Button className="btn btn-danger" onClick={this.props.toggle}>
                        X
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}