import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import { useLocation } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import moment from 'moment'
import './Questions.css'
import { useSelector,useDispatch } from 'react-redux'
import { currentUser } from '../../features/authSlice'
import { deleteSingleAnswer } from '../../features/questionSlice'

const DisplayAnswers = ({question}) => {
  const { id } = useParams();  
  const dispatch = useDispatch();
  const User = useSelector(currentUser)
  const location = useLocation()  
  const url = 'http://localhost:3000'
  const handleShare = () => {
    copy(url + location.pathname)
    alert('Copied url: '+url+location.pathname )
 }

  const handleDelete = (answerId,noOfAnswers) => {
    const noOfAnswer = noOfAnswers - 1;    
    try {
      dispatch(deleteSingleAnswer({id,answerId,noOfAnswer})).unwrap();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      {
        question.answer.map(ans => (
            <div className='display-ans' key={ans._id}>
              <p>{ans.answerBody}</p>
              <div className='question-actions-user'>
                <div>
                    <button type='button' onClick={handleShare}>Share</button>
                    {
                      User?.result?._id === ans?.userId && (
                        <button type='button' onClick={() => handleDelete(ans._id,question.noOfAnswer)}>Delete</button>
                      )                      
                    }                    
                </div>
                <div className='rubber'>
                     <p>answered on {moment(ans.answeredOn).fromNow()}</p>
                     <Link to={`/User/${ans.userId}`} className='user-link' style={{color:'#0086d8'}}>
                        <Avatar backgroundColor="green" px="8px" py="15px" >{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                        <div>
                            {ans.userAnswered}
                        </div>
                    </Link>
                </div>
              </div>              
            </div>
        ))
      }
    </div>
  )
}

export default DisplayAnswers
