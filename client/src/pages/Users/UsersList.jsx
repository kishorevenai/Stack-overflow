import React from 'react'
import { useSelector } from 'react-redux'
import { authUsers } from '../../features/authSlice'
import User from './User'

const UsersList = () => {
  const users = useSelector(authUsers)  
  return (
    <div className='userList-container'>
      {
        users.map(user => (
          <User user = {user} key={user?._id} />
        ))
      }        
    </div>
  )
}

export default UsersList
