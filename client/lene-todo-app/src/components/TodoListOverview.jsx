import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadLists } from '../features/list/listSlice';

const TodoListOverview = () => {

    const token = localStorage.getItem("userToken");
    const dispatch = useDispatch();
    const listsFromState = useSelector(state => state.list.lists);

    useEffect(() => {
        dispatch(loadLists());
    }, [dispatch, listsFromState]);

  return (
    <>
    <div>Her kan du se alle TODO listene dine</div>
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