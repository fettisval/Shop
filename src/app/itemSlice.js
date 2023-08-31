import {createSlice} from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: 'item',
    initialState: {
        limit: 6,
        filterValue: "",
        offset: 0,
    },
    reducers: {
        setLimit: (state, action) => {
            state.limit = action.payload;
        },
        setFilterValue: (state, action) => {
            state.filterValue = action.payload;
        },
        setOffset: (state, action) => {
            state.offset = action.payload;
        }
    },
});

export const {setLimit, setFilterValue, setOffset} = itemSlice.actions;

export default itemSlice.reducer;