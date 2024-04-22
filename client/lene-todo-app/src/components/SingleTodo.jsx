import React from 'react'
import { removeTodo, toggleComplete, moveUp, moveDown } from '../features/todo/todoSlice';
import { useDispatch } from 'react-redux';


const SingleTodo = ({ todo }) => {

    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleComplete(todo))
    }

    const handleClick = () => {
        dispatch(removeTodo({ id: todo.id  }))
    }

    const handleUp = () => {
        dispatch(moveUp({ id: todo.id }))
    }

    const handleDown = () => {
        dispatch(moveDown({ id: todo.id }))
    }

    console.log(todo)
  return (
    <div className={`single-todo-container ${todo.completed ? "todo-active" : ""}`}>
        <h3>{todo.name}</h3>
        <p>{todo.description}</p>
        <p className='date'>Opprettet: {new Date(todo.created_at).toLocaleString()}</p>
        <span onClick={() => handleClick()} className="material-symbols-outlined icons close" id="close">close</span>
        <div className="icons-container">
            {todo.completed ? <span onClick={() => handleToggle()} className="material-symbols-outlined checkmark">check_box</span> : <span onClick={() => handleToggle()} className="material-symbols-outlined checkmark">check_box_outline_blank</span> }
            <div className="arrow-container">
                <span onClick={handleUp} class="material-symbols-outlined icons">arrow_upward</span>
                <span onClick={handleDown} class="material-symbols-outlined icons">arrow_downward</span>
            </div>
        </div>
    </div>
  )
}

export default SingleTodo