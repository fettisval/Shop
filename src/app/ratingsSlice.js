import { createSlice } from '@reduxjs/toolkit';

const ratingsSlice = createSlice({
    name: 'ratings',
    initialState: {
        ratings: [],
    },
    reducers: {
        setRatings: (state, action) => {
            state.ratings = action.payload;
        },
    },
});

export const { setRatings } = ratingsSlice.actions;
export default ratingsSlice.reducer;