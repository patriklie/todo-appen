import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';
import SingleTodo from './SingleTodo';
import axios from 'axios';

const AddTodo = () => {

    const [todoName, setTodoName] = useState("");
    const [todoDescription, setTodoDescription] = useState("");

    const dispatch = useDispatch();
    const todoState = useSelector(state => state.todo);

    const handleSubmit = async (event) => {
        event.preventDefault();

    try {
        const response = await axios.post('http://localhost:5000/todos', {
            name: todoName,
            description: todoDescription,
            completed: false,
        })

        const savedTodo = response.data;

        dispatch(addTodo(savedTodo))

    } catch(error) {
        console.log(error);
    }
        setTodoName("");
        setTodoDescription("");
    }

  return (
    <>
    <div className="todos-container">
        {todoState.length > 0 && todoState.map(todo => {
            return <SingleTodo key={todo._id} todo={todo} />
        }) }
    </div>
   
    <form className='add-todo-form' onSubmit={handleSubmit}>
        <label htmlFor="todo-name">Navn på oppgave:</label>
        <input type="text" id="todo-name" value={todoName} onChange={(e) => setTodoName(e.target.value)} />
        <label htmlFor="todo-description">Oppgavebeskrivelse:</label>
        <textarea type="text" id="todo-description" value={todoDescription} onChange={(e) => setTodoDescription(e.target.value) }></textarea>
        <button>Ny Oppgave</button>
    </form>
    </>
    
  )
}

export default AddTodo