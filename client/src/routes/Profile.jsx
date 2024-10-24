import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { logout, oppdaterProfil, removeHeaderImage, removeProfileImage } from '../features/auth/authSlice';
import { addHeaderImage, addProfileImage, changeBackground } from '../features/auth/authSlice';
import IconContainer from '../components/IconContainer';
import AnimatedCounter from '../components/AnimatedCounter';

const Profile = () => {

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const fileInputRef = useRef();
  const headerInputRef = useRef();
  const stateProfile = useSelector(state => state.auth);
  const stateLists = useSelector(state => state.list.lists);
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const [primaryColor, setPrimaryColor] = useState("#0abd6c");
  const [editMode, setEditMode] = useState(false);
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [uploading, setUploading] = useState(false);
  const [headerTools, setHeaderTools] = useState(false);
  const [profileImageTools, setProfileImageTools] = useState(false);
  const [editTools, setEditTools] = useState(false);

  useEffect(() => {
    const newPrimary = document.documentElement.style.getPropertyValue('--primary-color');
    if (newPrimary) setPrimaryColor(newPrimary);
  },[]);

  const countTodos = () => {
    return stateLists.reduce((total, list) => total + list.todos.length, 0);
  };

  const countCompletedTodos = () => {
   return stateLists.reduce((total, list) => total + list.todos.filter(todo => todo.completed).length, 0);
  };

  const antallTodos = countTodos();
  const doneTodos = countCompletedTodos();

  const handleDeleteProfileImg = async () => {

    try {
    const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/uploads/deleteProfileImage`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    // update profile in state
    dispatch(removeProfileImage());
    setProfileImageTools(false);
    toast.warning("Profilbilde fjernet! 🗑️", {
      position: "bottom-left",
      autoClose: 3000,
    });

    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteProfileHeader = async () => {

    try {
    const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/uploads/deleteProfileHeader`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    // update profile in state
    dispatch(removeHeaderImage());
    setHeaderTools(false);
    toast.warning("Headerbilde fjernet! 🗑️", {
      position: "bottom-left",
      autoClose: 3000,
    });
    console.log("removed header image")

    } catch (error) {
      console.log(error);
    }
  }

  const toggleHeaderTools = () => {
    setHeaderTools(!headerTools);
  }

  const toggleProfileImageTools = () => {
    setProfileImageTools(!profileImageTools);
  }

  const handleProfileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    const maxFileSize = 5 * 1024 * 1024;

    if (selectedFile.size > maxFileSize) {
      toast.error("Bilde er for stort! Maks 5mb 👀", {
        position: "bottom-left",
        autoClose: 3000,
      });
      fileInputRef.current.value = "";
      return
    }

    if (!selectedFile) {
      alert("Vennligst velg en fil!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/uploads/profileImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("Respons fra server: ", response.data);
      dispatch(addProfileImage(response.data.url))
      toast.success("Profilbilde lastet opp! ✌️", {
        position: "bottom-left",
        autoClose: 3000,
      });

    } catch (error) {
      console.log("Her er error objektet når for stort bilde: ", error)
      console.error('Feil ved opplasting av bilde: ', error);
      toast.error("Feil ved opplasting! 👀", {
        position: "bottom-left",
        autoClose: 3000,
      });

    } finally {
      setUploading(false);
      setProfileImageTools(false);
      fileInputRef.current.value = "";
    }
  }

  const handleHeaderUpload = async (e) => {
    const selectedFile = e.target.files[0];
    const maxFileSize = 5 * 1024 * 1024;

    if (!selectedFile) {
      alert("Vennligst velg en fil!");
      return;
    }

    if (selectedFile.size > maxFileSize) {
      toast.error("Headerbilde er for stort! Maks 5mb 👀", {
        position: "bottom-left",
        autoClose: 3000,
      });
      headerInputRef.current.value = "";
      return
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/uploads/headerImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("Respons fra server: ", response.data);
      dispatch(addHeaderImage(response.data.url))
      toast.success("Header bilde lastet opp! ✌️", {
        position: "bottom-left",
        autoClose: 3000,
      });

    } catch (error) {

      console.error('Feil ved opplasting av bilde: ', error);
      toast.error("Feil ved opplasting! 👀", {
        position: "bottom-left",
        autoClose: 3000,
      });

    } finally {
      setUploading(false);
      headerInputRef.current.value = "";
      setHeaderTools(false);
    }
  };

  const handleProfileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleHeaderInputClick = () => {
    headerInputRef.current.click();
  };

  const handleSave = async () => {
    setEditMode(false);
    setDeletePrompt(false);

    if (stateProfile.username !== newUsername || stateProfile.email !== newEmail) {

      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/users/edit`, 
          {
          username: newUsername,
          email: newEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      dispatch(oppdaterProfil(response.data));
      toast.success("Oppdatert profilen! ✌️", {
        position: "bottom-left",
        autoClose: 3000,
      });

      
      } catch (error) {
        console.log("Her er feilmeldingen etter axios profil: ", error);
        toast.error(error.response.data, {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    }
  };

  const handleEdit = (e) => {
    setEditMode(true);
    setNewUsername(stateProfile.username);
    setNewEmail(stateProfile.email);
    setTimeout(() => {
      if (e.target.className === "profile-username") {
        usernameInputRef.current.focus();
      } else if (e.target.className === "profile-email") {
        emailInputRef.current.focus();
      }
    }, 0);
  };

  // Ikke bundet opp FN under:
  const handleDeleteProfile = async() => {

    if (token) {
      try { 
        const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/delete`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        
        // console.log("Delete response: ", response);
        // console.log("Brukernavnet er her: ", response.data.username);
        dispatch(logout());
        toast.success(`Slettet bruker: ${response.data.username}`, {
          position: "bottom-left",
          autoClose: 3000,
        });
        localStorage.removeItem("token");

      } catch(error) {
        console.log(error);
      }
    }
  };

  const editToolsEnter = () => {
    setEditTools(true);
  };

  const editToolsLeave = () => {
    setEditTools(false);
  };

  const handleColorChange = (e) => {
    console.log("e.target.value inni fn: ", e.target.value);
    setPrimaryColor(e.target.value);
    document.documentElement.style.setProperty('--primary-color', e.target.value);
  };

  return (
    <>
    <AnimatePresence>
      { deletePrompt && 
      <motion.div 
      className="profile-dimmer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      >
        <div className='delete-prompt-text'>Vil du slette profilen? 😐</div>

        <div className='delete-prompt'>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8, borderRadius: "100%" }}
            >Ja
          </motion.button>

          <motion.button
            onClick={() => setDeletePrompt(false)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8, borderRadius: "100%" }}
            >Nei
          </motion.button>
        </div>
      </motion.div>
      }
    </AnimatePresence>
      
    <div className='todo-profile-container' >

    {stateProfile && stateProfile.profileHeaderUrl ?
      <img onClick={toggleHeaderTools} className='header-image' src={stateProfile.profileHeaderUrl} />
      :
      <div onClick={handleHeaderInputClick} className='header-placeholder'></div>
    }

    {stateProfile && stateProfile.profileImageUrl ?
      <img onClick={toggleProfileImageTools} className='profile-image' src={stateProfile.profileImageUrl} />
      :
      <div onClick={handleProfileInputClick} className='profile-placeholder'></div>
    }

      <div className="white-circle-cutout"></div>
      <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={handleProfileUpload} accept='image/*' />
      <input style={{ display: "none" }} ref={headerInputRef} type="file" onChange={handleHeaderUpload} accept='image/*' />
    
      <AnimatePresence>
    {
      headerTools && 
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='profile-header-tools-container'>
          <IconContainer onClick={handleHeaderInputClick} iconName={"wired-outline-35-edit-black"} reveal={"in-reveal"} hover={"hover-circle"} size={40} />
          <IconContainer onClick={handleDeleteProfileHeader} iconName={"wired-outline-185-trash-bin-black"} reveal={"in-reveal"} hover={"hover-empty"} size={40} />
        </motion.div>
    }
    </AnimatePresence>

    <AnimatePresence>
    {
      profileImageTools && 
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='profile-image-tools-container'
      >
        <IconContainer onClick={handleProfileInputClick} iconName={"wired-outline-35-edit-black"} reveal={"in-reveal"} hover={"hover-circle"} size={40} />
        <IconContainer onClick={handleDeleteProfileImg} iconName={"wired-outline-185-trash-bin-black"} reveal={"in-reveal"} hover={"hover-empty"} size={40} />
      </motion.div>
    }
    </AnimatePresence>
    </div>

    <div className='profile-flex-container'>
      
      <div className='titles' onMouseEnter={editToolsEnter} onMouseLeave={editToolsLeave}>
        
        { editMode ? 
        (
        <>
        <AnimatePresence>
        { editTools && 
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="material-symbols-rounded profile-edit" 
              onClick={handleSave}
              >save
            </motion.div>
        }
        </AnimatePresence>
            <input ref={usernameInputRef} onKeyDown={(e) => e.key === "Enter" ? handleSave() : ""} onChange={(e) => setNewUsername(e.target.value)} id="editUsername" type="text" value={newUsername}/>
            <input ref={emailInputRef} onKeyDown={(e) => e.key === "Enter" ? handleSave() : ""} onChange={(e) => setNewEmail(e.target.value)} id="editEmail" type="text" value={newEmail}/>
        </>
        )
        :
        (
        <>
        <AnimatePresence>
          { editTools && 
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="material-symbols-rounded profile-edit" onClick={handleEdit}
            >edit
          </motion.div>
          }
        </AnimatePresence>  
          <div onClick={(e) => handleEdit(e)} className='profile-username'>{stateProfile.username}</div>
          <div onClick={(e) => handleEdit(e)}  className='profile-email'>{stateProfile.email}</div>
        </>
        )
        }
        
      </div>

      <div className='info-dump'>
        <div className='info-title one'>LISTER</div>
        <div className='info-title two'>TODOS</div>
        <div className='info-title three'>UTFØRTE TODOS</div>
        <div className='info-state'><AnimatedCounter from={0} to={stateLists.length}/></div>
        <div className='info-state'><AnimatedCounter from={0} to={antallTodos}/></div>
        <div className='info-state'><AnimatedCounter from={0} to={doneTodos}/></div>
      </div>
      <input onChange={(e) => handleColorChange(e)} className='colorpicker' type="color" value={primaryColor} />
      <button className='delete-profile' onClick={() => setDeletePrompt(true)}>Slett profil</button>
      
    </div>
    </>
  )
}

export default Profile;