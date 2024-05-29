import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toggleTodo, deleteTodoFromList } from '../features/list/listSlice';


const SingleTodoUpdated = memo(function SingleTodoUpdated({ todo }) {

    const todos = useSelector(state => state.list.lists);

    const dispatch = useDispatch();
    const [localTodo, setLocalTodo] = useState(todo);

   /*  useEffect(() => {
        const fetchTodo = async () => {
            const response = await axios.get(`http://localhost:5000/todos/${todoId}`);
            setTodo(response.data);
        }
        fetchTodo();
    },[]); */

    const handleToggle = async () => { 
        console.log("Dette sender jeg i body til API toggle: ", localTodo)
        try {
            const response = await axios.put(`http://localhost:5000/todos/${localTodo._id}/toggle`, {
                localTodo
            })
            dispatch(toggleTodo(response.data))
            setLocalTodo(response.data);
        } catch(error) {
            console.error("Feil ved oppdatering av toggle complete:", error)
        }
    }
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/todos/${localTodo._id}`)

            dispatch(deleteTodoFromList(localTodo))

            toast.error(`Slettet "${localTodo.name}"`, {
                position: "bottom-left",
                autoClose: 2000,
            });

        } catch(error) {
            console.log("Feil ved sletting av todo:", error)
        }
    }

    if (!localTodo) {
        return null;
    }

    const formatertDato = new Date(localTodo.createdAt).toLocaleString();
    const datoOpprettet = formatertDato.split(",")[0].trim()
    const tidspunktOpprettet = formatertDato.split(",")[1].trim().slice(0, 5);

  return (
    <div className={`single-todo-container ${localTodo.completed ? "todo-active" : ""}`}>
        <h3>{localTodo.name}</h3>
        <p>{localTodo.description}</p>
        <p className='date'>Opprettet: {datoOpprettet} klokken {tidspunktOpprettet}</p>
        <span onClick={handleDelete} className="material-symbols-outlined icons close" id="close">close</span>
        <div className="icons-container">
            {localTodo.completed ? <span onClick={() => handleToggle()} className="material-symbols-outlined checkmark">check_box</span> : <span onClick={() => handleToggle()} className="material-symbols-outlined checkmark">check_box_outline_blank</span> }
        </div>
    </div>
  )
});

export default SingleTodoUpdated