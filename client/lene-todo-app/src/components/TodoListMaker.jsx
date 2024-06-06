import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addList } from '../features/list/listSlice';
import maskott from '../assets/images/IMG_0336-removebg.png'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

const TodoListMaker = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);
    const token = localStorage.getItem('userToken');
    const [listName, setListName] = useState("");

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }} onSubmit={handleSubmit} className='fancy-form'>
            <div className='fancy-form-title'>Opprett ny liste</div>
            <div className='fancy-input-container'>
                <input type="text" id="listName" value={listName} onChange={(e) => setListName(e.target.value)} required  />
                <label htmlFor="listName">Listenavn</label>
            </div>
            <button>Legg til</button>
            <img className="login-maskott-img" src={maskott}/>
        </motion.form>
    </AnimatePresence>
    </>
  )
}

export default TodoListMaker