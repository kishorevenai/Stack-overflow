import React, { useState } from "react";
import { currentUser } from "../../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import './EditProfileForm.css'
import { updateUsers } from "../../../features/authSlice";


const EditProfileForm = ({ currentProfile , setSwitch }) => {    
  const dispatch = useDispatch()
  const currentAuth = useSelector(currentUser);
  console.log('----------------->',currentAuth)
  const [name, setName] = useState(currentAuth?.result?.name);
  const [about, setAbout] = useState(currentAuth?.result?.about);
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {    
    e.preventDefault()
    const id =  currentAuth?.result?._id
    const tags = currentAuth?.result?.tags
    if(tags.length === 0){
      console.log(id,name,about,tags)
      dispatch(updateUsers({id, name , about , tags })).unwrap()
    }
    else{
      console.log(id,name,about,tags)
      dispatch(updateUsers(id,name , about , tags)).unwrap()
    }
    setSwitch(false)
  }
  return (
    <div className="AllForms">
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2"></h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display Name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </label>
        <label htmlFor="about">
            <h3>About me</h3>
          <textarea id="about" cols="30" rows="10" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
        </label>
        <label htmlFor="tags">
            <h3>Watched Tags</h3>
            <p>Add Tags separated by 1 space</p>
            <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value.split(' '))}   ></input>
        </label><br/>
        <button type="submit" className="user-submit-btn"></button><br/>
        <button type="button" className="user-cancel-btn" onClick={() => setSwitch(false)}>cancel</button>
      </form>
    </div>
  );
};

export default EditProfileForm;
