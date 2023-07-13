import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from "reactstrap";

export default class CustomModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }
    handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    };
    handleClose = () => {
        const { toggleAdd } = this.props;
        toggleAdd(); // Call the toggleAdd function to close the Modal
    };
    render() {
        const { toggleAdd, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggleAdd} size="lg" style={{minWidth: "50%", minHeight: "50%"} }>
                <ModalHeader toggle={toggleAdd} style={{ backgroundColor: "#1f1e25", borderColor: "#141318", paddingLeft: "20px", color: "#e2e8f0"}}>View PopTopic</ModalHeader>
                <ModalBody style={{ backgroundColor: "#16151a"}}>
                    <div>
                        <h2 style={{ textDecoration: 'underline', paddingLeft: '10px', color: "#e2e8f0" }}>{this.state.activeItem.genre + " - " + this.state.activeItem.title}</h2>
                    </div>
                    <div className="d-flex align-items-top">
                        <img
                            src={this.state.activeItem.image}
                            alt=""
                            className="mr-3"
                            style={{ width: '300px', height: '300px', objectFit: "cover", paddingRight: '30px', paddingTop: '30px', paddingLeft: '15px', paddingBottom: '15px'}}
                        />
                        <div className="item-details">
                            <div>
                                <h4 style={{ color: "#e2e8f0", marginTop: "20px"}}>Description</h4>
                                <p style={{ color: "#718096" }}>{this.state.activeItem.description}</p>
                            </div>
                            <div>
                                <div style={{ display: "flex", alignItems: "top" }}>
                                    <div>
                                        <h4 style={{ color: "#e2e8f0" }}>Genre</h4>
                                        <p style={{ color: "#718096" , width: "100px"}}>{this.state.activeItem.genre}</p>
                                    </div>
                                    <div style={{ marginLeft: "125px" }}>
                                        <h4 style={{ color: "#e2e8f0"}}>Size</h4>
                                        <p style={{ color: "#718096"}}>{this.state.activeItem.size}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{ display: "flex", alignItems: "top" }}>
                                    <div>
                                        <h4 style={{ color: "#e2e8f0" }}>In Stock?</h4>
                                        <p style={{ color: "#718096", width: "100px" }}>{this.state.activeItem.outOfStock ? "No" : "Yes"}</p>
                                    </div>
                                    <div style={{ marginLeft: "125px" }}>
                                        <h4 style={{ color: "#e2e8f0" }}>Release Date</h4>
                                        <p style={{ color: "#718096" }}>{this.state.activeItem.dateReleased}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter style={{ backgroundColor: "#1f1e25", borderColor: "#141318" }}>
                    <div style={{ marginTop: "20px", marginRight: "15px", alignItems: "center" }}>
                        <p style={{ color: "#29ff74", fontWeight: "bold" }}>{"$" + this.state.activeItem.price + " USD"}</p>
                    </div>
                    {!this.state.activeItem.outOfStock ? (
                        <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                            {new Date().getTime() < new Date(this.state.activeItem.dateReleased).getTime()
                                ? "+ Add Preorder to Cart"
                                : "+ Add to Cart"}
                        </Button>
                    ) : (
                        <p style={{ color: "red" }}>Out of Stock</p>
                    )}

                    <p></p>
                    <Button className="btn btn-danger" onClick={toggleAdd}>
                        X
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}