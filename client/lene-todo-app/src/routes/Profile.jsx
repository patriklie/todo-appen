import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { logout, oppdaterProfil, removeHeaderImage, removeProfileImage } from '../features/auth/authSlice';
import { addHeaderImage, addProfileImage } from '../features/auth/authSlice';
import IconContainer from '../components/IconContainer';

const Profile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const fileInputRef = useRef();
  const headerInputRef = useRef();
  const stateProfile = useSelector(state => state.auth);
  const stateLists = useSelector(state => state.list.lists);
  const usernameInputRef = useRef();

  const [editMode, setEditMode] = useState(false);
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [uploading, setUploading] = useState(false);
  const [headerTools, setHeaderTools] = useState(false);
  const [profileImageTools, setProfileImageTools] = useState(false);
  const [editTools, setEditTools] = useState(false);

  const countTodos = () => {
    return stateLists.reduce((total, list) => total + list.todos.length, 0);
  }

  const countCompletedTodos = () => {
   return stateLists.reduce((total, list) => total + list.todos.filter(todo => todo.completed).length, 0);
  };

  const antallTodos = countTodos();
  const doneTodos = countCompletedTodos();

  const handleDeleteProfileImg = async () => {
    try {

    const response = await axios.delete('http://localhost:5000/uploads/deleteProfileImage', {
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

    const response = await axios.delete('http://localhost:5000/uploads/deleteProfileHeader', {
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

    if (!selectedFile) {
      alert("Vennligst velg en fil!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {

      const response = await axios.post('http://localhost:5000/uploads/profileImage', formData, {
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

    if (!selectedFile) {
      alert("Vennligst velg en fil!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {

      const response = await axios.post('http://localhost:5000/uploads/headerImage', formData, {
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
      fileInputRef.current.value = "";
      setHeaderTools(false);
    }
  }

  const handleProfileInputClick = () => {
    fileInputRef.current.click();
  }

  const handleHeaderInputClick = () => {
    headerInputRef.current.click();
  }

/*   const fetchProfile = async () => {
    try {
      if (token) {
        console.log("Token inside profile: ", token);
        const response = await axios.get('http://localhost:5000/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfileData(response.data);
        console.log('Dette er info som kom tilbake fra API: ', response)
      }
    } catch(error) {
      console.log("Error fetching profile: ", error);
    }
  }

  useEffect(() => {
  fetchProfile();
    
  },[token]) */

  const handleSave = async () => {
    setEditMode(false);
    setDeletePrompt(false);

    if (stateProfile.username !== newUsername || stateProfile.email !== newEmail) {

      try {
        const response = await axios.put(
          "http://localhost:5000/users/edit", 
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
  }

  const handleEdit = () => {
    setEditMode(true);
    setNewUsername(stateProfile.username);
    setNewEmail(stateProfile.email);
  }

  useEffect(() => {
    if (editMode) {
      usernameInputRef.current.focus();
    }
  }, [editMode]);

  const handleDeleteProfile = async() => {

    if (token) {
      try { 
        const response = await axios.delete("http://localhost:5000/users/delete",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        
        console.log("Delete response: ", response);
        console.log("Brukernavnet er her: ", response.data.username);
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
  }

  const editToolsEnter = () => {
    setEditTools(true);
  }
  const editToolsLeave = () => {
    setEditTools(false);
  }

  return (
    <>
      
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
          <IconContainer onClick={handleHeaderInputClick} iconName={"wired-outline-35-edit"} reveal={"in-reveal"} hover={"hover-circle"} size={40} />
          <IconContainer onClick={handleDeleteProfileHeader} iconName={"wired-outline-185-trash-bin"} reveal={"in-reveal"} hover={"hover-empty"} size={40} />
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
      className='profile-image-tools-container'>
        <IconContainer onClick={handleProfileInputClick} iconName={"wired-outline-35-edit"} reveal={"in-reveal"} hover={"hover-circle"} size={40} />
        <IconContainer onClick={handleDeleteProfileImg} iconName={"wired-outline-185-trash-bin"} reveal={"in-reveal"} hover={"hover-empty"} size={40} />
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
            className="material-symbols-rounded profile-edit" onClick={handleSave}>save</motion.div>
        }
        </AnimatePresence>
            <input ref={usernameInputRef} onKeyDown={(e) => e.key === "Enter" ? handleSave() : ""} onChange={(e) => setNewUsername(e.target.value)} id="editUsername" type="text" value={newUsername}/>
            <input onKeyDown={(e) => e.key === "Enter" ? handleSave() : ""} onChange={(e) => setNewEmail(e.target.value)} id="editEmail" type="text" value={newEmail}/>
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
          className="material-symbols-rounded profile-edit" onClick={handleEdit}>edit</motion.div>
          }
        </AnimatePresence>  
          <div className='profile-username'>{stateProfile.username}</div>
          <div className='profile-email'>{stateProfile.email}</div>
        </>
        )
        }
        
      </div>

      <div className='info-dump'>
        <div className='info-title one'>LISTER</div>
        <div className='info-title two'>TODOS</div>
        <div className='info-title three'>UTFØRTE TODOS</div>
        <div className='info-state'>{stateLists.length}</div>
        <div className='info-state'>{antallTodos}</div>
        <div className='info-state'>{doneTodos}</div>
      </div>
      <button className='delete-profile' onClick={() => setDeletePrompt(true)}>Slett profil</button>
      { !deletePrompt && 
      <>
      <p>Vil du virkelig slette profilen?</p>
        <div className='delete-prompt'>
          <button>Ja</button>
          <button>Nei</button>
        </div>
        </>
      }
      
    </div>
    </>
  )
}

export default Profile