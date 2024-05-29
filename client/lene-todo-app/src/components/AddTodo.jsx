import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { addTodoToList } from '../features/list/listSlice';

const AddTodo = ({ listId }) => {

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
        
        toast.success(`Lagt til "${todoName}"`, { 
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
        <form className='add-todo-form' onSubmit={handleSubmit}>
            <label htmlFor="todo-name">Navn på oppgave:</label>
            <input placeholder='Legg til oppgavenavn 👻' type="text" id="todo-name" value={todoName} onChange={(e) => setTodoName(e.target.value)} required />
            <label htmlFor="todo-description">Oppgavebeskrivelse:</label>
            <textarea placeholder='Legg til oppgavebeskrivelse' type="text" id="todo-description" value={todoDescription} onChange={(e) => setTodoDescription(e.target.value) } required ></textarea>
            <button>Ny Oppgave</button>
        </form>
    </>
    )
}

export default AddTodo;
