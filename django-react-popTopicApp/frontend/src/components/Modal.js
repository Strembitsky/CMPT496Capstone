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
                <ModalBody style={{ backgroundColor: "#1f1e25"}}>
                    <div>
                        <h2 style={{ textDecoration: 'underline', paddingLeft: '10px', color: "#e2e8f0" }}>{this.state.activeItem.genre + " - " + this.state.activeItem.title}</h2>
                    </div>
                    <div className="d-flex align-items-center">
                        <img
                            src={this.state.activeItem.image}
                            alt=""
                            className="mr-3"
                            style={{ width: '300px', height: '300px', objectFit: "cover", paddingRight: '30px', paddingTop: '15px', paddingLeft: '15px', paddingBottom: '15px'}}
                        />
                        <div className="item-details">
                            <div>
                                <h4 style={{ color: "#e2e8f0", marginTop: "20px"}}>Description</h4>
                                <p style={{ color: "#718096" }}>{this.state.activeItem.description}</p>
                            </div>
                            <div>
                                <h4 style={{ color: "#e2e8f0" } }>Genre</h4>
                                <p style={{ color: "#718096" }}>{this.state.activeItem.genre}</p>
                            </div>
                            <div>
                                <h4 style={{ color: "#e2e8f0" }}>Size</h4>
                                <p style={{ color: "#718096" }}>{this.state.activeItem.size}</p>
                            </div>
                            <div>
                                <h4 style={{ color: "#e2e8f0" }}>In Stock?</h4>
                                <p style={{ color: "#718096" }}>{this.state.activeItem.outOfStock ? "No" : "Yes"}</p>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter style={{ backgroundColor: "#1f1e25", borderColor: "#141318" }}>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
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