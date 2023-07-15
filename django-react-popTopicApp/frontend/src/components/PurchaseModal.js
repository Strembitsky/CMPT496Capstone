import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Tooltip

} from "reactstrap";
import { calculateTotalPrice, calculateTotalQuantity } from '../App'
import { FaCheck } from "react-icons/fa";


export default class PurchaseModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.activeCart,
            name: "",
            address: "",
            city: "",
            zip: "",
            cardNumber: "",
            expiration: "",
            cvv: "",
            nameValid: false,
            addressValid: false,
            cityValid: false,
            zipValid: false,
            cardNumberValid: false,
            expirationValid: false,
            cvvValid: false,
            email: "",
            emailValid: false,
            showTooltip: false
        };
    }
    handleMouseEnter = () => {
        if (!this.isFormValid()) {
            this.setState({ showTooltip: true });
        }
    };

    handleMouseLeave = () => {
        this.setState({ showTooltip: false });
    };

    isFormValid = () => {
        // Return true if all conditions are met, otherwise return false
        if (this.state.nameValid && this.state.addressValid && this.state.cityValid
            && this.state.zipValid && this.state.cardNumberValid && this.state.expirationValid
            && this.state.cvvValid && this.state.emailValid) {
            return true;
        }
        return false;
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            this.validateField(name);
        });
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

    validateField = (fieldName) => {
        switch (fieldName) {
            case "name":
                this.setState({ nameValid: this.state.name.trim().length > 0 });
                break;
            case "address":
                this.setState({ addressValid: this.state.address.trim().length > 0 });
                break;
            case "city":
                this.setState({ cityValid: this.state.city.trim().length > 0 });
                break;
            case "zip":
                this.setState({ zipValid: /^\d{5}(?:[-\s]\d{4})?$|^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/.test(this.state.zip) });
                break;
            case "cardNumber":
                this.setState({ cardNumberValid: /^\d{16}$/.test(this.state.cardNumber) });
                break;
            case "expiration":
                this.setState({ expirationValid: /^\d{4}$/.test(this.state.expiration) });
                break;
            case "cvv":
                this.setState({ cvvValid: /^\d{3}$/.test(this.state.cvv) });
                break;
            case "email":
                this.setState({ emailValid: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this.state.email) });
                break;
            default:
                break;
        }
    };

    render() {
        const { activeCart, togglePurchase, onPurchase, togglePurchaseBack } = this.props;
        const {
            showTooltip,
            cart,
            name,
            address,
            city,
            zip,
            cardNumber,
            expiration,
            cvv,
            email
        } = this.state;
        return (
            <Modal isOpen={true} toggle={togglePurchase} size="lg" style={{minWidth: "50%", minHeight: "50%"} }>
                <ModalHeader toggle={togglePurchase} style={{ backgroundColor: "#1f1e25", borderColor: "#141318", paddingLeft: "20px", color: "#e2e8f0"}}>View Cart</ModalHeader>
                <ModalBody style={{ backgroundColor: "#16151a", display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <div>
                            <h2 style={{ textDecoration: 'underline', paddingLeft: '10px', paddingBottom: '10px', color: "#e2e8f0" }}>{"PopTopic Checkout"}</h2>
                        </div>
                        {activeCart.itemsInCart.length !== 0 ? (
                            <div className="item-details" style={{whiteSpace: "nowrap"} }>
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
                                                maxHeight: "80px"
                                            }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={item.cartItem.image}
                                                    alt=""
                                                    className="mr-3"
                                                    style={{ width: "30px", height: "50px", objectFit: "cover", marginRight: "5px" }}
                                                />
                                                <div style={{width: "300px", whiteSpace: "pre-wrap", padding: "10px"} }>
                                                    <h5 style={{ color: "#e2e8f0" }}>
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
                    <div style={{ display: "flex", flex: 3, paddingLeft: "25px", justifyContent: "center" }}>
                        <div style={{ display: "flex", flex: 3 }}>
                            <div style={{ paddingRight: "20px", paddingTop: "20px", paddingBottom: "20px" }}>
                                <h4 style={{ color: "#e2e8f0", marginBottom: "10px", textDecoration: 'underline' }}>Billing Information</h4>
                                <label htmlFor="name" style={{ display: "flex", alignItems: "center", color: "#e2e8f0" }}>
                                    {!this.state.nameValid ? (
                                        <span style={{ paddingRight: "5px", color: "red" }}>*</span>
                                    ) : <FaCheck style={{ paddingRight: "5px", color: "green" }} />}
                                    Name:
                                </label>
                                <input type="text" id="name" name="name" style={{ backgroundColor: "lightGrey", outline: "#1f1e25" }} value={this.state.name} onChange={this.handleChange} />
                                <br />
                                <label htmlFor="email" style={{ display: "flex", alignItems: "center", color: "#e2e8f0" }}>
                                    {!this.state.emailValid ? (
                                        <span style={{ paddingRight: "5px", color: "red" }}>*</span>
                                    ) : <FaCheck style={{ paddingRight: "5px", color: "green" }} />}
                                    Email:
                                </label>
                                <input type="email" id="email" name="email" style={{ backgroundColor: "lightGrey", outline: "#1f1e25" }} value={this.state.email} onChange={this.handleChange} />
                                <br />
                                <label htmlFor="address" style={{ display: "flex", alignItems: "center", color: "#e2e8f0" }}>
                                    {!this.state.addressValid ? (
                                        <span style={{ paddingRight: "5px", color: "red" }}>*</span>
                                    ) : <FaCheck style={{ paddingRight: "5px", color: "green" }} />}
                                    Address:
                                </label>
                                <input type="text" id="address" name="address" style={{ backgroundColor: "lightGrey", outline: "#1f1e25" }} value={this.state.address} onChange={this.handleChange} />
                                <br />
                                <label htmlFor="city" style={{ display: "flex", alignItems: "center", color: "#e2e8f0" }}>
                                    {!this.state.cityValid ? (
                                        <span style={{ paddingRight: "5px", color: "red" }}>*</span>
                                    ) : <FaCheck style={{ paddingRight: "5px", color: "green" }} />}
                                    City:
                                </label>
                                <input type="text" id="city" name="city" style={{ backgroundColor: "lightGrey", outline: "#1f1e25" }} value={this.state.city} onChange={this.handleChange} />
                                <br />
                                <label htmlFor="zip" style={{ display: "flex", alignItems: "center", color: "#e2e8f0" }}>
                                    {!this.state.zipValid ? (
                                        <span style={{ paddingRight: "5px", color: "red" }}>*</span>
                                    ) : <FaCheck style={{ paddingRight: "5px", color: "green" }} />}
                                    ZIP Code:
                                </label>
                                <input type="text" id="zip" name="zip" style={{ backgroundColor: "lightGrey", outline: "#1f1e25" }} value={this.state.zip} onChange={this.handleChange} />
                            </div>
                            <div style={{ paddingTop: "20px", paddingRight: "20px" }}>
                                <h4 style={{ color: "#e2e8f0", marginBottom: "10px", textDecoration: 'underline' }}>Payment Information</h4>
                                <label htmlFor="cardNumber" style={{ display: "flex", alignItems: "center", color: "#e2e8f0" }}>
                                    {!this.state.cardNumberValid ? (
                                        <span style={{ paddingRight: "5px", color: "red" }}>*</span>
                                    ) : <FaCheck style={{ paddingRight: "5px", color: "green" }} />}
                                    Card Number:
                                </label>
                                <input type="text" id="cardNumber" name="cardNumber" style={{ backgroundColor: "lightGrey", outline: "#1f1e25" }} value={this.state.cardNumber} onChange={this.handleChange} />
                                <br />
                                <label htmlFor="expiration" style={{ display: "flex", alignItems: "center", color: "#e2e8f0" }}>
                                    {!this.state.expirationValid ? (
                                        <span style={{ paddingRight: "5px", color: "red" }}>*</span>
                                    ) : <FaCheck style={{ paddingRight: "5px", color: "green" }} />}
                                    Expiration Date (mmyy):
                                </label>
                                <input type="text" id="expiration" name="expiration" style={{ backgroundColor: "lightGrey", outline: "#1f1e25" }} value={this.state.expiration} onChange={this.handleChange} />
                                <br />
                                <label htmlFor="cvv" style={{ display: "flex", alignItems: "center", color: "#e2e8f0" }}>
                                    {!this.state.cvvValid ? (
                                        <span style={{ paddingRight: "5px", color: "red" }}>*</span>
                                    ) : <FaCheck style={{ paddingRight: "5px", color: "green" }} />}
                                    CVV:
                                </label>
                                <input type="text" id="cvv" name="cvv" style={{ backgroundColor: "lightGrey", outline: "#1f1e25" }} value={this.state.cvv} onChange={this.handleChange} />
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
                    <>
                        <Button
                            id="purchaseButton"
                            color="success"
                            onClick={(this.isFormValid() ? () =>
                                onPurchase(cart,
                                name,
                                address,
                                city,
                                zip,
                                cardNumber,
                                expiration,
                                cvv,
                                email) : null)}
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                            style={{
                                cursor: (this.isFormValid() ? "pointer" : "not-allowed"), opacity: (!this.isFormValid() ? 0.4 : 1.0)}}
                        >
                            Purchase
                        </Button>
                        {!this.isFormValid() && (
                            <Tooltip isOpen={showTooltip} placement="top" target="purchaseButton">
                                Please fill in all required fields.
                            </Tooltip>
                        )}
                    </>
                    <p style={{paddingRight:"15px"} }></p>
                    <Button className="btn btn-danger" onClick={togglePurchaseBack}>
                        Back
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}