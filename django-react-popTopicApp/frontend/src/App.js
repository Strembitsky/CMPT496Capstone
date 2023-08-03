import React from "react";
import Modal from "./components/Modal";
import CartModal from "./components/CartModal";
import PurchaseModal from "./components/PurchaseModal";
import PurchaseSuccessModal from "./components/PurchaseSuccessModal";
import ShippingPolicyModal from "./components/ShippingPolicyModal";
import CancellationPolicyModal from "./components/CancellationPolicyModal";
import ContactUsModal from "./components/ContactUsModal";
import AboutUsModal from "./components/AboutUsModal";
import axios from "axios";
import { FaShoppingCart } from 'react-icons/fa';
import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { MdCancel } from 'react-icons/md';

// fixes issues with "scroll bar bounce" showing different colors behind the page
document.body.style.backgroundColor = "#1f1e25";

// function responsible for calculating total quantity of items in cart
export function calculateTotalQuantity(itemsInCart=[]) {
    return itemsInCart.reduce((total, item) => total + item.quantity, 0);
}

// function responsible for calculating total price of items in cart
export function calculateTotalPrice(itemsInCart=[]) {
    const totalPrice = itemsInCart.reduce((total, item) => total + item.cartItem.price * item.quantity, 0);
    return totalPrice.toFixed(2);
}

class App extends React.Component {
    state = {
        activeItem: {
            title: "",
            description: "",
            genre: "",
            size: "",
            image: "",
            dateCreated: null,
            dateReleased: null,
            price: 0,
            outOfStock: false,
            quantity: 1
        },
        cart: {
            itemsInCart: [],
        },
        popTopicList: [],
        modal: false,
        cartModal: false,
        purchaseModal: false,
        purchaseSuccessModal: false,
        shippingPolicyModal: false,
        cancellationPolicyModal: false,
        contactUsModal: false,
        aboutUsModal: false,
        itemCount: 0,
        hoveredItem: null,
        selectedFilters: ["In Stock", "Out of Stock"],
        availableFilters: ["In Stock", "Out of Stock", "Size L", "Size M", "Size S"],
        selectedSorts: ["Name"],
        availableSorts: ["Name", "Price", "Size", "Release Date"],
        sortType: ["a"],
        isExpanded: false,
        hoveredImage: null,
        mouseX: 0,
        mouseY: 0,
        searchQuery: "",
        hoveredLink: "",
        currentGenre:"",
    };

    // function runs whenever anything changes
    async componentDidMount() {
        try {
            const res = await fetch("http://localhost:8000/api/popTopics/");
            const popTopicList = await res.json();
            const storedCart = localStorage.getItem('cart');
            let cart = storedCart ? JSON.parse(storedCart) : { itemsInCart: [] };
            this.setState({
                popTopicList
            }, () => {
                const filteredItems = this.filterItems();
                this.setState({
                    itemCount: filteredItems.length,
                    cart: cart
                });
                console.log(this.state);
            });
        } catch (e) {
            console.log(e);
        }
    }

    // functions that allows for the search bar to rapidly update item list
    handleSearchInputChange = async (event) => {
        const searchQuery = event.target.value;
        await this.setState({
            searchQuery
        });
        const filteredItems = this.filterItems();
        await this.setState({
            itemCount: filteredItems.length
        });
    };

    // Method to toggle the selected genre
    handleToggleGenre = (genre) => {
        if (this.state.currentGenre === genre) {
            this.setState({ currentGenre: "" });
        } else {
            this.setState({ Genre: genre });
        }
    };

