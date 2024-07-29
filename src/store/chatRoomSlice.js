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
        addChatRoom: (state, actions) => {
            state.chatRooms.push(actions.payload);
        },
    },
});

export default chatRoomSlice;

export const { setChatRooms, addChatRoom } = chatRoomSlice.actions;
