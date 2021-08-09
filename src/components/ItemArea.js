import React, { Component } from "react";

class ItemArea extends Component {

    render() {
        return (
            <div onClick={() => { this.props.onChecked(this.props.itemName) }}>
                <li title="Click to remove item from the list">
                    {this.props.itemName}
                </li>
            </div >
        );
    }
}

export default ItemArea;