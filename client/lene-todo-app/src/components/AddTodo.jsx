import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, loadTodos } from '../features/todo/todoSlice';
import SingleTodo from './SingleTodo';
import axios from 'axios';
import { toast } from 'react-toastify';


const AddTodo = () => {

    const [todoName, setTodoName] = useState("");
    const [todoDescription, setTodoDescription] = useState("");

    const dispatch = useDispatch();
    const todoState = useSelector(state => state.todo.todos);

    useEffect(() => {
        dispatch(loadTodos());
    }, [dispatch]);


    const handleSubmit = async (event) => {
        event.preventDefault();

    try {
        const response = await axios.post('http://localhost:5000/todos', {
            name: todoName,
            description: todoDescription,
            completed: false,
        })
        console.log(response)
        const savedTodo = response.data;

        dispatch(addTodo(savedTodo))
        toast.success(`Lagt til ny TODO: ${todoName}`, { 
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
    <div className="todos-container">
        {todoState && todoState.length > 0 && todoState.map(todo => {
            return <SingleTodo key={todo._id} todo={todo} />
        }) }
    </div>
   
    <form className='add-todo-form' onSubmit={handleSubmit}>
        <label htmlFor="todo-name">Navn på oppgave:</label>
        <input type="text" id="todo-name" value={todoName} onChange={(e) => setTodoName(e.target.value)} required />
        <label htmlFor="todo-description">Oppgavebeskrivelse:</label>
        <textarea type="text" id="todo-description" value={todoDescription} onChange={(e) => setTodoDescription(e.target.value) } required ></textarea>
        <button>Ny Oppgave</button>
    </form>
    </>
    
  )
}

export default AddTodo