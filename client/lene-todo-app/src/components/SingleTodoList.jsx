import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddTodo from './AddTodo';
import { motion, AnimatePresence } from 'framer-motion';
import SingleTodoUpdated from './SingleTodoUpdated';
import { useDispatch, useSelector } from 'react-redux';

const SingleTodoList = () => {

  const { id } = useParams();
  const [todoList, setTodoList] = useState(null);
  const [addTodoActive, setAddTodoActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSingleList = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/lists/${id}`);
        setTodoList(response.data);
      } catch(error) {
        console.error(error);
      }
    }

    getSingleList();

  },[id]);

  return (
    <>
      { todoList && <h1 style={{ textAlign: "center"}}>{todoList.listName}</h1>}

     
      <div className="todos-container">
        {todoList && todoList.todos.length > 0 && todoList.todos.map((todo, index) => {
            return <SingleTodoUpdated key={todo} todoId={todo} />
        }) }
    </div>

      <button onClick={() => setAddTodoActive(!addTodoActive)}>Add TODO +</button>

      <AnimatePresence>
      { addTodoActive && <motion.div 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }} 
        >          
          <AddTodo listId={id} /> 
        </motion.div>
    
      }
      </AnimatePresence>
    </>
  )
}

export default SingleTodoList