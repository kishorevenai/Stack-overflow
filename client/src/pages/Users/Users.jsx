import React from 'react'
import './Users.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import { useLocation } from 'react-router-dom' 
import UsersList from './UsersList'
import RightSidebar from '../../components/RightSidebar/RightSidebar'

const Users = () => {  
  return (
    <div className='home-container-1-users'>
        <LeftSidebar/>        
        <div className="home-container-2-users">       
           <h1 className='HeaderUser' >Users</h1>  
           <UsersList/>          
        </div>    
        <RightSidebar/>                  
    </div>
  )
}

export default Users


