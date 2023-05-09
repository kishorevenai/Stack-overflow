import React,{ useEffect } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { authStatus, currentUser,currentUsers, logoutUser } from '../../features/authSlice'

const Navbar = () => {  
  const dispatch = useDispatch();     
  const navigate = useNavigate();
  let User = useSelector(currentUser)

  const handleLogOut = () => {
    try {      
      dispatch(logoutUser())
      navigate('/Auth');
    } catch (error) {
      console.log(error.message)
    }
  }  

  // useEffect(() => {
  //   const token = User?.token
  //   let decodedToken = null;
  //   if(token)
  //     decodedToken = decode(token)
  //     console.log(decodedToken)
  //     if(decodedToken.exp * 1000 < new Date().getTime()){
  //       console.log(decodedToken.exp);
  //       handleLogOut();
  //     }
  // })
  
  useEffect(() => { 
    if(User === null)
      dispatch(currentUsers())        
  },[dispatch])

 




  


  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo' alt="logo" ><img src={logo}></img></Link>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Product</Link>
            <Link to='/' className='nav-item nav-btn'>For Teams</Link>
            <form>
                <input type='text' placeholder='Search...'/>
                <img src={search} alt='search' width="18px" className='search-icon'/>
            </form>
            { 
               User === null ? <Link to="/Auth" className='nav-item nav-links'>Log In</Link> : 
               <>
                  <Link to={`/Users/${User.result?._id}`} style={{textDecoration:"none"}}><Avatar backgroundColor="#009dff" px="10px" py="15px" borderRadius="50%" color="white" >{User.result?.name.charAt(0).toUpperCase()}</Avatar></Link>
                  <button className='nav-item nav-links' onClick={handleLogOut}>Log out</button>
               </>
            }
        </div>
    </nav>
  )
}


export default Navbar
