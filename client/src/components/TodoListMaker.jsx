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
    const token = localStorage.getItem('token');
    const [listName, setListName] = useState("");
    const listsFromState = useSelector(state => state.list.lists);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/lists/add`, {
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
        data-isopen={isOpen}
        className="add-list-form"
        onSubmit={handleSubmit}
        >
            { !isOpen && 
            <IconContainer onClick={() => setIsOpen(!isOpen)} iconName={"wired-outline-49-plus-circle-black"} reveal={"in-reveal"} hover={"hover-rotation"} size={90} />
            }

            { isOpen && 
            <>
                <div className='add-list-form-title'>Ny liste</div>
                <div className='add-list-form-container'>
                    <input type="text" id="listName" value={listName} onChange={(e) => setListName(e.target.value)} required  />
                    <label htmlFor="listName">Listenavn</label>
                </div>
                <button>Legg til</button>
                <img className="login-maskott-img" src={maskott}/>
                <div className='corner-bg-icon-add-list'></div>
                <span onClick={() => setIsOpen(!isOpen)} className="material-symbols-rounded close-list">close</span>
            </>
            }
        </motion.form>
    </AnimatePresence>
    </>
  )
}

export default TodoListMaker;