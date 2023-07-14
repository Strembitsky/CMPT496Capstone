import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from "reactstrap";
import { calculateTotalPrice, calculateTotalQuantity } from '../App'


export default class PurchaseModal extends React.Component {
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
        const { togglePurchase } = this.props;
        togglePurchase(); // Call the toggleAdd function to close the Modal
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

    render() {
        const { activeCart, togglePurchase, onPurchase, togglePurchaseBack } = this.props;


        return (
            <Modal isOpen={true} toggle={togglePurchase} size="lg" style={{minWidth: "50%", minHeight: "50%"} }>
                <ModalHeader toggle={togglePurchase} style={{ backgroundColor: "#1f1e25", borderColor: "#141318", paddingLeft: "20px", color: "#e2e8f0"}}>View Cart</ModalHeader>
                <ModalBody style={{ backgroundColor: "#16151a", display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <div>
                            <h2 style={{ textDecoration: 'underline', paddingLeft: '10px', paddingBottom: '10px', color: "#e2e8f0" }}>{"PopTopic Checkout"}</h2>
                        </div>
                        {activeCart.itemsInCart.length !== 0 ? (
                            <div className="item-details">
                                {activeCart.itemsInCart.map((item) => (
                                    item.quantity !== 0 ? (
                                        <div
                                            key={item.cartItem.id}
                                            className="d-flex justify-content-between align-items-center"
                                            style={{
                                                borderColor: "#141318",
                                                backgroundColor: "#1f1e25",
                                                marginBottom: "2px",
                                                padding: "10px",
                                                maxHeight: "60px"
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
                                                    <h5 style={{ color: "#e2e8f0", whiteSpace: "nowrap" }}>
                                                        {item.cartItem.genre + " - " + item.cartItem.title}
                                                    </h5>
                                                    <h6 style={{ color: "#718096", marginRight: "50px" }}>
                                                        {"Size " + item.cartItem.size}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="quantity">
                                                <span style={{ color: "#29ff74", paddingRight: "20px", fontWeight: "bold", whiteSpace: "nowrap", fontSize: "8pt" }}>
                                                    {"$" + item.cartItem.price + " USD"}
                                                </span>
                                                <span style={{ color: "white", paddingRight: "15px" }}>{item.quantity}</span>
                                            </div>
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: "white", paddingLeft: "15px", marker: "none" }}>Empty Cart</p>
                        )}
                    </div>
                    <div style={{ display: "flex", flex: 3, paddingLeft: "100px", justifyContent: "center" }}>
                        <div style={{ flex: 3 }}>
                            <div style={{ padding: "20px" }}>
                                <h4 style={{ color: "#e2e8f0", marginBottom: "10px", textDecoration: 'underline' }}>Billing Information</h4>
                                <label htmlFor="name" style={{ display: "block", color: "#e2e8f0" }}>Name:</label>
                                <input type="text" id="name" name="name" style={{}} />
                                <br />
                                <label htmlFor="email" style={{ display: "block", color: "#e2e8f0" }}>Email:</label>
                                <input type="email" id="email" name="email" style={{}} />
                                <br />
                                <label htmlFor="address" style={{ display: "block", color: "#e2e8f0" }}>Address:</label>
                                <input type="text" id="address" name="address" style={{}} />
                                <br />
                                <label htmlFor="city" style={{ display: "block", color: "#e2e8f0" }}>City:</label>
                                <input type="text" id="city" name="city" style={{}} />
                                <br />
                                <label htmlFor="zip" style={{ display: "block", color: "#e2e8f0" }}>ZIP Code:</label>
                                <input type="text" id="zip" name="zip" style={{}} />
                            </div>
                            <div style={{ padding: "20px" }}>
                                <h4 style={{ color: "#e2e8f0", marginBottom: "10px", textDecoration: 'underline' }}>Payment Information</h4>
                                <label htmlFor="cardNumber" style={{ display: "block", color: "#e2e8f0" }}>Card Number:</label>
                                <input type="text" id="cardNumber" name="cardNumber" style={{}} />
                                <br />
                                <label htmlFor="expiration" style={{ display: "block", color: "#e2e8f0" }}>Expiration Date:</label>
                                <input type="text" id="expiration" name="expiration" style={{}} />
                                <br />
                                <label htmlFor="cvv" style={{ display: "block", color: "#e2e8f0" }}>CVV:</label>
                                <input type="text" id="cvv" name="cvv" style={{}} />
                            </div>
                        </div>
                    </div>


                </ModalBody>
                <ModalFooter style={{ backgroundColor: "#1f1e25", borderColor: "#141318", paddingRight: "30px"}}>
                    <p style={{ color: "white", paddingRight: "30px", marker: "none" }}>
                        # of Items: {calculateTotalQuantity(activeCart.itemsInCart)}
                    </p>
                    <div style={{ marginTop: "20px", marginRight: "30px", alignItems: "center" }}>
                        <p style={{ color: "#29ff74", fontWeight: "bold" }}>Subtotal: ${calculateTotalPrice(activeCart.itemsInCart)} USD</p>
                    </div>
                    <Button color="success" onClick={() => onPurchase(this.state.cart)}>Purchase
                    </Button>
                    <p style={{paddingRight:"15px"} }></p>
                    <Button className="btn btn-danger" onClick={togglePurchaseBack}>
                        Back
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}