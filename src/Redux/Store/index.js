import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from '../Reducer';


const Store =  configureStore({
  reducer,
  middleware :[...getDefaultMiddleware({thunk:false})] 
})

export default Store;
