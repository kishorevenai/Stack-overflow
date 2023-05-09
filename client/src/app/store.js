import { configureStore } from '@reduxjs/toolkit'
import authReducers from '../features/authSlice'
import questionReducers from '../features/questionSlice'


export const store = configureStore({
    reducer:{
        auth:authReducers,
        questions:questionReducers
    }
})

