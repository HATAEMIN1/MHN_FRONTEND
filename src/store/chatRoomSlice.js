import { createSlice } from "@reduxjs/toolkit";

const chatRoomSlice = createSlice({
    name: "chatRoom",
    initialState: {
        chatRooms: [],
    },
    reducers: {
        setChatRooms: (state, actions) => {
            state.chatRooms = actions.payload;
        },
    },
});

export default chatRoomSlice;

export const { setChatRooms } = chatRoomSlice.actions;
