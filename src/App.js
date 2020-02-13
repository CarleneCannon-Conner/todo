import React, { useState, useReducer, useEffect } from 'react';
import './App.scss';

const defaultState =  { items: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'addItem':
      return { 
        items: [ 
          ...state.items, 
          {  
            key: Date.now(),
            value: action.payload
          } 
        ]
      };

      case 'removeItem':
        return { 
          items: state.items.filter(item => item.key !== action.payload)
        };
    default:
      throw new Error();
  }
}
const App = () => {
  const [newItem, setNewItem] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);
  
  const onChangeHandler = (e) => setNewItem(e.target.value)

  useEffect(() => {
    console.table(state.items);
    setNewItem('')
  }, [state])


  return (
    <div className="c-app">
      <h1>TO DO App</h1>
      <input value={newItem} onChange={onChangeHandler} />
      <button 
        onClick={() => dispatch({ type: 'addItem', payload: newItem })} 
        disabled={newItem === ""}
      >
        Add New Item
      </button>
      <ul>
      {state.items.map(item => (
      <li key={item.key}>{item.value}
        <button onClick={()=> dispatch({ type: 'removeItem', payload: item.key })}>X</button>
      </li>
      ))}
    </ul>
    </div>
  );
}
export default App;