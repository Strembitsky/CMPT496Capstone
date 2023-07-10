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
            outOfStock: false
        },
        popTopicList: [],
        modal: false
    };

    async componentDidMount() {
        try {
            const res = await fetch("http://localhost:8000/api/popTopics/");
            const popTopicList = await res.json();
            this.setState({
                popTopicList
            });
        } catch (e) {
            console.log(e);
        }
    }

    toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal
        }));
    };

    handleSubmit = async (item) => {
        this.toggle();
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
            this.setState({
                popTopicList
            });
        } catch (e) {
            console.log(e);
        }
    };

    createItem = () => {
        const item = { title: "", genre: "", size: "", description: "", outOfStock: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    displayOutOfStock = status => {
        if (status) {
            return this.setState({ viewOutOfStock: true });
        }
        return this.setState({ viewOutOfStock: false });
    };
    renderTabList = () => {
        return (
            <div className="my-5 tab-list">
                <div className="button-container">
                    <button
                        onClick={() => this.displayOutOfStock(true)}
                        className={this.state.viewOutOfStock ? "active" : ""}
                    >
                        Out of Stock
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        onClick={() => this.displayOutOfStock(false)}
                        className={this.state.viewOutOfStock ? "" : "active"}
                    >
                        In Stock
                    </button>
                </div>
                <p></p>
                <p>{this.state.viewOutOfStock ? "Viewing Out of Stock items" : "Viewing In Stock Items"}</p>
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
            >
                <span
                    className={`popTopic-title mr-2 ${this.state.viewOutOfStock ? "outOfStock-popTopic" : ""
                        }`}
                    title={item.title}
                >
                    <h1>{item.genre + " - " + item.title}</h1>
                    <h5>{"Size " + item.size + " - " + item.description}</h5>
                </span>
                <button className="btn btn-danger" onClick={() => this.handleDelete(item)}>
                    X
                </button>
            </li>
        ));
    };

    render() {
        return (
            <main className="content">
                <h1 className="text-white text-uppercase text-center my-4">PopTopic App</h1>
                <div className="row">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <div className="">
                                <button onClick={this.createItem} className="btn btn-success">Add PopTopic</button>
                            </div>
                            {this.renderTabList()}
                            <ul className="list-group list-group-flush">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>
                {this.state.modal ? (
                    <Modal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>
        )
    }
}

export default App;