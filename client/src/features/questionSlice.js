import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../api/baseURL";

const initialState = {
  questionsList: [],
  answers: [],
};

export const fetchAllQuestions = createAsyncThunk(
  "fetchQuestions/fetchAllQuestions",
  async () => {
    try {
      const questionsList = await API.get("/questions/get");
      console.log(questionsList);
      return questionsList.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateQuestions = createAsyncThunk(
  "QuestionUpdate/updateQuestions",
  async (datas) => {
    try {
      const questionsList = await API.post("/questions/Ask", datas);      
      return questionsList.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateAnswer = createAsyncThunk(
  "Answers/AllAnswers",
  async (datas) => {
    const { id, noOfAnswer, answerBody, userAnswered,userId } = datas;
    try {
      const UserAnswer = await API.patch(`/answers/post/${id}`, {
        noOfAnswer,
        answerBody,
        userAnswered,
        userId
      });
      return UserAnswer.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteQustions = createAsyncThunk('deleteQuestion/questionDelete',async(datas) => {  
    const { _id } = datas
    try {
      const result = await API.delete(`/delete/${_id}`)      
      if(result.status === 200) 
        return datas;  
      return `${result.status}:${result.statusText}`
    } catch (error) {
        return error.message
    }
})

export const deleteSingleAnswer = createAsyncThunk('deleteSingleQuestion/singleQuestionDelete',async(message) => {
  const {id,answerId,noOfAnswer} = message    
    try {
      const result = await API.patch(`/answers/deleteAnswer/${id}`,{answerId,noOfAnswer});
      console.log(result)
      return result.data;
    } catch (error) {      
      return error.message;
    }
})

export const VoteQuestion = createAsyncThunk('upVote/voteUp',async(data) => {
  const { id , value, userNumber } = data
    try {
       const result = await API.patch(`/votes/vote/${id}`,{ value,userNumber });
       return result.data
    } catch (error) {
      return error.message
    }
})

const questionSlice = createSlice({
  name: "question",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {        
        state.questionsList = action.payload;
      })
      .addCase(updateQuestions.fulfilled, (state, action) => {        
        let dupArray = [...state.questionsList, action.payload];
        // state.questionsList.push(action.payload);
        state.questionsList = dupArray;
      })
      .addCase(updateAnswer.fulfilled, (state, action) => {
        const filteredData = state.questionsList.filter(item => item._id !== action.payload._id)        
        const updatedData = [...filteredData,action.payload]    
        state.questionsList = updatedData
      })
      .addCase(deleteQustions.fulfilled,(state,action) => {
        if(!action?.payload?._id){
          console.log('Delete could not complete');
          console.log(action.payload);
        }     
        const filteredData = state.questionsList.filter(item => item._id !== action.payload._id)   
        state.questionsList = filteredData;
      })
      .addCase(deleteSingleAnswer.fulfilled,(state,action) => {
         if(action?.payload.error){
          console.log('Cannot delete the answer')          
          console.log(action.error.message)
         }         
         const filteredQuestion = state.questionsList.filter(item => item._id !== action.payload._id)
         const updatedQuestion = [...filteredQuestion,action.payload];
         state.questionsList = updatedQuestion;         
      })
      .addCase(VoteQuestion.fulfilled,(state,action) => {
        const filteredData = state.questionsList.filter(item => item._id !==action.payload._id)
        const updatedData = [...filteredData,action.payload]
        state.questionsList = updatedData
      })
      
  },
});
export const AllQuestionsList = (state) => state.questions.questionsList;
export default questionSlice.reducer;
