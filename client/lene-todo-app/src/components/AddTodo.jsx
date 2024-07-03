import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { addTodoToList } from '../features/list/listSlice';
import maskott from '../assets/images/IMG_0336-removebg.png'
import "../fancyFormTodo.css"

const AddTodo = ({ listId, handleToggleActive }) => {

    const [todoName, setTodoName] = useState("");
    const [todoDescription, setTodoDescription] = useState("");
    const dispatch = useDispatch();
    const token = localStorage.getItem('userToken');
    const handleSubmit = async (event) => {
        event.preventDefault();

    try {
        const response = await axios.post('http://localhost:5000/todos', {
            name: todoName,
            description: todoDescription,
            completed: false,
            list: listId,
        }
    )
        console.log(response)
        const savedTodo = response.data;

        dispatch(addTodoToList(savedTodo)) 
        
        toast.success(`Lagt til ${todoName}`, { 
            position: "bottom-left",
            autoClose: 2000,
        })

    } catch(error) {
        console.log("Inni handle Submit", error);
    }
        setTodoName("");
        setTodoDescription("");
    }

    return (
    <>


    <form onSubmit={handleSubmit} className='fancy-form-todo'>
        <div className='fancy-form-title'>Legg til Todo</div>

      <div className='fancy-input-container'>
        <input type="text" id="todo-name" value={todoName} onChange={(e) => setTodoName(e.target.value)} required  />
        <label htmlFor="todo-name">Oppgavenavn</label>
      </div>

      <div className='fancy-input-container'>
        <input type="text" id="todo-description" value={todoDescription} onChange={(e) => setTodoDescription(e.target.value)} required />
        <label htmlFor="todo-description">Beskrivelse</label>
      </div>
      
      <button>Legg til</button>
      <img className="login-maskott-img" src={maskott}/>
      <div className='corner-bg-icon'></div>
      <span onClick={handleToggleActive} className="material-symbols-rounded add-todo-close-icon">close</span>
    </form>
    </>
    )
}

export default AddTodo;
