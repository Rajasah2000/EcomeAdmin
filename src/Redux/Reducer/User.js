import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    login_status : false,
  },
  reducers: {
    setUser(state,action) {
      const user = action.payload;
      return {...state, userData:user,login_status:true}
    },
    setImg: (state, action) => void(state.userData.image = action.payload),
    removeUser(state,action) {
       return {...state, userData:{},login_status:false}
    }
  }
})

export const {  setUser, setImg, removeUser } = userSlice.actions;

export default userSlice.reducer;
