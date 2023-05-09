import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logIn, signUp } from "../api/baseURL";
import { API } from "../api/baseURL";

const initialState = {
  authStatus: null,
  currentUser: null,
  allUsers: [],
};

export const handleSignUp = createAsyncThunk(
  "signup/handleSignUp",
  async (datas) => {
    try {
      const response = await signUp(datas);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
);
export const handleLogIn = createAsyncThunk(
  "login/handleLogIn",
  async (datas) => {
    try {
      const response = await logIn(datas);
      return response.data;
    } catch (error) {      
      return error.message;
    }
  }
);

export const getAllusers = createAsyncThunk("usersList/ListUsers", async () => {
  try {
    const allUsers = await API.get("/user/getAllUsers");
    return allUsers.data;
  } catch (error) {
    return error.message;
  }
});

export const updateUsers = createAsyncThunk('userUpdate/updateUser',async({id, name , about , tags }) => {
  console.log('----------------->',id,name,tags,about)
  try {
     const userUpdate = await API.patch(`/user/update/${id}`,{name , about , tags})     
     return userUpdate.data
  } catch (error) {
    return error.message
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    currentUsers: (state, action) => {
      const authUser = JSON.parse(localStorage.getItem("authuser"));
      state.currentUser = authUser;
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("authuser");
      state.authStatus = null;
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogIn.pending, (state, action) => {
        state.authStatus = "loading";
      })
      .addCase(handleLogIn.fulfilled, (state, action) => {
        if (action.payload === 401 || action.payload === 400) {
          state.authStatus = "failed";
          return;
        }
        state.currentUser = action.payload;
        localStorage.setItem("authuser", JSON.stringify(action.payload));
        state.authStatus = "success";
      })
      .addCase(handleLogIn.rejected, (state, action) => {
        state.authStatus = "failed";
      })
      .addCase(getAllusers.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          console.log("Could not fetch users");
        }
        state.allUsers = action.payload;
      })
      .addCase(updateUsers.fulfilled,(state,action) => {
        if(typeof action.payload === 'string')
           console.log(action.payload.message)        
        const filtredUser = state.allUsers.filter(item => item._id !== action.payload._id)
        const updatedData = [...filtredUser,action.payload]
        state.allUsers = updatedData
      })
  },
});

export const { currentUsers, logoutUser } = authSlice.actions;
export const authStatus = (state) => state.auth.authStatus;
export const currentUser = (state) => state.auth.currentUser;
export const authUsers = (state) => state.auth.allUsers;
export default authSlice.reducer;
