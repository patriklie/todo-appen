import React from 'react';
import AddTodo from '../components/AddTodo';
import BG from '../assets/images/BG_18.jpeg';

const Home = () => {
  return (
    
      <div className='home-container-div'>
        <img className='home-bg-img' src={BG} />
        <div className='welcome-container'></div>
      </div>
    
  )
}

export default Home