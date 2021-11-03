import './App.css';
import React, { Component } from 'react';
import ToDoList from './components/ToDoList';
import Login from './components/auth/Login';
import Menu from './components/Menu';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const timeDelay = 10;
const auth = getAuth();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allLists: [],
      isSignedIn: false || window.localStorage.getItem('auth') === 'true',
      token: "",
      userName: ""
    };

    this.addList = this.addList.bind(this);

  }

  componentDidMount() {
    //console.log("componentDidMount called");
    onAuthStateChanged(auth, (user) => {
      //console.log("onAuthStateChanged called");
      if (user) {
        this.setState({ userName: user.displayName });
        this.setState({ isSignedIn: true });
        window.localStorage.setItem('auth', 'true');
        user.getIdToken().then((token) => {
          this.setState({ token: token });
          this.getItemsFromAPI();
          //console.log("getIdToken called");
        });
      }
    })
  }

  signOutfromApp = () => signOut(auth).then(() => {
    //console.log("user signout");
    this.setState({ isSignedIn: false, token: "" });
    window.localStorage.setItem('auth', 'false');
  }).catch((error) => {
    console.log(error);
  });

  getItemsFromAPI() {
    const { token } = this.state;
    //console.log("getItemsFromAPI called");
    //https://tranquil-ocean-84661.herokuapp.com/api
    fetch("https://tranquil-ocean-84661.herokuapp.com/api", {
      headers: {
        Authorization: token,
        'Access-Control-Allow-Origin': *
      }
    })
      .then(res => res.json())
      //.then(res => console.log(res))
      .then(data => this.setState({ allLists: data }))
      .catch(err => console.error(err))
  }

  addItem = (e, item) => {
    const { token } = this.state;
    e.preventDefault();
    // console.log("itemToAdd: " + item.listId);
    //https://tranquil-ocean-84661.herokuapp.com/api/add
    fetch("https://tranquil-ocean-84661.herokuapp.com/api/add", {
      method: 'POST',
      body: JSON.stringify({
        "itemName": item.itemName,
        "listId": item.listId,
      }),
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*', Authorization: token }
    })
      .then(() => {
        const timer = setTimeout(() => this.getItemsFromAPI(), timeDelay);
        return () => clearTimeout(timer);
      })
      .catch(err => console.error(err))
  }

  deleteItem = (itemName, listId) => {
    const { token } = this.state;
    //console.log("itemToDelete: " + itemName + ", listId: " + listId);
    //https://tranquil-ocean-84661.herokuapp.com/api/delete
    fetch("https://tranquil-ocean-84661.herokuapp.com/api/delete", {
      method: 'POST',
      body: JSON.stringify({
        "itemName": itemName,
        "listId": listId
      }),
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*', Authorization: token }
    })
      .then(() => {
        const timer = setTimeout(() => this.getItemsFromAPI(), timeDelay);
        return () => clearTimeout(timer);
      })
      .catch(err => console.error(err))
  }

  addList = _ => {
    const { token } = this.state;
    //console.log("addList called");
    //https://tranquil-ocean-84661.herokuapp.com/api/addList
    fetch("https://tranquil-ocean-84661.herokuapp.com/api/addList", {
      method: 'POST',
      body: JSON.stringify({
        "listName": "",
        "items": []
      }),
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*', Authorization: token }
    })
      .then(() => {
        const timer = setTimeout(() => this.getItemsFromAPI(), timeDelay);
        return () => clearTimeout(timer);
      })
      .catch(err => console.error(err))
  }

  removeList = (id) => {
    const { token } = this.state;
    //console.log("listToRemove id: " + id);
    //https://tranquil-ocean-84661.herokuapp.com/api/removeList
    fetch("https://tranquil-ocean-84661.herokuapp.com/api/removeList", {
      method: 'POST',
      body: JSON.stringify({
        "id": id
      }),
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*', Authorization: token }
    })
      .then(() => {
        const timer = setTimeout(() => this.getItemsFromAPI(), timeDelay);
        return () => clearTimeout(timer);
      })
      .catch(err => console.error(err))
  }

  updateListName = (list, id) => {
    const { token } = this.state;
    //console.log("updatedList: " + list + ", listId: " + id);
    //https://tranquil-ocean-84661.herokuapp.com/api/updateList
    fetch("https://tranquil-ocean-84661.herokuapp.com/api/updateList", {
      method: 'POST',
      body: JSON.stringify({
        "listId": id,
        "listName": list
      }),
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*', Authorization: token }
    })
      .then(() => {
        const timer = setTimeout(() => this.getItemsFromAPI(), timeDelay);
        return () => clearTimeout(timer);
      })
      .catch(err => console.error(err))
  }

  render() {

    const { allLists, isSignedIn, userName } = this.state;

    return (
      <div>
        <div className="top">
          {isSignedIn ? (<Menu user={userName} signout={this.signOutfromApp} />) : ""}
          <h1>Notes & To-do-list</h1>
        </div>

        <div className="main">
          {isSignedIn ? (
            <div>
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
                  <button
                    id="addListButton"
                    onClick={() => { this.addList() }}
                    title="Click to add list">+</button>
                </div>
              </div></div>) : (<Login />)}
        </div>

        <div className="footer">
          <p>&copy; by Lavino Tân</p>
        </div>
      </div>

    );
  }
}

export default App;
