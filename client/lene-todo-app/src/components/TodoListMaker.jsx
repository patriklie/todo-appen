import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const TodoListMaker = () => {

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

            console.log(response)

        } catch(error) {
            console.log(error)
        }

    }



  return (
    <>
        <div>TodoListMaker</div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='listName'>Listenavn: </label>
            <input id="listName" value={listName} onChange={(e) => setListName(e.target.value)} type="text" placeholder='Listname' />
            <button>Opprett ny liste</button>
        </form>
    </>
  )
}

export default TodoListMaker