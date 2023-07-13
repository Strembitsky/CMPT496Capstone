import React from "react";
import Modal from "./components/Modal";
import CartModal from "./components/CartModal";
//import axios from "axios";
import { FaShoppingCart } from 'react-icons/fa';
import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa';

document.body.style.backgroundColor = "#16151a";

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
        cartView: false,
        itemCount: 0,
        hoveredItem: null,
        selectedFilters: ["In Stock", "Out of Stock"],
        availableFilters: ["In Stock", "Out of Stock", "Size L", "Size M", "Size S"],
        selectedSorts: ["Name"],
        availableSorts: ["Name", "Price", "Size", "Release Date"],
        sortType: ["a"]
    };

    async componentDidMount() {
        try {
            const res = await fetch("http://localhost:8000/api/popTopics/");
            const popTopicList = await res.json();
            const storedCart = localStorage.getItem('cart');
            const cart = storedCart ? JSON.parse(storedCart) : [];
            this.setState({
                popTopicList
            }, () => {
                const filteredItems = this.filterItems();
                this.setState({
                    itemCount: filteredItems.length,
                    cart: cart
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    // function that filters the items based on selected filters from the website
    filterItems = () => {
        let inStockFilter = false;
        let outStockFilter = false;
        
        if (this.state.selectedFilters.includes("In Stock")) {
            inStockFilter = true;
        }

        if (this.state.selectedFilters.includes("Out of Stock")) {
            outStockFilter = true;
        }

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

        // Filter the items based on the conditions
        const filteredItems = this.state.popTopicList.filter(item => {
            const sizeCondition = selectedSizes.length === 0 ? true : selectedSizes.includes(item.size);
            const stockCondition = (inStockFilter && outStockFilter) ? true : (inStockFilter ? !item.outOfStock : (outStockFilter ? item.outOfStock : true));
            return sizeCondition && stockCondition;
        });
        return filteredItems;
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

    // function that submits an item from the frontend to the backend
    //handleSubmit = async (item) => {
    //    this.toggleAdd();
    //    if (item.id) {
    //        await axios.put(`http://localhost:8000/api/popTopics/${item.id}/`, item);
    //    } else {
    //        await axios.post("http://localhost:8000/api/popTopics/", item);
    //    }
    //    this.fetchItems(); // Refresh the list of items
    //};

    handleSaveCart = async (item) => {
        this.toggleAdd();
        let foundItem = false;

        if (this.state.cart.itemsInCart.length !== 0) {
            for (let tempItem of this.state.cart.itemsInCart) {
                if (item.id === tempItem.cartItem.id) {
                    tempItem.quantity += 1;
                    foundItem = true;
                    break;
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

    viewCart = () => {
        const storedCart = localStorage.getItem('cart');
        const cart = storedCart ? JSON.parse(storedCart) : [];
        this.setState({ cart: cart, cartModal: !this.state.cartModal });
    }

    calculateTotalQuantity(itemsInCart) {
        return itemsInCart.reduce((total, item) => total + item.quantity, 0);
    };

    onCheckOut = () => {
        console.log("BRING USER TO PURCHASING PAGE");
    }

    // function that deletes an item from the frontend and the backend.
    // not currently used.
    //handleDelete = async (item) => {
    //    if (item.id) {
    //        await axios.delete(`http://localhost:8000/api/popTopics/${item.id}/`, item);
    //    } else {
    //        await axios.post("http://localhost:8000/api/popTopics/", item);
    //    }
    //    this.fetchItems(); // Refresh the list of items
    //};

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

    renderTabList = () => {
        //localStorage.clear();
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
                <div className="cart-icon d-flex justify-content-end" style={{ display: "flex", color: "#e2e8f0", paddingBottom: "15px" }}>
                    <button onClick={this.viewCart} className="btn btn-success" style={{ display: "flex", alignItems: "center", paddingTop: "5px", paddingBottom: "5px", paddingRight: "6px", paddingLeft: "6px", justifyItems: "center", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FaShoppingCart size={24} color="white" />
                            <span style={{ marginLeft: "5px" }}>
                                ({this.calculateTotalQuantity(this.state.cart.itemsInCart)})
                            </span>
                        </div>
                    </button>
                </div>
                <div className="filter-sort-container d-flex">
                    <div className="filter-container col-6">
                        <h3 style={{ color: "#e2e8f0" }}>Filters</h3>
                        {this.state.availableFilters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() =>
                                    this.state.selectedFilters.includes(filter)
                                        ? this.removeFilter(filter) : this.addFilter(filter)
                                }
                                style={
                                    this.state.selectedFilters.includes(filter)
                                        ? activeButtonStyle : buttonStyle
                                }
                            >
                                {filter}
                            </button>
                        ))}
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
       
        return newItems.map(item => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{
                    cursor: "pointer",
                    transition: "background-color 0.1s",
                    backgroundColor: this.state.hoveredItem === item.id ? "#25242b" : "transparent",
                    borderColor: "#141318"
                }}
                onMouseEnter={() => this.handleMouseEnter(item.id)}
                onMouseLeave={this.handleMouseLeave}
                onClick={() => this.expandItem(item)}
            >
                <span
                    className={`popTopic-title mr-2`}
                    title={item.title}
                >
                    <div className="d-flex align-items-center"
                        style={{ cursor: "pointer" }}>
                        <img src={item.image} alt="" className="mr-3" style={{ width: '70px', height: '100px', objectFit: "cover", marginRight: '15px'}} />
                        <div>
                            <h3 style={{color: "#e2e8f0", paddingLeft: "20px"}}>{item.genre + " - " + item.title}</h3>
                            <h5 style={{ color: "#718096", paddingLeft: "20px", marginRight: "50px" }}>{"Size " + item.size + " - " + (item.description.length > 200 ? `${item.description.slice(0, 197)}...` : item.description)}</h5>
                        </div>
                    </div>
                </span>
                <span className="price" style={{ color: "#29ff74", paddingRight: "20px", paddingLeft: "20px", fontWeight: "bold", whiteSpace: "nowrap"}}>{"$" + item.price + " USD"}</span>
            </li>
        ));
    };

    render() {
        return (
            <div className="app-header">
                <main className="content" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', paddingTop: "0px", paddingBottom: "100px", backgroundColor: "#16151a", backgroundSize: "cover" }}>
                <div className="row">
                    <div className="col-14 col-lg-12 mx-auto p-0" style={{minWidth: "1100px", maxWidth: "1100px"} }>
                        <div className="content" style={{ backgroundColor: "#16151a"}}>
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
                        toggle={this.toggleAdd}
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

                </main>
            </div>

        )
    }
}

export default App;