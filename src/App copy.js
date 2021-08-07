import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      inputItem: {
        id: "",
        itemName: "Life is Great!"
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
    this.getItemsFromAPI();
  }

  getItemsFromAPI() {
    fetch("http://localhost:4000/testAPI")
      .then(res => res.json())
      .then(res => this.setState({ items: res }))
      .catch(err => console.error(err))
    //.then(res => this.setState({ apiResponse: res }));
  }

  handleInputChange = (event) => {
    this.setState({ inputItem: { ...this.inputItem, itemName: event.target.value } });
  }

  addItem = _ => {
    const { inputItem } = this.state;
    fetch("http://localhost:4000/testAPI/add", {
      method: 'POST',
      body: JSON.stringify({ itemName: inputItem.itemName }),
      headers: { 'content-type': 'application/json' }
    })
      .then(this.getItemsFromAPI())
      .catch(err => console.error(err))
  }

  deleteItem = (id) => {
    fetch("http://localhost:4000/testAPI/delete", {
      method: 'POST',
      body: JSON.stringify({ id: id }),
      headers: { 'content-type': 'application/json' }
    })
      .then(this.getItemsFromAPI())
      .catch(err => console.error(err))
  }

  render() {

    const { items, inputItem } = this.state;

    return (
      <div className="container">
        <div className="heading">
          <h1>To-Do List</h1>
        </div>

        <div className="form">
          <input type="text" value={inputItem.itemName} onChange={this.handleInputChange} />
          <button onClick={this.addItem}><span>Add</span></button>
        </div>

        <ul>
          {Object.keys(items).map((index) => (
            <div key={items[index].id} onClick={() => { this.deleteItem(items[index].id) }}>
              <li>
                {items[index].itemName}
              </li>
            </div>
          ))}
        </ul>
      </div >
    );
  }
}


export default App;
