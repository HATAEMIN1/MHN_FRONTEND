import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chatRoomSlice from "./chatRoomSlice";
const store = configureStore({
    reducer: {
        userSlice,
        chatRoomSlice: chatRoomSlice.reducer,
    },
});
export default store;
