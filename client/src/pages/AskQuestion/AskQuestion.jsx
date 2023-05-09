import React from "react";
import "./AskQuestion.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../../features/authSlice";
import { updateQuestions } from "../../features/questionSlice";

const AskQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector(currentUser)
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userNumber = User?.result?._id
    try {
      dispatch(
        updateQuestions({ questionTitle, questionBody, questionTags, userNumber })
      ).unwrap();
      setQuestionBody(" ");
      setQuestionTags(" ");
      setQuestionTitle("  ");
      navigate("/");
    } catch (error) {
      console.log(error);
    }

    navigate("/");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you're asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-title">
              <h4>Body</h4>
              <p>
                Include all the in formation someone would need to answer your
                question
              </p>
              <textarea
                type="text"
                id="ask-ques-title"
                value={questionBody}
                onChange={(e) => setQuestionBody(e.target.value)}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                onKeyPress={handleEnter}
              />
            </label>
            <label htmlFor="ask-ques-title">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-title"
                value={questionTags}
                onChange={(e) => setQuestionTags(e.target.value.split(" "))}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
          </div>
          <button type="submit"> Review your question</button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
