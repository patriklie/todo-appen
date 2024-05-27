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

    useEffect(() => {
        dispatch(loadLists());
    }, [dispatch, listsFromState]);

    const handleSelect = (event) => {
        event.preventDefault();
        const selectedList = listsFromState.find(list => list._id === event.target.value);
        setActiveList(selectedList);
    }

    const goToActiveList = () => {
        navigate(`/lists/${activeList._id}`)
    }

  return (
    <>
    <div>Her kan du se alle TODO listene dine</div>
    <div>Du har {listsFromState.length} lister!</div>
    <select onChange={handleSelect}>
    {
        listsFromState && listsFromState.length > 0 && 
        listsFromState.map(liste => {
            return <option key={liste._id} value={liste._id}>{liste.name}</option>
        })
    }
    </select>
    <button onClick={goToActiveList}>Gå til liste</button>
    <ul>
        { listsFromState && listsFromState.length > 0 && 
            listsFromState.map(liste => {
                return <li key={liste._id}>
                    <Link to={`/lists/${liste._id}`}>{liste.name}</Link>
                    </li>
            })
        }
    </ul>
    </>
  )
}

export default TodoListOverview