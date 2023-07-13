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
            cart: this.props.activeCart,
        };
    }
    handleChange = e => {
        let { name, value } = e.target;
        const cart = { ...this.state.cart, [name]: value };
        this.setState({ cart });
    };
    handleClose = () => {
        const { toggleCart } = this.props;
        toggleCart(); // Call the toggleAdd function to close the Modal
    };
    handleIncrease = async (item) => {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
        const cart = { ...this.state.cart};
        this.setState({ cart });
    };
    handleDecrease = async (item) => {
        if (item.quantity > 1) {
            item.quantity -= 1;
            const cart = { ...this.state.cart };
            await this.setState({ cart });
            localStorage.setItem('cart', JSON.stringify(this.state.cart));
        }
        else if (item.quantity === 1) {
            item.quantity -= 1;
            const updatedItems = this.state.cart.itemsInCart.filter(
                (cartItem) => cartItem.cartItem !== item.cartItem
            );
            await this.setState(() => ({
                cart: { itemsInCart: updatedItems }
            }));
            localStorage.setItem('cart', JSON.stringify(this.state.cart));
        }
    };
    calculateTotalQuantity(itemsInCart) {
        return itemsInCart.reduce((total, item) => total + item.quantity, 0);
    };

    calculateTotalPrice(itemsInCart) {
        return itemsInCart.reduce((total, item) => total + item.cartItem.price * item.quantity, 0);
    };
    render() {
        const { activeCart, toggleCart, onCheckOut} = this.props;
        return (
            <Modal isOpen={true} toggle={toggleCart} size="lg" style={{minWidth: "50%", minHeight: "50%"} }>
                <ModalHeader toggle={toggleCart} style={{ backgroundColor: "#16151a", borderColor: "#141318", paddingLeft: "20px", color: "#e2e8f0"}}>View Cart</ModalHeader>
                <ModalBody style={{ backgroundColor: "#16151a"}}>
                    <div>
                        <h2 style={{ textDecoration: 'underline', paddingLeft: '10px', paddingBottom: '10px', color: "#e2e8f0" }}>{"PopTopic Checkout"}</h2>
                    </div>
                    <div className="d-flex align-items-left">
                        <div className="item-details">
                            {activeCart.itemsInCart.length !== 0 ? (
                                <>
                                    {activeCart.itemsInCart.map((item) =>
                                        item.quantity !== 0 ? (
                                            <li
                                                key={item.cartItem.id}
                                                className="list-group-item d-flex justify-content-between align-items-center"
                                                style={{
                                                    borderColor: "#141318",
                                                    backgroundColor: "#1f1e25",
                                                    marginBottom: "2px",
                                                    marker: "none"
                                                }}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={item.cartItem.image}
                                                        alt=""
                                                        className="mr-3"
                                                        style={{ width: "30px", height: "50px", objectFit: "cover", marginRight: "5px" }}
                                                    />
                                                    <div>
                                                        <h5 style={{ color: "#e2e8f0", paddingLeft: "10px", whiteSpace: "nowrap" }}>
                                                            {item.cartItem.genre + " - " + item.cartItem.title}
                                                        </h5>
                                                        <h6 style={{ color: "#718096", paddingLeft: "10px", marginRight: "50px" }}>
                                                            {"Size " + item.cartItem.size}
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="quantity" style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                                                    <span
                                                        className="price"
                                                        style={{
                                                            color: "#29ff74",
                                                            paddingRight: "20px",
                                                            paddingLeft: "20px",
                                                            fontWeight: "bold",
                                                            whiteSpace: "nowrap",
                                                            fontSize: "8pt",
                                                        }}
                                                    >
                                                        {"$" + item.cartItem.price + " USD"}
                                                    </span>
                                                    <span style={{ color: "white", paddingRight: "15px" }}>{item.quantity}</span>
                                                    <button
                                                        style={{
                                                            display: "d-flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            width: "25px",
                                                            height: "25px",
                                                            fontWeight: "bold",
                                                            backgroundColor: "#3e68db",
                                                            borderRadius: "4px",
                                                            borderColor: "black",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => this.handleDecrease(item)}
                                                    >
                                                        <div style={{ lineHeight: "0" }}>-</div>
                                                    </button>
                                                    <button
                                                        style={{
                                                            display: "d-flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            width: "25px",
                                                            height: "25px",
                                                            fontWeight: "bold",
                                                            backgroundColor: "#3e68db",
                                                            borderRadius: "4px",
                                                            borderColor: "black",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => this.handleIncrease(item)}
                                                    >
                                                        <div style={{ lineHeight: "0" }}>+</div>
                                                    </button>
                                                </div>
                                            </li>
                                        ) : null
                                    )}
                                </>
                            ) : (
                                <p style={{ color: "white", paddingLeft: "15px", marker: "none" }}>Empty Cart</p>
                            )}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter style={{ backgroundColor: "#1f1e25", borderColor: "#141318", paddingRight: "30px"}}>
                    <p style={{ color: "white", paddingRight: "30px", marker: "none" }}>
                        # of Items: {this.calculateTotalQuantity(activeCart.itemsInCart)}
                    </p>
                    <div style={{ marginTop: "20px", marginRight: "30px", alignItems: "center" }}>
                        <p style={{ color: "#29ff74", fontWeight: "bold" }}>Subtotal: ${this.calculateTotalPrice(activeCart.itemsInCart)} USD</p>
                    </div>
                    <Button color="success" onClick={() => onCheckOut(this.state.cart)}>+ Purchase
                    </Button>
                    <p style={{paddingRight:"15px"} }></p>
                    <Button className="btn btn-danger" onClick={toggleCart}>
                        X
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}