import React, { useState } from 'react';
import './App.scss';

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([])

  function tsToTime(ts) {
    let  date = new Date(ts * 1000);
    let hh = date.getHours() > 10 ? date.getHours() : "0" + date.getHours();
    let mm = date.getMinutes() > 0 ? date.getMinutes() : "0" + date.getMinutes();
    let ss =  date.getSeconds() > 0 ?  date.getSeconds() : "0" + date.getSeconds();

    return hh + ':' + mm + ':' + ss;
  } 

  function onChangeHandler(e) {
    setNewItem(e.target.value)
  }
  

  function addItem () {
    setItems([...items, {
      key: Date.now(),
      value: newItem
    }])

  }

  return (
    <div className="c-app">
      <h1>TO DO App</h1>
      <input defaultValue={newItem} onChange={onChangeHandler} />
      <button 
        onClick={addItem} 
        disabled={newItem === ""}
      >
        Add New Item
      </button>
      <ul>
      {items.map(item => <li key={item.key}>{tsToTime(item.key)}: {item.value}</li>)}
    </ul>
    </div>
  );
}

export default App;
