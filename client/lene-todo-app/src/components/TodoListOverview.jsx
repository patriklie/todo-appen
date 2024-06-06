import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteListAndTodos, loadLists, updateListname } from '../features/list/listSlice';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const TodoListOverview = () => {

    const token = localStorage.getItem("userToken");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listsFromState = useSelector(state => state.list.lists);
    const [activeList, setActiveList] = useState(null);
    const [editListId, setEditListId] = useState(null);
    const [newListname, setNewListname] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef(null);
    const slettRef = useRef(null);

    useEffect(() => {
        // Sett fokus på inputfeltet når editListId endres
        console.log("useEffect called");
        if (editListId !== null && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editListId]);

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
        const foundList = listsFromState.find(list => list._id === listId)
        setNewListname(foundList.name)
        event.preventDefault();
        event.stopPropagation();
        setEditListId(editListId === listId ? null : listId);
    }

    const handleSaveEdit = async (listeId) => {
        setEditListId(null);
        const foundList = listsFromState.find(list => list._id === listeId)
        if(foundList && newListname && newListname !== foundList.name) {
            try {
                const response = await axios.put(`http://localhost:5000/lists/${listeId}`, {newListname});
                dispatch(updateListname(response.data));
                toast.success(`Endret listenavn til "${response.data.name}".`, {
                    position: "bottom-left",
                    autoClose: 3000,
                  });
            } catch(error) {
                console.log(error);
            }
            setNewListname("")
        }
    }

    const handleDeleteList = async (listeId) => {
        setEditListId(null);
        try {
            const response = await axios.delete(`http://localhost:5000/lists/${listeId}`);
            dispatch(deleteListAndTodos(response.data))
            toast.error(`Slettet liste "${response.data.name}".`, {
                position: "bottom-left",
                autoClose: 3000,
              });
        } catch(error) {
            console.log(error)
        }
    }

    const handleNavigation = (listeId) => {
        if(!isDragging) {
            navigate(`/lists/${listeId}`)
        }
    }
    const checkIfOverDelete = (event, dragInfo, id) => {
        const dragElement = dragInfo.point;
        const delArea = slettRef.current.getBoundingClientRect();

        if ( 
            dragElement.x >= delArea.x &&
            dragElement.x <= delArea.right &&
            dragElement.y >= delArea.y &&
            dragElement.y <= delArea.bottom
         ) {
            handleDeleteList(id);
            slettRef.current.style.background = "#ff000015";
        }

            // Under var bare for å forsikre meg om verdiene ved dragging
/*         console.log("REF objektet: ", slettRef.current.getBoundingClientRect());
        console.log("Drag objektet: ", dragElement) */

    }

    const handleOverElement = (event, dragInfo, id) => {

        const delArea = slettRef.current.getBoundingClientRect();
        const dragElement = dragInfo.point;
        
            if ( 
                dragElement.x >= delArea.x &&
                dragElement.x <= delArea.right &&
                dragElement.y >= delArea.y &&
                dragElement.y <= delArea.bottom
            ) {
                slettRef.current.style.background = "#ff000080";
            } else {
                slettRef.current.style.background = "#ff000015";
            }
        }

  return (
    <>
    
    <h1 style={{ textAlign: "center", margin: "20px", color: "var(--primary-color)" }}>Alle listene dine</h1>
    <div className='select-wrapper'>
    
        <div className='custom-select'>
            <select onChange={handleSelect}>
                
                <option>Velg en av dine {listsFromState.length} lister</option>
            {
                listsFromState && listsFromState.length > 0 && 
                listsFromState.map(liste => {
                    return <option key={liste._id} value={liste._id}>{liste.name}</option>
                })
            }
            </select>
            <span className="custom-arrow"></span>
            
        </div>
        <button className='custom-select-button' onClick={goToActiveList}>Åpne liste</button>
    </div>

    <motion.div className="drag-container" ref={slettRef} >
        <div className="material-symbols-rounded delete-drag">delete</div>
    </motion.div>

    <div className='list-overview-grid'>
            { listsFromState && listsFromState.length > 0 && 
                listsFromState.map(liste => {
                    return (
                        editListId === liste._id ? 
                        <div className='singlelist-overview-container' key={liste._id}>
                            <form>
                                <input onBlur={() => setEditListId(null)} ref={inputRef} maxLength={20} type="text" onKeyDown={(event) => {if (event.key === "Enter") {handleSaveEdit(liste._id)}}} value={newListname} onChange={(event) => setNewListname(event.target.value)} placeholder={liste.name} />
                            </form>
                           
                            <div className='list-icons-flex'>
                                <div onMouseDown={() => handleDeleteList(liste._id)} className="material-symbols-rounded list-overview-icon">delete</div>                          
                                <div onMouseDown={() => handleSaveEdit(liste._id)} className="material-symbols-rounded list-overview-icon">save</div>                          
                            </div>
                        </div> 
                        :
                        <motion.div 
                        drag 
                        dragSnapToOrigin 
                        onDragStart={(event, info) => setIsDragging(true)}
                        onDragEnd={(event, info) => {
                            setIsDragging(false);
                            checkIfOverDelete(event, info, liste._id);
                        }}
                        onDrag={(event, info) => {
                            handleOverElement(event, info);
                        }}
                        whileDrag={{opacity: 0.5 }}
                        animate={{opacity: 1, y: 0}}
                        initial={{opacity: 1, y: -20}}
                        onClick={() => handleNavigation(liste._id)} 
                        className='singlelist-overview-container'  
                        key={liste._id} style={{ cursor: "pointer"}}>
                            <div>{liste.name}</div>
                            <div onClick={(event) => handleEditClick(event, liste._id)} className="material-symbols-rounded list-overview-icon">edit</div>
                        </motion.div>
                    )
                })
            }
        </div>
        </>
  )
}

export default TodoListOverview