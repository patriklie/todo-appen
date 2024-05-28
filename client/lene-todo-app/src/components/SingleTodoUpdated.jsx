import React, { memo, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toggleComplete } from '../features/todo/todoSlice';

const SingleTodoUpdated = ({ todoId }) => {

    const dispatch = useDispatch();
    const [todo, setTodo] = useState(null);



    useEffect(() => {
        const fetchTodo = async () => {
            const response = await axios.get(`http://localhost:5000/todos/${todoId}`);
            setTodo(response.data);
        }
        fetchTodo();
    },[]);

    const handleToggle = async () => { 
        try {
            const response = await axios.put(`http://localhost:5000/todos/${todo._id}/toggle`, {
                todo
            })
            dispatch(toggleComplete(response.data))
            setTodo(response.data);
        } catch(error) {
            console.error("Feil ved oppdatering av toggle complete:", error)
        }
    }
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/todos/${todo._id}`)

            toast.error(`Slettet "${todo.name}"`, {
                position: "bottom-left",
                autoClose: 2000,
            });

        } catch(error) {
            console.log("Feil ved sletting av todo:", error)
        }
    }

    if (!todo) {
        return null;
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
        </div>
    </div>
  )
}

export default SingleTodoUpdated