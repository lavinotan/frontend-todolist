import React, { Component } from "react";

class InputArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputItem: {
                listId: this.props.listId || "0",
                itemName: ""
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        this.setState({ inputItem: { ...this.state.inputItem, itemName: event.target.value } });
    }

    render() {
        const { inputItem } = this.state;
        return (
            <div className="form">
                <input
                    type="text"
                    value={inputItem.itemName}
                    onChange={this.handleInputChange}
                    placeholder="Enter list here"
                />
                <button
                    onClick={() => {
                        this.props.onAdd(inputItem);
                    }}>
                    <span>Add</span>
                </button>
            </div>
        );

    }

}

export default InputArea;