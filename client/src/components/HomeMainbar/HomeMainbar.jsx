import React from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import './HomeMainbar.css'
import QuestionsList from './QuestionsList'
import { useSelector } from 'react-redux'
import { AllQuestionsList } from '../../features/questionSlice'
const HomeMainbar = () => {
  const User = JSON.parse(localStorage.getItem('authuser'));
  const navigate = useNavigate();
  const redirect = () => {
      alert('Log in or Sign up to ask question');
      navigate('/Auth')  
  }

  const questionList = useSelector(AllQuestionsList)  

  // var questionList=[
  //   {
  //     _id:'1',
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswer: 1,
  //     questionTitle: "What is a function ?",
  //     questionBody: "It mean to be",
  //     questionTags:['c','java'],
  //     userPosted: "Isu",
  //     askedOn:"1 jun",
  //     userId: 1,
  //     answer:[
  //       {
  //         answerBody:"answer",
  //         userAnswered:"Kyara",
  //         answeredOn:"1 jun",
  //         userId: 3
  //       }
  //     ]
  //   },
  //   {
  //     _id:'2',
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswer: 1,
  //     questionTitle: "What is an array ?",
  //     questionBody: "It mean to be",
  //     questionTags:['c','java'],
  //     userPosted: "Khalid",
  //     askedOn:"1 jun",
  //     userId: 2,
  //     answer:[
  //       {
  //         answerBody:"answer",
  //         userAnswered:"Isu",
  //         answeredOn:"1 jun",
  //         userId: 1
  //       }
  //     ]
  //   },{
  //     _id:'3',
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswer: 1,
  //     questionTitle: "What is main() methode ?",
  //     questionBody: "It mean to be",
  //     questionTags:['c','java'],
  //     userPosted: "Kyara",
  //     askedOn:"1 jun",
  //     userId: 3,
  //     answer:[
  //       {
  //         answerBody:"answer",
  //         userAnswered:"khalid",
  //         answeredOn:"1 jun",
  //         userId: 2
  //       }
  //     ]
  //   }
  // ] 

  const location = useLocation()
  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
         {
           location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
         }
         <Link to={User === null? redirect():'/AskQuestion'} className='ask-btn'>Ask Question</Link>
      </div>
      <div>
          {
            questionList === null?<h1>Loading...</h1>:
            <>
              <p>{questionList.length} questions</p>  
              <QuestionsList questionsList = {questionList} />            
            </>
          }
      </div>
    </div>
  )
}

export default HomeMainbar
