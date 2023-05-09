import React from 'react'
import Questions     from './Questions'

const   QuestionsList = ({questionsList}) => {
  return (
    <>
       {
          questionsList.length !==0 ? questionsList.map(question => (
            <Questions question={question} key={question._id}/>
          )):"Please wait a min...."
       }         
    </>
  )
}

export default QuestionsList
