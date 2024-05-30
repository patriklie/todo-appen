import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addList } from '../features/list/listSlice';

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
        <div>TodoListMaker</div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='listName'>Listenavn: </label>
            <input maxLength={20} id="listName" value={listName} onChange={(e) => setListName(e.target.value)} type="text" placeholder='Listname' />
            <button>Opprett ny liste</button>
        </form>
    </>
  )
}

export default TodoListMaker