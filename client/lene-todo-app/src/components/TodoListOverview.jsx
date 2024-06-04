import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLists } from '../features/list/listSlice';
import { useNavigate, Link } from 'react-router-dom';

const TodoListOverview = () => {

    const token = localStorage.getItem("userToken");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listsFromState = useSelector(state => state.list.lists);
    const [activeList, setActiveList] = useState(null);
    console.log("Lister fra state: ", listsFromState)
    const [editListId, setEditListId] = useState(null);

    const handleSelect = (event) => {
        event.preventDefault();
        const selectedList = listsFromState.find(list => list._id === event.target.value);
        setActiveList(selectedList);
    }

    const goToActiveList = () => {
        if(activeList) {
            navigate(`/lists/${activeList._id}`)
        }
    }

    const handleEditClick = (event, listId) => {
        event.preventDefault();
        event.stopPropagation();
        setEditListId(editListId === listId ? null : listId);
    }

    const handleSaveEdit = (listeId) => {
        setEditListId(null);
        console.log("SAVED EDIT")
    }

  return (
    <>
    <h2>Her kan du se alle TODO listene dine</h2>
    <div>Du har {listsFromState.length} lister!</div>
    <select onChange={handleSelect}>
        <option>Velg en liste!</option>
    {
        listsFromState && listsFromState.length > 0 && 
        listsFromState.map(liste => {
            return <option key={liste._id} value={liste._id}>{liste.name}</option>
        })
    }
    </select>
    <button onClick={goToActiveList}>Gå til liste</button>

    <div className='list-overview-grid'>
            { listsFromState && listsFromState.length > 0 && 
                listsFromState.map(liste => {
                    return (
                        editListId === liste._id ? 
                        <div className='singlelist-overview-container' key={liste._id}>
                            <form>
                                <input type="text" placeholder={liste.name} />
                            </form>
                           
                            <div onClick={(event) => handleSaveEdit(liste._id)} className="material-symbols-rounded list-overview-icon">save</div>                          
                       
                        </div> 
                        :
                        <Link className='singlelist-overview-container' to={`/lists/${liste._id}`} key={liste._id}>
                            <div>{liste.name}</div>
                            <div onClick={(event) => handleEditClick(event, liste._id)} className="material-symbols-rounded list-overview-icon">edit</div>
                        </Link>
                    )
                })
            }
        </div>
        </>
  )
}

export default TodoListOverview