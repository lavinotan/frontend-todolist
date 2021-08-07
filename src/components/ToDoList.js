import React, { Component } from "react";
import InputArea from "./InputArea";
import ItemArea from "./ItemArea";
import TitleArea from "./TitleArea";


class ToDoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listNameInputDoubleClicked: false,
            inputList: {
                listName: this.props.listName
            },
            preList: {
                listName: ""
            }
        }
    }

    handleListNameDoubleClick = () => {
        this.setState({ listNameInputDoubleClicked: true });
        console.log("Double clicked");
    }

    handleBlur = () => {
        console.log("handleBlur called");

        this.setState({ listNameInputDoubleClicked: false });

        const { inputList, preList } = this.state;

        if (preList.listName !== inputList.listName) {
            this.setState({ preList: { ...this.state.preList, listName: inputList.listName } });
            this.props.passUpdatedList(inputList.listName, this.props.id);
            console.log("listName updated");
        }
    }

    handleInputListChange = (event) => {
        var inputText = event.target.value;
        this.setState({ inputList: { ...this.state.inputList, listName: inputText } });
    }

    render() {
        const items = this.props.items;
        const { listNameInputDoubleClicked, inputList } = this.state;

        const title = inputList.listName === "" ? "Double click to edit" : inputList.listName;

        return (
            <div className="container">

                <TitleArea
                    isDoubleClicked={listNameInputDoubleClicked}
                    listName={inputList.listName}
                    blur={this.handleBlur}
                    inputListChanged={this.handleInputListChange}
                    removeListClick={this.props.removeListClick}
                    listNameDoubleClick={this.handleListNameDoubleClick}
                    title={title}
                    id={this.props.id}
                />

                <div className="content">
                    <InputArea
                        onAdd={this.props.addItem}
                        listId={this.props.id}
                    />

                    <ul>
                        {items.map((item, index) => (
                            <ItemArea
                                key={index}
                                itemID={index}
                                itemName={item}
                                onChecked={() => { this.props.deleteItem(item, this.props.id) }}
                            />
                        ))}
                    </ul>
                </div>
            </div >
        );
    }
}

export default ToDoList;