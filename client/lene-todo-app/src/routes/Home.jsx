import React from 'react';
import AddTodo from '../components/AddTodo';
import BG from '../assets/images/BG_1.jpeg';

const Home = () => {
  return (
    <div className='home-container'>
      <div className='home-bg'>
        <img src={BG} />
      </div>
    </div>
    
  )
}

export default Home