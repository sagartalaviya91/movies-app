import {createSlice} from "@reduxjs/toolkit";

const watchListSlice  = createSlice({
    name:"watchListSlice",
    initialState:{
        watchList:[]
    },
    reducers:{
        setWatchList:(state,obj)=> {
            state.watchList = obj.payload; 
        }
    }
});

export default watchListSlice;