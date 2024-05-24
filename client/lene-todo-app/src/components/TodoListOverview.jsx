import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TodoListOverview = () => {

    const token = localStorage.getItem("userToken");
    const [lister, setLister] = useState([]);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get("http://localhost:5000/lists/", {
                    headers: {
                        Authorization: `Bearer: ${token}`,
                    }
                });
                console.log(response);
                setLister(response.data)
            } catch(error) {
                console.error("Error fetching lister", error);
            }
        }   
        
        fetchLists();
        
    },[])

  return (
    <>
    <div>Her kan du se alle TODO listene dine</div>
    <ul>
        { lister && lister.length > 0 && 
            lister.map(liste => {
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