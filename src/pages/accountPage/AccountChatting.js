import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { useSelector } from "react-redux";
import ChattingListForm from "../../components/Form/ChattingListForm";

function AccountChatting() {
    const chatrooms = useSelector((state) => state.chatRoomSlice.chatRooms);
    const userId = useSelector((state) => state.userSlice.id);
    console.log("logged in user's userId:", userId);
    let filteredChatrooms = [];
    for (let i = 0; i < chatrooms.length; i++) {
        if (chatrooms[i].senderId == userId)
            filteredChatrooms.push(chatrooms[i]);
    }
    // console.log("filtered chatRooms:", filteredChatrooms);
    return (
        <>
            <Header title="1:1 채팅 내역" />
            {filteredChatrooms.length == 0 ? (
                <div className="text-sm mt-5 font-bold flex justify-center">
                    아직 채팅 내역이 없습니다.
                </div>
            ) : (
                <ChattingListForm filteredChatrooms={filteredChatrooms} />
            )}

            <NavBar />
        </>
    );
}

export default AccountChatting;
