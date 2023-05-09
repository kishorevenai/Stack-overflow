import React from "react";

const TagsLists = ({Tag}) => {
  return( 
    <div className="Tag">
    <h4>{Tag.tagName}</h4>
    <p>{ Tag.tagDesc }</p>    
    </div>
  )
  
};

export default TagsLists;
