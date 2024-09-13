import {configureStore} from "@reduxjs/toolkit";
import watchListSlice from "./slice/watchlist";

export const store  = configureStore({
    reducer:{
        watchListState:watchListSlice.reducer
    }
})