    // function that filters the items based on selected filters from the website
    filterItems = () => {
        let inStockFilter = false;
        let outStockFilter = false;

        // sets stock filter booleans
        if (this.state.selectedFilters.includes("In Stock")) {
            inStockFilter = true;
        }

        if (this.state.selectedFilters.includes("Out of Stock")) {
            outStockFilter = true;
        }
        
        // fills selectedSizes array with currently selected size filters
        const selectedSizes = [];
        if (this.state.selectedFilters.includes("Size L")) {
            selectedSizes.push("L");
        }
        if (this.state.selectedFilters.includes("Size M")) {
            selectedSizes.push("M");
        }
        if (this.state.selectedFilters.includes("Size S")) {
            selectedSizes.push("S");
        }

        // filters items first based on the search bar
        const searchedItems = this.state.popTopicList.filter(item => {
            const searchCondition =
                this.state.searchQuery === "" ||
                [item.size, item.genre, item.description, item.title, item.dateReleased]
                    .join(" ")
                    .toLowerCase()
                    .includes(this.state.searchQuery.toLowerCase());
            return searchCondition;
        });

        // Filter the items based on the conditions
        const filteredItems = searchedItems.filter(item => {
            const sizeCondition = selectedSizes.length === 0 ? true : selectedSizes.includes(item.size);
            const stockCondition = (inStockFilter && outStockFilter) ? true : (inStockFilter ? !item.outOfStock : (outStockFilter ? item.outOfStock : true));
            return sizeCondition && stockCondition;
        });

        //Filter the items based on genre
        const genreItems = filteredItems.filter(item => {
            if(this.state.currentGenre !== ""){
                const genreCondition = item.genre === this.state.currentGenre;
                return genreCondition;  
            }
            return true;
        });

        return genreItems;
    }

