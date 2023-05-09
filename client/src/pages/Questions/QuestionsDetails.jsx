import React, { useState } from "react";
import { useParams, Link, useNavigate , useLocation } from "react-router-dom";
import copy from 'copy-to-clipboard'
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import moment from 'moment'
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswers from "./DisplayAnswers";
import { useDispatch, useSelector } from "react-redux";
import { AllQuestionsList, VoteQuestion, deleteQustions, updateAnswer } from "../../features/questionSlice";
import { currentUser } from "../../features/authSlice";

const QuestionsDetails = () => {
  const [answerBody, setAnswerBody] = useState(" ");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();  
  const questionList = useSelector(AllQuestionsList);
  const User = useSelector(currentUser);
  const url = 'http://localhost:3000'
  
  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      alert("Login or Signup to answer a question");
      navigate("/Auth");
    } else {
      if (answerBody === " ") alert("Enter an answer before submitting");
      else
        dispatch(
          updateAnswer({
            id,
            noOfAnswer: answerLength + 1,
            answerBody,
            userAnswered: User.result.name,
            userId:User.result._id
          })
        );
    }
  };

  const handleShare = () => {
     copy(url + location.pathname)
     alert('Copied url: '+url+location.pathname )
  }
  const handleDelete = (datas) => {
    try {
      dispatch(deleteQustions(datas)).unwrap();
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleUpVote = () => {
    const data = {id , value:'downVote' , userNumber:User.result._id}
    try {
      dispatch(VoteQuestion(data)).unwrap();
    } catch (error) {
      console.log(error.message)
    }    
  }

  const handleDownVote= () => {
    const data = {id , value:'upVote' , userNumber:User.result._id}
    try {
      dispatch(VoteQuestion(data)).unwrap();    
    } catch (error) {
      console.log(error.message)
    }  
  }
  return (
    <div className="question-details-page">
      {questionList === null ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {questionList
            .filter((item) => item._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt="upvote"
                        width="18"
                        className="votes-icon"
                        onClick={() => handleUpVote()}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt="downvote"
                        width="18"
                        className="votes-icon"
                        onClick={() => handleDownVote()}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {
                          question.questionTags.map((tags) => (
                          <p>{tags}</p>
                          ))
                        }
                      </div>
                      <div className="question-action-user">
                        <div>
                          
                        <button type="button" onClick={handleShare}>Share</button>                                                
                          {
                             User?.result?._id === question?.userNumber  && (
                              <button type="button" onClick={() => handleDelete(question)}>Delete</button>
                             )                          
                          }                                                    
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()  }</p>
                          <Link
                            to={`/User/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar backgroundColor="orange" px="8px" py="15px">
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswer !== 0 && (
                  <section>
                    <h3>{question.noOfAnswer} answers</h3>
                    <DisplayAnswers key={question._id} question={question} />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => handlePostAns(e, question.answer.length)}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={answerBody}
                      onChange={(e) => setAnswerBody(e.target.value)}
                    ></textarea>
                    <button
                      type="submit"
                      className="post-ans-btn"
                      value="post your answer"
                    >
                      post your answer
                    </button>
                  </form>
                  <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}
                      </Link>
                    ))}{" "}
                    or{" "}
                    {
                      <Link
                        to="/AskQuestion"
                        style={{ textDecoration: "none", color: "#009dff" }}
                      >
                        ask you own question
                      </Link>
                    }
                  </p>
                </section>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default QuestionsDetails;
