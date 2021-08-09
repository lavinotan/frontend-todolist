import './App.css';
import React, { Component } from 'react';

import ToDoList from './components/ToDoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allLists: []
    };

    this.addList = this.addList.bind(this);
  }

  componentDidMount() {
    this.getItemsFromAPI();
  }

  componentWillMount() {
    this.getItemsFromAPI();
  }

  getItemsFromAPI() {
    fetch("https://tranquil-ocean-84661.herokuapp.com/api")
      .then(res => res.json())
      //.then(res => console.log(res))
      .then(data => this.setState({ allLists: data }))
      .catch(err => console.error(err))
  }

  addItem = (item) => {
    console.log("itemToAdd: " + item.listId);
    fetch("https://tranquil-ocean-84661.herokuapp.com/api/add", {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' }
    })
      .then(this.getItemsFromAPI())
      .catch(err => console.error(err))
  }

  deleteItem = (itemName, listId) => {
    console.log("itemToDelete: " + itemName + ", listId: " + listId);
    fetch("https://tranquil-ocean-84661.herokuapp.com/api/delete", {
      method: 'POST',
      body: JSON.stringify({
        "itemName": itemName,
        "listId": listId
      }),
      headers: { 'content-type': 'application/json' }
    })
      .then(this.getItemsFromAPI())
      .catch(err => console.error(err))
  }

  addList = _ => {
    fetch("https://tranquil-ocean-84661.herokuapp.com/api/addList", {
      method: 'POST',
      body: JSON.stringify({
        "listName": "",
        "items": []
      }),
      headers: { 'content-type': 'application/json' }
    })
      .then(this.getItemsFromAPI())
      .catch(err => console.error(err))
  }

  removeList = (id) => {
    console.log("listToRemove id: " + id);
    fetch("https://tranquil-ocean-84661.herokuapp.com/api/removeList", {
      method: 'POST',
      body: JSON.stringify({
        "id": id
      }),
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .then(this.getItemsFromAPI())
      .catch(err => console.error(err))
  }

  updateListName = (list, id) => {
    console.log("updatedList: " + list + " listId: " + id);
    fetch("https://tranquil-ocean-84661.herokuapp.com/api/updateList", {
      method: 'POST',
      body: JSON.stringify({
        "listId": id,
        "listName": list
      }),
      headers: { 'content-type': 'application/json' }
    })
      .then(this.getItemsFromAPI())
      .catch(err => console.error(err))
  }

  render() {

    const { allLists } = this.state;

    return (
      <div>
        <div className="top">
          <h1>List Note of Life</h1>
        </div>

        <div className="main">
          <div className="listNoteWrapper">
            {allLists.map((list) =>
              <ToDoList
                key={list.id}
                id={list.id}
                listName={list.listName}
                items={list.items}
                addItem={this.addItem}
                deleteItem={this.deleteItem}
                removeListClick={this.removeList}
                passUpdatedList={this.updateListName}
              />)}

            <div className="addList">
              {allLists.length === 0 ? <h1>Add List</h1> : ""}
              <button id="addListButton" onClick={() => { this.addList() }}>+</button>
            </div>
          </div>
        </div>

        <div className="footer">
          <p>&copy; by Lavino Tân</p>
        </div>
      </div>

    );
  }
}

export default App;
