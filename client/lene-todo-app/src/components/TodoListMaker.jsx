import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addList } from '../features/list/listSlice';
import maskott from '../assets/images/IMG_0336-removebg.png'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import IconContainer from './IconContainer';

const TodoListMaker = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);
    const token = localStorage.getItem('userToken');
    const [listName, setListName] = useState("");
    const listsFromState = useSelector(state => state.list.lists);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/lists/add", {
                name: listName,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        dispatch(addList(response.data));
            console.log(response)

        } catch(error) {
            console.log(error)
        }
        setListName("")
    }

  return (
    <>
    <AnimatePresence>
        <motion.form
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
         onSubmit={handleSubmit} className='fancy-form'>
            <div className='fancy-form-title'>Opprett ny liste</div>
            <div className='fancy-input-container'>
                <input type="text" id="listName" value={listName} onChange={(e) => setListName(e.target.value)} required  />
                <label htmlFor="listName">Listenavn</label>
            </div>
            <button>Legg til</button>
            <img className="login-maskott-img" src={maskott}/>
        </motion.form>
    </AnimatePresence>

    <motion.form
      layout
      data-isOpen={isOpen}
      className="parent"
      
      onSubmit={handleSubmit}
    >
        { !isOpen && 
        <IconContainer onClick={() => setIsOpen(!isOpen)} iconName={"wired-outline-49-plus-circle"} reveal={"in-reveal"} hover={"hover-rotation"} size={100} />
        }
        { isOpen && <div>
            <div className='fancy-form-title'>Opprett ny liste</div>
            <div className='fancy-input-container'>
            <input type="text" id="listName" value={listName} onChange={(e) => setListName(e.target.value)} required  />
            <label htmlFor="listName">Listenavn</label>
            </div>
            <button>Legg til</button>
            <img className="login-maskott-img" src={maskott}/>
            </div>}

    </motion.form>
    </>
  )
}

export default TodoListMaker