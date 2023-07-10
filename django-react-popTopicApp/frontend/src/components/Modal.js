import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label

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
    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>PopTopic Item</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={this.state.activeItem.title}
                                onChange={this.handleChange}
                                placeholder="Enter PopTopic Title"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Enter PopTopic description"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="genre">Genre</Label>
                            <Input
                                type="text"
                                name="genre"
                                value={this.state.activeItem.genre}
                                onChange={this.handleChange}
                                placeholder="Enter PopTopic genre"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="size">Size</Label>
                            <Input
                                type="text"
                                name="size"
                                value={this.state.activeItem.size}
                                onChange={this.handleChange}
                                placeholder="Enter PopTopic size (S/M/L)"
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label for="outOfStock">
                                <Input
                                    type="checkbox"
                                    name="outOfStock"
                                    checked={this.state.activeItem.outOfStock}
                                    onChange={this.handleChange}
                                />
                                Out of Stock
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}