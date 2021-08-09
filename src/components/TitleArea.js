import React, { Component } from "react";

class TitleArea extends Component {
    render() {
        return (
            <div className="heading">
                <button onClick={() => { this.props.removeListClick(this.props.id) }}>x</button>
                {this.props.isDoubleClicked ?
                    <input
                        value={this.props.listName}
                        onChange={(e) => { this.props.inputListChanged(e) }}
                        onBlur={this.props.blur}
                        autoFocus
                    />
                    :
                    <div
                        className="listTitle"
                        onDoubleClick={this.props.listNameDoubleClick}
                        title="Double click to edit"
                    >
                        {this.props.title}
                    </div>
                }
            </div>
        );
    }
}

export default TitleArea;