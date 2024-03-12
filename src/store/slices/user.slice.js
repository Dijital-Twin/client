import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: -1,
        fullname: '',
        username: '',
        email: '',
        profile_pic: '',
    },
    reducers: {
        changeUser: (state, action) => ({ ...state, ...action.payload }),
    },
})

export const { changeUser } = userSlice.actions
export default userSlice.reducer