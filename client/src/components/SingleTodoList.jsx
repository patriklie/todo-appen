import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AddTodo from './AddTodo';
import { motion, AnimatePresence } from 'framer-motion';
import SingleTodoUpdated from './SingleTodoUpdated';
import { useDispatch, useSelector } from 'react-redux';
import { deleteListAndTodos, deleteAllTodosFromlist } from '../features/list/listSlice';
import IconContainer from './IconContainer';

const SingleTodoList = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const singleList = useSelector(state => state.list.lists.find(lista => lista._id === id));
  const [addTodoActive, setAddTodoActive] = useState(false);
  console.log("Her er lista fra state: ", singleList);
  const navigate = useNavigate();
  const [numberDone, setNumberDone] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDeleteList = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/lists/${id}`)
      dispatch(deleteListAndTodos(response.data));
      navigate("/lists")
    } catch(error) {
      console.log(error)
    }
  }

  const handleDeleteAllTodos = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/lists/${id}/todos`)
      dispatch(deleteAllTodosFromlist(id))
    } catch(error) {
      console.log(error)
    }
  }

  const handleToggleActive = () => {
    setAddTodoActive(!addTodoActive);
  }

  useEffect(() => {
    if (singleList) {
      const countDoneTodos = () => {
        if (singleList && singleList.todos) {
          setNumberDone(singleList.todos.filter(todo => todo.completed).length);
        }
      }
      countDoneTodos();
      setLoading(false);
    }
  }, [singleList]);

  if (loading) {
    return (
    <div className='loader-list-container'>
      <IconContainer iconName={"wired-outline-213-arrow-2-rounded-black"} reveal={"loop-cycle"} hover={"hover-rotation"} size={50}  />
      <div className='load-list-text'>Oppdaterer lister...</div>
    </div>
    )
  }

  return (
    <div className='single-list-container'>
      <div className='list-info-container'>
        <div className='single-todo-oppgaver'>
          <h1>{singleList && singleList.todos.length}</h1>
          <p className='under-text'>{singleList && singleList.todos.length > 1 ? "oppgaver" : singleList && singleList.todos.length === 1 ? "oppgave" : "Ingen oppgaver"}</p>
        </div>

        <div className='single-todo-title'>
          <h1 className='list-title'>{singleList.name}</h1>
        </div>

        <div className='single-todo-ferdig'>
          <h1>{numberDone}</h1>
          <p className='under-text'>ferdig</p>
        </div>
      
      </div>
      
      <div className='buttons-container'>
        <div className="button-container" onClick={() => setAddTodoActive(!addTodoActive)}>
          <IconContainer onClick={() => setAddTodoActive(!addTodoActive)} iconName={"wired-outline-49-plus-circle-black"} reveal={"in-reveal"} hover={"hover-rotation"} size={35} />
          <div className='button-container-text'>Add todo</div>
        </div>

        <div className="button-container" onClick={handleDeleteList}>
          <IconContainer onClick={handleDeleteList} iconName={"wired-outline-185-trash-bin-black"} reveal={"in-reveal"} hover={"hover-empty"} size={35} />
          <div className='button-container-text'>Slett liste</div>
        </div>

        <div className="button-container" onClick={handleDeleteAllTodos}>
          <IconContainer onClick={handleDeleteAllTodos} iconName={"wired-outline-1683-recycling-black"} reveal={"in-reveal"} hover={"hover-cycle"} size={35} />
          <div className='button-container-text'>Slett todos</div>
        </div>
      </div>
      {singleList.todos.length > 0 && 
      <div className="todos-container">
      <AnimatePresence>
        {singleList && singleList.todos.length > 0 && singleList.todos.map((todo, index) => {
            return (
              <motion.div
                className={`single-todo-container ${todo.completed ? "todo-active" : ""}`} 
                key={todo._id}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }} 
                layout
                transition={{ duration: 0.2 }}
                >          
                  <SingleTodoUpdated todo={todo} />
              </motion.div>
            )
        })}
        </AnimatePresence>
    </div>
    }

      <AnimatePresence>
      { addTodoActive && <motion.div 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        layout
        transition={{ duration: 0.2 }}
        >          
          <AddTodo listId={id} handleToggleActive={handleToggleActive} /> 
        </motion.div>
      }
      </AnimatePresence>
    </div>
  )
}

export default SingleTodoList;