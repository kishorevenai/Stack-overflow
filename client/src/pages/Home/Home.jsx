import React from 'react'
import './Home.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'

const Home = () => {
  return (
    <div className='home-container-1'>
       <LeftSidebar/>
       <div className='home-container-2'>
          <HomeMainbar/>
       </div>        
       <RightSidebar/>         
    </div>
  )
}

export default Home
