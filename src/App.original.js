import React, { useState } from 'react';
import './App.scss';

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([])

  function onChangeHandler(e) {
    setNewItem(e.target.value)
  }
  
  function addItem () {
    setItems([...items, {
      key: Date.now(),
      value: newItem
    }])
    setNewItem("")

  }

  return (
    <div className="c-app">
      <h1>TO DO App</h1>
      <input value={newItem} onChange={onChangeHandler} />
      <button 
        onClick={addItem} 
        disabled={newItem === ""}
      >
        Add New Item
      </button>
      <ul>
      {items.map(item => <li key={item.key}>{item.value}</li>)}
    </ul>
    </div>
  );
}

export default App;
