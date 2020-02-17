import React, { useState, useReducer, useEffect } from 'react';
import classNames from 'classnames';
import './normalise.css';
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
  
  const onChangeHandler = (e) => setNewItem(e.target.value);

  const onKeyUpHandler = (e) => {
    if (e.keyCode == 13) {
      dispatch({ type: 'addItem', payload: newItem })
    }
  }

  useEffect(() => {
    console.table(state.items);
    setNewItem('')
  }, [state])


  // TODO onClick item-value, switch it to input
  // TODO click update, update value and switch item-value back to div


  return (
    <div className="c-app">
      <div className='c-app__container'>
        <h1>TO DO App</h1>
        <input 
        className='c-app__input'
        value={newItem} 
        onChange={onChangeHandler} 
        onKeyUp={onKeyUpHandler} />
        <button 
          onClick={() => dispatch({ type: 'addItem', payload: newItem })} 
          className='c-app__btn c-app__btn--primary c-app__btn--add'
          disabled={newItem === ""}
        >
          Add New Item
        </button>
          <div>
          {state.items.map(item => (
          <div 
            key={item.key}
            className='c-app__card'
          >
            <div className="c-app__actions-container">
              <button 
                onClick={()=> dispatch({ type: 'removeItem', payload: item.key })}
                className='c-app__btn c-app__btn--danger'>Delete</button>
            </div>
            <div className='c-app__item-value'>{item.value}</div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;