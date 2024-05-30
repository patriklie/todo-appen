import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AddTodo from './AddTodo';
import { motion, AnimatePresence } from 'framer-motion';
import SingleTodoUpdated from './SingleTodoUpdated';
import { useDispatch, useSelector } from 'react-redux';
import { deleteListAndTodos } from '../features/list/listSlice';
import IconContainer from './IconContainer';

const SingleTodoList = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const singleList = useSelector(state => state.list.lists.find(lista => lista._id === id));
  const [addTodoActive, setAddTodoActive] = useState(false);
  console.log("Her er lista fra state: ", singleList);
  const navigate = useNavigate();
  const [numberDone, setNumberDone] = useState(null);

  const handleDeleteList = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/lists/${id}`)
      dispatch(deleteListAndTodos(response.data));
      navigate("/todos")
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const countDoneTodos = () => {
      if (singleList && singleList.todos) {
        setNumberDone(singleList.todos.filter(todo => todo.completed).length);
      }
    }
  
    countDoneTodos();
  }, [singleList]);

  return (
    <>
      <div className='list-info-container'>
        <div>
          <h1>{singleList && singleList.todos.length}</h1>
          <p className='under-text'>{singleList && singleList.todos.length > 1 ? "oppgaver" : singleList.todos.length === 1 ? "oppgave" : "Ingen oppgaver"}</p>
        </div>
        <div>
          <h1 className='list-title'>{singleList && singleList.name}</h1>
          <p className='under-text'>lista</p>
        </div>
        <div>
          <h1>{singleList && numberDone}</h1>
          <p className='under-text'>ferdig</p>
        </div>
      
      </div>
      

      <div className="button-container" onClick={() => setAddTodoActive(!addTodoActive)}>
        <IconContainer onClick={() => setAddTodoActive(!addTodoActive)} iconName={"wired-outline-49-plus-circle"} reveal={"in-reveal"} hover={"hover-rotation"} size={50} />
        <div className='button-container-text'>Add todo</div>
      </div>

      <div className="button-container" onClick={handleDeleteList}>
        <IconContainer onClick={handleDeleteList} iconName={"wired-outline-185-trash-bin"} reveal={"in-reveal"} hover={"hover-empty"} size={50} />
        <div className='button-container-text'>Slett liste</div>
      </div>

      <div className="todos-container">
        {singleList && singleList.todos.length > 0 && singleList.todos.map((todo, index) => {
            return <SingleTodoUpdated key={todo._id} todo={todo} />
        }) }
    </div>

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