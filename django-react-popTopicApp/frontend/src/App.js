import React from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends React.Component {
    state = {
        viewOutOfStock: false,
        activeItem: {
            title: "",
            description: "",
            genre: "",
            size: "",
            image: "",
            price: 0,
            outOfStock: false
        },
        popTopicList: [],
        modal: false,
        itemCount: 0,
        hoveredItem: null
    };

    async componentDidMount() {
        try {
            const res = await fetch("http://localhost:8000/api/popTopics/");
            const popTopicList = await res.json();
            this.setState({
                popTopicList
            }, () => {
                const { viewOutOfStock } = this.state;
                const filteredItems = popTopicList.filter(
                    item => item.outOfStock === viewOutOfStock
                );
                this.setState({
                    itemCount: filteredItems.length
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    toggleAdd = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal
        }));
    };

    handleSubmit = async (item) => {
        this.toggleAdd();
        if (item.id) {
            await axios.put(`http://localhost:8000/api/popTopics/${item.id}/`, item);
        } else {
            await axios.post("http://localhost:8000/api/popTopics/", item);
        }
        this.fetchItems(); // Refresh the list of items
    };

    handleDelete = async (item) => {
        if (item.id) {
            await axios.delete(`http://localhost:8000/api/popTopics/${item.id}/`, item);
        } else {
            await axios.post("http://localhost:8000/api/popTopics/", item);
        }
        this.fetchItems(); // Refresh the list of items
    };

    fetchItems = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/popTopics/");
            const popTopicList = await res.json();
            const { viewOutOfStock } = this.state;
            const filteredItems = popTopicList.filter(
                item => item.outOfStock === viewOutOfStock
            );
            this.setState({
                popTopicList,
                itemCount: filteredItems.length
            });
        } catch (e) {
            console.log(e);
        }
    };

    handleMouseEnter = (itemId) => {
        this.setState({ hoveredItem: itemId });
    };

    handleMouseLeave = () => {
        this.setState({ hoveredItem: null });
    };

    expandItem = (item) => {
        console.log(item);
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    displayOutOfStock = status => {
        if (status) {
            this.setState({ viewOutOfStock: true }, () => {
                this.fetchItems();
            });
        } else {
            this.setState({ viewOutOfStock: false }, () => {
                this.fetchItems();
            });
        }
    };
    renderTabList = () => {
        const { viewOutOfStock, itemCount } = this.state;
        const buttonStyle = {
            padding: '8px 16px',
            backgroundColor: '#718096',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '4px'
        };

        const activeButtonStyle = {
            ...buttonStyle,
            backgroundColor: '#3e68db'
        };

        return (
            <div className="my-5 tab-list">
                <div className="button-container">
                    <button
                        onClick={() => this.displayOutOfStock(true)}
                        style={viewOutOfStock ? activeButtonStyle : buttonStyle}
                    >
                        Out of Stock
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        onClick={() => this.displayOutOfStock(false)}
                        style={viewOutOfStock ? buttonStyle : activeButtonStyle}
                    >
                        In Stock
                    </button>
                </div>
                <p></p>
                <p style={{ color: "#9aa6b8"} }>{this.state.viewOutOfStock ? "# of Items: (" + itemCount + ')' : "# of Items: (" + itemCount + ')'}</p>
            </div>
        );
    };


    renderItems = () => {
        const { viewOutOfStock } = this.state;
        const newItems = this.state.popTopicList.filter(
            item => item.outOfStock === viewOutOfStock
        );
       
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
            >
                <span
                    className={`popTopic-title mr-2 ${this.state.viewOutOfStock ? "outOfStock-popTopic" : ""
                        }`}
                    title={item.title}
                >
                    <div className="d-flex align-items-center"
                        onClick={() => this.expandItem(item)}
                        style={{ cursor: "pointer" }}>
                        <img src={item.image} alt="" className="mr-3" style={{ width: '70px', height: '100px', objectFit: "cover", marginRight: '15px'}} />
                        <div>
                            <h1 style={{color: "#e2e8f0", paddingLeft: "20px"}}>{item.genre + " - " + item.title}</h1>
                            <h5 style={{ color: "#718096", paddingLeft: "20px" }}>{"Size " + item.size + " - " + (item.description.length > 200 ? `${item.description.slice(0, 197)}...` : item.description)}</h5>
                        </div>
                    </div>
                </span>
            </li>
        ));
    };

    render() {
        return (
            <main className="content" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', paddingTop: "100px", paddingBottom: "100px", backgroundColor: "#16151a" }}>
                <div className="row">
                    <div className="col-14 col-lg-12 mx-auto p-0" style={{minWidth: "1100px", maxWidth: "1100px"} }>
                        <div className="content" style={{ backgroundColor: "#16151a"}}>
                            <div className="">
                                <button onClick={this.resetFilters} className="btn btn-success">Reset Filters</button>
                            </div>
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
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>
        )
    }
}

export default App;