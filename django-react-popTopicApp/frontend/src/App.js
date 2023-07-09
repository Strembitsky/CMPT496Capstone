import React, { Component } from "react"
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
    state = {
        viewCompleted: false,
        activeItem: {
            title: "",
            description: "",
            completed: false
        },
        popTopicList: []
    };

    async componentDidMount() {
        try {
            const res = await fetch('http://localhost:8000/api/popTopics/');
            const popTopicList = await res.json();
            this.setState({
                popTopicList
            });
        } catch (e) {
            console.log(e);
        }
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    //Responsible for saving the task
    handleSubmit = item => {
        this.toggle();
        if (item.id) {
            axios
                .put(`http://localhost:8000/api/popTopics/${item.id}/`, item)
            return;
        }
        axios
            .post("http://localhost:8000/api/popTopics/", item)
    };

    createItem = () => {
        const item = { title: "", description: "", completed: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    displayCompleted = status => {
        if (status) {
            return this.setState({ viewCompleted: true });
        }
        return this.setState({ viewCompleted: false });
    };
    renderTabList = () => {
        return (
            <div className="my-5 tab-list">
                <button
                    onClick={() => this.displayCompleted(true)}
                    className={this.state.viewCompleted ? "active" : ""}
                >
                    Complete
                </button>
                <button
                    onClick={() => this.displayCompleted(false)}
                    className={this.state.viewCompleted ? "" : "active"}
                >
                    Incomplete
                </button>
            </div>
        );
    };

    renderItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.popTopicList.filter(
            item => item.completed === viewCompleted
        );
        return newItems.map(item => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                    className={`popTopic-title mr-2 ${this.state.viewCompleted ? "completed-popTopic" : ""
                        }`}
                    title={item.description}
                >
                    {item.title}
                </span>
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