import React, { useState, useReducer, useEffect } from 'react';
import './normalise.css';
import './App.scss';

const defaultState =  { 
  items: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateItem':
      return {
        items: state.items.map((item)=> {
          if (item.key === action.payload.key) {
            item = action.payload
          }
          return item
        }) 
      }
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
  const [isEditting, setIsEdditing] = useState({})
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

  const toggleIsEditting = (key) => {
    let _isEditting = true;
    if(isEditting[key]) {
      _isEditting = !isEditting[key]
    }
    isEditting[key] = _isEditting

    setIsEdditing({...isEditting,  [key]: _isEditting })
  }

  const handleUpdate = (e, _item) => {
    const keyCode = e.keyCode || e.which
    if (keyCode === 13) {
      const item = _item.value = e.target.value
      dispatch({type: 'updateItem', payload: item })
      toggleIsEditting(_item.key)
    }
  }

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
            {
              isEditting[item.key] === true ? (
                <input className='c-app__item-edit' 
                  defaultValue={item.value} 
                  onKeyDown={(e)=> {handleUpdate(e, item)}}/>
              ) : (
                <div 
                  className='c-app__item-value' 
                  onClick={()=> {toggleIsEditting(item.key)}}>{item.value}</div>
              )
            }
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;