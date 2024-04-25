import React, { memo } from 'react'
import { removeTodo, toggleComplete, moveUp, moveDown } from '../features/todo/todoSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const SingleTodo = memo(function SingleTodo ({ todo }) {

    const dispatch = useDispatch();

    const handleToggle = async () => {
        
        try {
            const updatedTodo = await axios.put(`http://localhost:5000/todos/${todo._id}/toggle`, {
                completed: todo.completed
            })
            dispatch(toggleComplete(updatedTodo.data))

        } catch(error) {
            console.error("Feil ved oppdatering av toggle complete:", error)
        }
    }

    const handleDelete = async () => {

        try {
            await axios.delete(`http://localhost:5000/todos/${todo._id}`)

            dispatch(removeTodo({ id: todo._id  }))
        } catch(error) {
            console.log("Feil ved sletting av todo:", error)
        }

    }

    const handleUp = () => {
        dispatch(moveUp({ id: todo._id }))
    }

    const handleDown = () => {
        dispatch(moveDown({ id: todo._id }))
    }

    const formatertDato = new Date(todo.createdAt).toLocaleString();
    const datoOpprettet = formatertDato.split(",")[0].trim()
    const tidspunktOpprettet = formatertDato.split(",")[1].trim().slice(0, 5);

  return (
    <div className={`single-todo-container ${todo.completed ? "todo-active" : ""}`}>
        <h3>{todo.name}</h3>
        <p>{todo.description}</p>
        <p className='date'>Opprettet: {datoOpprettet} klokken {tidspunktOpprettet}</p>
        <span onClick={handleDelete} className="material-symbols-outlined icons close" id="close">close</span>
        <div className="icons-container">
            {todo.completed ? <span onClick={() => handleToggle()} className="material-symbols-outlined checkmark">check_box</span> : <span onClick={() => handleToggle()} className="material-symbols-outlined checkmark">check_box_outline_blank</span> }
            <div className="arrow-container">
                <span onClick={handleUp} className="material-symbols-outlined icons">arrow_upward</span>
                <span onClick={handleDown} className="material-symbols-outlined icons">arrow_downward</span>
            </div>
        </div>
    </div>
  )
}
)
export default SingleTodo