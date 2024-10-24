import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteListAndTodos, loadLists, updateListname } from '../features/list/listSlice';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TodoListMaker from './TodoListMaker';

const TodoListOverview = () => {

    const token = localStorage.getItem("token");
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
                const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/lists/${listeId}`, {newListname});
                dispatch(updateListname(response.data));
                toast.success(`Endret listenavn til ${response.data.name}! 😎`, {
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
            const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/lists/${listeId}`);
            dispatch(deleteListAndTodos(response.data))
            toast.error(`Slettet liste ${response.data.name} 🗑️`, {
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
       

        if (slettRef.current) {
            const delArea = slettRef.current.getBoundingClientRect();
            const dragElementScrollY = dragElement.y - window.scrollY;
            const dragElementScrollX = dragElement.x - window.scrollX;

        if ( 
            dragElementScrollX >= delArea.left &&
            dragElementScrollX <= delArea.right &&
            dragElementScrollY >= delArea.top &&
            dragElementScrollY <= delArea.bottom
         ) {
            handleDeleteList(id);
            slettRef.current.style.background = "#ff000015";
            }
        }
    }
    const handleOverElement = (event, dragInfo, id) => {
        
        const dragElement = dragInfo.point;

        if (slettRef.current) {
            const delArea = slettRef.current.getBoundingClientRect();
/*             console.log(window.scrollX);
            console.log(window.scrollY); */
            const dragElementScrollY = dragElement.y - window.scrollY;
            const dragElementScrollX = dragElement.x - window.scrollX;

/*             console.log("Justert X verdi: ", dragElementScrollX)
            console.log("Justert Y verdi: ", dragElementScrollY)
            console.log("Dra elementet Y: ", dragElement.y)
            console.log("Dra elementet X: ", dragElement.x)
            console.log("Delete plassen Top/Y: ", delArea.y)
            console.log("Delete plassen Bottom: ", delArea.bottom)
            console.log("Delete plassen Left/X: ", delArea.x)
            console.log("Delete plassen Right: ", delArea.right) */

            if ( 
                dragElementScrollX >= delArea.left &&
                dragElementScrollX <= delArea.right &&
                dragElementScrollY >= delArea.top &&
                dragElementScrollY <= delArea.bottom
            ) {
                slettRef.current.style.background = "#ff000080";
            } else {
                slettRef.current.style.background = "#ff000015";
            }
        }
        

        }

  return (
    <div className='todo-list-page-padding'>
    { listsFromState && listsFromState.length > 0 ?  
    <>
        <h1 className='standard-h1'>Dine lister</h1>
        <p>Prøv drag and drop på listene 👇</p>
    </>

    :
    <>
        <h1 className='standard-h1'>Ingen lister!</h1>
        <p>Trykk på ikonet for å lage en liste 👇</p>
    </>
    }
{/*     <div className='select-wrapper'>
    
        <div className='custom-select'>
            <select onChange={handleSelect}>
                <option>Velg liste</option>
                {
                listsFromState && listsFromState.length > 0 && 
                listsFromState.map(liste => {
                    return <option key={liste._id} value={liste._id}>{liste.name}</option>
                })
                }
            </select>
            <span className="custom-arrow"></span>
            
        </div>
        
            {activeList && 
        <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='custom-select-button' onClick={goToActiveList}>Åpne liste</motion.button>
        }
  
        
    </div> */}
    { listsFromState && listsFromState.length > 0 &&
        <div className='list-overview-grid'>
            { listsFromState && listsFromState.length > 0 && //kan fjerne denne la til ytre sjekk for css bug
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
                    <AnimatePresence key={ liste._id + 1 }>
                        <motion.div 
                        drag 
                        /* layout */ // Layout gjorde at elementene bugget ved retur til origin
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
                        onClick={() => handleNavigation(liste._id)} 
                        className='singlelist-overview-container'  
                        key={liste._id} style={{ cursor: "pointer"}}>
                            <div>{liste.name}</div>
                            <div onClick={(event) => handleEditClick(event, liste._id)} className="material-symbols-rounded list-overview-icon">edit</div>
                        </motion.div>
                    </AnimatePresence>
                    )
                })
            }  
        </div>
    }
        
            {isDragging && 
            <AnimatePresence>
        <motion.div         
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout 
        className="drag-container" 
        ref={slettRef} 
        >
            <div className="material-symbols-rounded delete-drag">delete</div>
        </motion.div> 
        </AnimatePresence>
        }

        <TodoListMaker />
    </div>
  )
}

export default TodoListOverview;