    // function that allows for closing a modal upon button click within the modal
    toggleAdd = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal
        }));
    };

    // function that allows for closing a modal upon button click within the modal
    toggleCart = () => {
        this.setState((prevState) => ({
            cartModal: !prevState.cartModal
        }));
    };

    // function that allows for closing a modal upon button click within the modal
    togglePurchase = () => {
        this.setState((prevState) => ({
            purchaseModal: !prevState.purchaseModal
        }));
    };

    // function that allows for closing the purchase screen and reopen the cart screen
    togglePurchaseBack = () => {
        this.setState((prevState) => ({
            purchaseModal: !prevState.purchaseModal,
            cartModal: !prevState.cartModal
        }));
    };

    // function that opens the purchase success modal
    togglePurchaseSuccess = () => {
        this.setState((prevState) => ({
            purchaseSuccessModal: !prevState.purchaseSuccessModal
        }));
    }

    // function that opens the shipping policy modal
    toggleShippingPolicy = () => {
        this.setState((prevState) => ({
            shippingPolicyModal: !prevState.shippingPolicyModal
        }));
    }

    // function that opens the cancellation policy modal
    toggleCancellationPolicy = () => {
        this.setState((prevState) => ({
            cancellationPolicyModal: !prevState.cancellationPolicyModal
        }));
    }

    // function that opens the contact us modal
    toggleContactUs = () => {
        this.setState((prevState) => ({
            contactUsModal: !prevState.contactUsModal
        }));
    }

    // function that opens the about us modal
    toggleAboutUs = () => {
        this.setState((prevState) => ({
            aboutUsModal: !prevState.aboutUsModal
        }));
    }

    // function that handles saving the cart to localStorage
    handleSaveCart = async (item) => {
        this.toggleAdd();
        let foundItem = false;
        if (this.state.cart.length !== 0) {
            if (this.state.cart.itemsInCart.length !== 0) {
                for (let tempItem of this.state.cart.itemsInCart) {
                    if (item.id === tempItem.cartItem.id) {
                        tempItem.quantity += 1;
                        foundItem = true;
                        break;
                    }
                }
            }
        }
        if (!foundItem) {
            await this.setState((prevState) => ({
                cart: {
                    ...prevState.cart,
                    itemsInCart: [
                        ...prevState.cart.itemsInCart,
                        {
                            cartItem: item,
                            quantity: 1,
                        },
                    ],
                },
            }));
        }
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    };

    // function responsible for retrieving the cart and viewing the cart modal
    viewCart = () => {
        const storedCart = localStorage.getItem('cart');
        const cart = storedCart ? JSON.parse(storedCart) : [];
        this.setState({ cart: cart, cartModal: !this.state.cartModal });
    }

    // function responsible for viewing shipping policy
    viewShippingPolicy = () => {
        this.setState({ shippingPolicyModal: !this.state.shippingPolicyModal });
    }

    // function responsible for viewing cancellation policy
    viewCancellationPolicy = () => {
        this.setState({ cancellationPolicyModal: !this.state.cancellationPolicyModal });
    }

    // function responsible for viewing contact us
    viewContactUs = () => {
        this.setState({ contactUsModal: !this.state.contactUsModal });
    }

    // function responsible for viewing about us
    viewAboutUs = () => {
        this.setState({ aboutUsModal: !this.state.aboutUsModal });
    }

    // function responsible for retrieving the cart and bringing it to the checkout screen
    onCheckOut = () => {
        const storedCart = localStorage.getItem('cart');
        const cart = storedCart ? JSON.parse(storedCart) : [];
        this.setState({ cart: cart, cartModal: !this.state.cartModal, purchaseModal: !this.state.purchaseModal });
    }

    // function responsible for pushing purchases to the backend as orders
    onPurchase = async (
        cart,
        name,
        address,
        city,
        zipCode,
        cardNumber,
        expiration,
        cvv,
        email
    ) => {

        // cleans the cart in instances where items were removed and currently have quantity 0
        cart = cart.itemsInCart.filter(item => {
            const nonZero = item.quantity === 0 ? false : true;
            return nonZero;
        });

        // posts the order to the backend with a unique order id
       await axios.post(`http://localhost:8000/api/orders/`, {
            cart,
            name,
            address,
            city,
            zipCode,
            cardNumber,
            expiration,
            cvv,
            email,
        })
        .then(response => {
            // after posting to backend, empty the cart and show purchase success modal
            const emptiedCart = {
                itemsInCart: [],
            };
            this.setState({
                cart: emptiedCart,
                purchaseSuccessModal: !this.state.purchaseSuccessModal,
                purchaseModal: !this.state.purchaseModal
            });
            localStorage.setItem('cart', JSON.stringify(emptiedCart));
        })
        .catch(error => {
            // Handle error in case the API request fails
            console.error('Error:', error);
            // Show an error message to the user if necessary
        });
    };

    // fetchItems is a function that collects the items, filters them,
    // and returns the filteredList and the itemCount of them.
    fetchItems = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/popTopics/");
            const popTopicList = await res.json();
            const filteredItems = this.filterItems();
            this.setState({
                popTopicList,
                itemCount: filteredItems.length
            });
        } catch (e) {
            console.log(e);
        }
    };

    // function that keeps track of if the user's mouse is hovering an item or not
    handleMouseEnter = (itemId) => {
        this.setState({ hoveredItem: itemId });
    };

    // function that keeps track of if the user's mouse is hovering an item or not
    handleMouseLeave = () => {
        this.setState({ hoveredItem: null });
    };

    // function that keeps track of if the user's mouse is hovering an item or not
    handleMouseFooterEnter = (itemId) => {
        this.setState({ hoveredLink: itemId });
    };

    // function that keeps track of if the user's mouse is hovering an item or not
    handleMouseFooterLeave = () => {
        this.setState({ hoveredLink: "" });
    };

    // function that handles when the user mouse leaves an image from the main list
    handleMouseImageLeave = () => {
        this.setState({
            isExpanded: false,
            hoveredImage: null,
        });
    };

    // function that handles when the user mouse enters an image on the main list
    // also keeps track of the mouse position upon hover to display an expanded image later
    handleMouseImageEnter = (itemImage, event) => {
        const { clientX, clientY } = event;
        this.setState({
            isExpanded: true,
            hoveredImage: itemImage,
            mouseX: clientX,
            mouseY: clientY,
        });
    };

    refreshPage = () => {
        window.location.href = window.location.origin;
    }

    // expandItem is a function that gets called on an item row
    // that opens up a new modal consisting of the expanded
    // item view
    expandItem = (item) => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    // addFilter is a function that adds the argument
    // to selectedFilters
    addFilter = (filter) => {
        this.setState((prevState) => ({
            selectedFilters: [...prevState.selectedFilters, filter],
        }));
        this.fetchItems();
    };

    // removeFilter is a function that removes the argument
    // from selectedFilters
    removeFilter = (filter) => {
        this.setState((prevState) => ({
            selectedFilters: prevState.selectedFilters.filter((selectedFilter) => selectedFilter !== filter),
        }));
        this.fetchItems();
    };

    // function that accepts sort as an argument
    // and replaces the selectSorts array elements with the argument
    addSort = (sort) => {
        this.setState(() => ({
            selectedSorts: [sort],
        }));
        this.fetchItems();
    };

    // function used to change the sortType 
    // accepted arguments are 'a' or 'd'
    changeSortType = (sortType) => {
        this.setState(() => ({
            sortType: [sortType],
        }));
    };

    // Function to organize the data into a structure based on unique "generalType" values and sort alphabetically
    getGenreDataByGeneralType = () => {
        const { popTopicList } = this.state;
        const genreDataByGeneralType = {};

        popTopicList.forEach((item) => {
            const { generalType, genre } = item;
            if (!genreDataByGeneralType[generalType]) {
                genreDataByGeneralType[generalType] = new Set();
            }
            genreDataByGeneralType[generalType].add(genre);
        });

        // Sort the "generalTypes" alphabetically
        const sortedGeneralTypes = Object.keys(genreDataByGeneralType).sort();

        // Convert the sets to arrays and sort the "genres" under each "generalType" alphabetically
        sortedGeneralTypes.forEach((generalType) => {
            genreDataByGeneralType[generalType] = [...genreDataByGeneralType[generalType]].sort();
        });

        return { sortedGeneralTypes, genreDataByGeneralType };
    };

    // this function renders the cart button, the filter and sort buttons, as well as total item counter
    renderTabList = () => {

        const { itemCount } = this.state;

        // buttonStyle is for non-active buttons
        const buttonStyle = {
            padding: '6px 10px',
            backgroundColor: '#718096',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px'
        };

        // activeButtonStyle is for actively clicked buttons
        const activeButtonStyle = {
            ...buttonStyle,
            backgroundColor: '#3e68db'
        };

        return (
            <div className="my-3 tab-list col-12">
                <div className="filter-sort-container d-flex">
                        <div className="filter-container col-7">
                            <h3 style={{ color: "#e2e8f0" }}>Filters</h3>
                            {this.state.availableFilters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() =>
                                        this.state.selectedFilters.includes(filter)
                                            ? this.removeFilter(filter)
                                            : this.addFilter(filter)
                                    }
                                    style={
                                        this.state.selectedFilters.includes(filter)
                                            ? activeButtonStyle
                                            : buttonStyle
                                    }
                                >
                                    {filter}
                                </button>
                            ))}

                        {/* Check if there is a selected genre */}
                        {this.state.currentGenre && (
                            <button className = "flex-container"
                                onClick={() => this.handleOnClickGenre("")}
                                style={activeButtonStyle}
                            >
                                <div className="flex-container">
                                    <span style={{ marginRight: "5px" }}>
                                        <MdCancel />
                                    </span>
                                    {this.state.currentGenre}
                                </div>
                            </button>
                        )}
                        </div>
                
                    <div className="sort-container col-6">
                        <h3 className="d-flex justify-content-end" style={{ color: "#e2e8f0", paddingRight: "5px" }}>Sorting By</h3>
                        <div className="d-flex justify-content-end">
                            {this.state.availableSorts.map((sort) => (
                                // the following button division is an absolute mess of nested ternary operators but it gets the job done
                                // first it makes the button with onClick events to cause sorting of the items as well as allowing for double-clicking
                                // of the same active button to change the sortType from ascending to descending.
                                //
                                // then it makes the button style based on above, previously declared styles for active / non active buttons
                                //
                                // the very last div is a nested ternary operator that prints an up or down arrow beside the sort button
                                // based on sort direction
                            <button
                                key={sort}
                                onClick={() =>
                                    this.state.selectedSorts.includes(sort)
                                        ? (this.state.sortType[0] === 'a' ? this.changeSortType('d') : this.changeSortType('a')) : this.addSort(sort)
                                }
                                style={
                                    this.state.selectedSorts.includes(sort)
                                        ? activeButtonStyle : buttonStyle
                                }
                                >
                                    <div>
                                        {this.state.selectedSorts.includes(sort) ? (this.state.sortType[0] === 'a' ? (<><FaArrowUp size={12} color="black" /> {sort}</>) : (<><FaArrowDown size={12} color="black" /> {sort}</>)) :  sort }
                                    </div>
                            </button>
                        ))}
                        </div>
                    </div>
                </div>
                <p style={{ color: "#9aa6b8", paddingTop: "10px"} }>{"# of Items: (" + itemCount + ')'}</p>
            </div>
            // the above p div is to show the # of items
        );
    };

    // this function renders out the list of the items. starting with a big sort function
    renderItems = () => {
        const newItems = this.filterItems();
        // this is where I sort the items 
        // based on the selected sorting options
        newItems.sort((a, b) => {
            if (this.state.selectedSorts[0] === "Name") {
                const propA = a.title.toLowerCase();
                const propB = b.title.toLowerCase();
                if (propA < propB) {
                    if (this.state.sortType[0] === 'a') {
                        return -1; // propA comes before propB
                    }
                    else {
                        return 1;
                    }
                } else if (propA > propB) {
                    if (this.state.sortType[0] === 'a') {
                        return 1; // propA comes before propB
                    }
                    else {
                        return -1;
                    }
                } else {
                    return 0; // propA and propB are equal
                }
            }
            if (this.state.selectedSorts[0] === "Price") {
                if (this.state.sortType[0] === 'a') {
                    return a.price - b.price;
                }
                else {
                    return b.price - a.price;
                }
            }
            if (this.state.selectedSorts[0] === "Release Date") {
                if (this.state.sortType[0] === 'a') {
                    return a.dateReleased > b.dateReleased;
                }
                else {
                    return a.dateReleased < b.dateReleased;
                }
            }
            if (this.state.selectedSorts[0] === "Size") {
                const propA = a.size.toLowerCase();
                const propB = b.size.toLowerCase();
                if ((propA === 's' && propB !== 's') || (propA === 'm' && propB === 'l')) {
                    if (this.state.sortType[0] === 'a') {
                        return -1; // propA comes before propB
                    }
                    else {
                        return 1;
                    }
                } else if ((propA !== 's' && propB === 's') || (propA === 'l' && propB === 'm')) {
                    if (this.state.sortType[0] === 'a') {
                        return 1; // propA comes after propB
                    }
                    else {
                        return -1;
                    }
                } else {
                    return 0; // propA and propB are equal
                }
            }
            return 0;
        });
        // end sorting

        // render out the list of items on the main screen
        return newItems.map(item => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{
                    cursor: "pointer",
                    transition: "background-color 0.1s",
                    backgroundColor: this.state.hoveredItem === item.id ? "#25242b" : "transparent",
                    borderColor: "#141318",
                }}
                onMouseEnter={() => this.handleMouseEnter(item.id)}
                onMouseLeave={this.handleMouseLeave}
                onClick={() => this.expandItem(item)}
            >
                <span className={`popTopic-title mr-2`} title={item.title}>
                    <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
                        <div
                            onMouseEnter={(event) => this.handleMouseImageEnter(item.image, event)}
                            onMouseLeave={this.handleMouseImageLeave}
                            style={{ position: "relative" }}
                        >
                            <img
                                src={item.image}
                                alt=""
                                className="mr-3"
                                style={{ width: "70px", height: "100px", objectFit: "cover", marginRight: "15px" }}
                            />
                            {this.state.isExpanded && this.state.hoveredItem === item.id && (
                                <div
                                    style={{
                                        position: "fixed",
                                        top: `${this.state.mouseY}px`,
                                        left: `${this.state.mouseX}px`,
                                        transform: "translate(10%, -50%)",
                                        width: "500px",
                                        height: "500px",
                                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        zIndex: 1,
                                    }}
                                >
                                    <img
                                        src={this.state.hoveredImage}
                                        alt=""
                                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 style={{ color: "#e2e8f0", paddingLeft: "20px" }}>{item.genre + " - " + item.title}</h3>
                            <h5 style={{ color: "#718096", paddingLeft: "20px", marginRight: "50px" }}>
                                {"Size " + item.size + " - " + (item.description.length > 200 ? `${item.description.slice(0, 197)}...` : item.description)}
                            </h5>
                        </div>
                    </div>
                </span>
                <div className="test d-flex justify-content-end" style={{ flex: "1" }}>
                    {item.outOfStock === true ? (
                        <span className="align-items-end" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingTop: "10px" }}>
                            <span className="price" style={{ color: "grey", paddingRight: "20px", paddingLeft: "20px", fontWeight: "bold", textDecoration: "line-through", whiteSpace: "nowrap", alignSelf: "flex-end" }}>
                                {"$" + item.price + " USD"}
                            </span>
                            <p style={{ color: "red", paddingRight: "20px", paddingLeft: "20px", alignSelf: "flex-end" }}>Out of Stock</p>
                        </span>
                    ) : (
                        <span className="price" style={{ color: "#29ff74", paddingRight: "20px", paddingLeft: "20px", fontWeight: "bold", whiteSpace: "nowrap" }}>
                            {"$" + item.price + " USD"}
                        </span>
                    )}
                </div>
            </li>


        ));
    };
    handleOnClickGenre = async (value) => {
        await this.setState({ currentGenre: value });
        const filteredItems = this.filterItems();
        await this.setState({
            itemCount: filteredItems.length
        });
    }
    
    // renders out the app header as well as checks for other modals
    render() {
        const { searchQuery } = this.state;
        const { sortedGeneralTypes, genreDataByGeneralType } = this.getGenreDataByGeneralType();
        return (
            <div>
                <div className="app-header" style={{ backgroundColor: "#1f1e25", height: "10%" }}>
                    <div style={{ backgroundColor: "#1f1e25", height: "10%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                            <p onClick = {() => this.refreshPage()} style={{ color: "white", fontWeight: 600, fontSize: 24, paddingLeft: "30px", marginBottom: "1rem", marginTop: "1rem", alignItems: "center", paddingRight: "30px", cursor: "pointer"}}>poptopic</p>
                            <div style={{ display: "flex", alignItems: "center", borderRadius: "20px", backgroundColor: "#f0f0f0", padding: "5px 10px" }}>
                                <span style={{ marginRight: "5px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M14.854 13.145l-3.7-3.699a5.5 5.5 0 10-.708.708l3.699 3.7a.5.5 0 00.707-.708zM6.5 11A4.5 4.5 0 116.5 2a4.5 4.5 0 010 9z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={this.handleSearchInputChange}
                                    style={{ border: "none", outline: "none", backgroundColor: "#f0f0f0", flex: 1 }}
                                    placeholder="Search..."
                                />
                            </div>
                            <div style={{ display: "flex", alignItems: "center"}} >
                                {/* Iterate through each unique "generalType" */}
                                {sortedGeneralTypes.map((generalType, index) => (
                                    <DropdownButton
                                        key={index}
                                        variant="info"
                                        id={`dropdown-basic-button-${index}`}
                                        title={generalType}
                                        style={{ marginLeft: index > 0 ? '15px' : '30px' }}
                                    >
                                        {/* Iterate through genres under the current "generalType" */}
                                        {genreDataByGeneralType[generalType].map((genre, genreIndex) => (
                                            <Dropdown.Item
                                                key={genreIndex}
                                                onClick={() => this.handleOnClickGenre(genre)}
                                            >
                                                {genre}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                ))}
                            </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "30px" }}>
                    <div className="cart-icon d-flex justify-content-end" style={{ display: "flex", color: "#e2e8f0", paddingBottom: "15px", paddingTop: "10px"}}>
                        <button onClick={this.viewCart} className="btn btn-success" style={{ display: "flex", alignItems: "center", paddingTop: "5px", paddingBottom: "5px", paddingRight: "6px", paddingLeft: "6px", justifyItems: "center", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <FaShoppingCart size={24} color="white" />
                                <span style={{ marginLeft: "5px" }}>
                                    ({calculateTotalQuantity(this.state.cart.itemsInCart)})
                                </span>
                            </div>
                        </button>
                        </div>
                        </div>
                    </div>
                </div>
                <main className="content" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', paddingTop: "0px", paddingBottom: "100px", backgroundColor: "#16151a", backgroundSize: "cover" }}>
                    <div className="row">
                        <div className="col-14 col-lg-12 mx-auto p-0" style={{ minWidth: "1100px", maxWidth: "1100px" }}>
                            <div className="content" style={{ backgroundColor: "#16151a" }}>
                                {this.renderTabList()}
                                <ul className="list-group list-group-flush" style={{ backgroundColor: "#1f1e25", borderColor: "#141318" }}>
                                    {this.renderItems()}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {this.state.modal ? (
                        <Modal
                            activeItem={this.state.activeItem}
                            toggleAdd={this.toggleAdd}
                            onSave={this.handleSaveCart}
                        />
                    ) : null}
                    {this.state.cartModal ? (
                        <CartModal
                            activeCart={this.state.cart}
                            toggleCart={this.toggleCart}
                            onCheckOut={this.onCheckOut}
                        />
                    ) : null}
                    {this.state.purchaseModal ? (
                        <PurchaseModal
                            activeCart={this.state.cart}
                            togglePurchase={this.togglePurchase}
                            onPurchase={this.onPurchase}
                            togglePurchaseBack={this.togglePurchaseBack}
                        />
                    ) : null}
                    {this.state.purchaseSuccessModal ? (
                        <PurchaseSuccessModal
                            toggleModal={this.togglePurchaseSuccess}
                        />
                    ) : null}
                    {this.state.shippingPolicyModal ? (
                        <ShippingPolicyModal
                            toggleModal={this.toggleShippingPolicy}
                        />
                    ) : null}
                    {this.state.cancellationPolicyModal ? (
                        <CancellationPolicyModal
                            toggleModal={this.toggleCancellationPolicy}
                        />
                    ) : null}
                    {this.state.contactUsModal ? (
                        <ContactUsModal
                            toggleModal={this.toggleContactUs}
                        />
                    ) : null}
                    {this.state.aboutUsModal ? (
                        <AboutUsModal
                            toggleModal={this.toggleAboutUs}
                        />
                    ) : null}
                </main>
                <footer style={{ backgroundColor: "#1f1e25", height: "10%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", justifyContent: "flex-start", paddingTop: '15px' }}>
                        <div onClick={this.viewShippingPolicy}
                            onMouseEnter={() => this.handleMouseFooterEnter("ship")}
                            onMouseLeave={this.handleMouseFooterLeave}
                            style={{
                                color: "white", fontWeight: 400, paddingLeft: "30px", paddingRight: "30px", cursor: "pointer"
                            }}>
                            <p style={{
                                transition: "background-color 0.1s",
                                color: this.state.hoveredLink === "ship" ? "grey" : "white"
                            }}>Shipping Policy</p>
                        </div>
                        <div onClick={this.viewCancellationPolicy}
                            onMouseEnter={() => this.handleMouseFooterEnter("cancel")}
                            onMouseLeave={this.handleMouseFooterLeave}
                            style={{
                                color: "white", fontWeight: 400, paddingLeft: "30px", paddingRight: "30px", cursor: "pointer"
                            }}>
                            <p style={{
                                transition: "background-color 0.1s",
                                color: this.state.hoveredLink === "cancel" ? "grey" : "white"
                            }}>Cancellation Policy</p>
                        </div>
                        <div onClick={this.viewContactUs}
                            onMouseEnter={() => this.handleMouseFooterEnter("contact")}
                            onMouseLeave={this.handleMouseFooterLeave}
                            style={{
                                color: "white", fontWeight: 400, paddingLeft: "30px", paddingRight: "30px", cursor: "pointer"
                            }}>
                            <p style={{
                                transition: "background-color 0.1s",
                                color: this.state.hoveredLink === "contact" ? "grey" : "white"
                            }}>Contact</p>
                        </div>
                        <div onClick={this.viewAboutUs}
                           onMouseEnter={() => this.handleMouseFooterEnter("about")}
                           onMouseLeave={this.handleMouseFooterLeave}
                            style={{
                                color: "white", fontWeight: 400, paddingLeft: "30px", paddingRight: "30px", cursor: "pointer"
                            }}>
                            <p style={{
                                transition: "background-color 0.1s",
                                color: this.state.hoveredLink === "about" ? "grey" : "white"
                            }}>About Us</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "30px" }}>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: "30px" }}
                            onMouseEnter={() => this.handleMouseFooterEnter("insta")}
                            onMouseLeave={this.handleMouseFooterLeave}>
                            <FaInstagram className="social-icon" size={26} style={{ color: this.state.hoveredLink === "insta" ? "grey" : "white" } }/>
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: "30px", marginRight: "30px" }}
                            onMouseEnter={() => this.handleMouseFooterEnter("face")}
                            onMouseLeave={this.handleMouseFooterLeave}>
                            <FaFacebook className="social-icon" size={25} style={{ color: this.state.hoveredLink === "face" ? "grey" : "white" }} />
                        </a>
                    </div>
                </footer>
            </div>
        )
    }
}

export default App;