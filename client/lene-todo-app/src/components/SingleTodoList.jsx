import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AddTodo from './AddTodo';
import { motion, AnimatePresence } from 'framer-motion';
import SingleTodoUpdated from './SingleTodoUpdated';
import { useDispatch, useSelector } from 'react-redux';
import { deleteListAndTodos } from '../features/list/listSlice'
;

const SingleTodoList = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const singleList = useSelector(state => state.list.lists.find(lista => lista._id === id));
  const [addTodoActive, setAddTodoActive] = useState(false);
  console.log("Her er lista fra state: ", singleList);
  const navigate = useNavigate();

/*   useEffect(() => {
    const getSingleList = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/lists/${id}`);
        setTodoList(response.data);
      } catch(error) {
        console.error(error);
      }
    }

    getSingleList();

  },[id]); */

  const handleDeleteList = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/lists/${id}`)
      dispatch(deleteListAndTodos(response.data));
      navigate("/todos")
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      { singleList && <h1 style={{ textAlign: "center"}}>{singleList.name}</h1>}
      <button onClick={handleDeleteList}>Delete List</button>

      <div className="todos-container">
        {singleList && singleList.todos.length > 0 && singleList.todos.map((todo, index) => {
            return <SingleTodoUpdated key={todo._id} todo={todo} />
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