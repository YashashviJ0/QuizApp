import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        user: null,
        //initially user is null 
    },
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload;
        },
        //this reducer basically sets the user to ehatever payload it gets through the actions
    },
});

export const { SetUser } = usersSlice.actions;
export default usersSlice.reducer;