import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function DChattingReqList() {
    const chatrooms = useSelector((state) => state.chatRoomSlice.chatRooms);
    const user = useSelector((state) => state.userSlice);
    console.log("logged in user:", user);
    // If chatrooms are not available or loading, show a placeholder message
    if (!chatrooms || chatrooms.length === 0) {
        return (
            <>
                <Header title="실시간 채팅 요청" />
                <div className="w-full text-center py-[16px]">
                    <p className="body2 text-sub-100">채팅 요청이 없습니다.</p>
                </div>
            </>
        );
    }
    return (
        <>
            <Header title="실시간 채팅 요청" />
            {chatrooms.map((chatroom, idx) => {
                return (
                    <Link
                        key={`${chatroom.senderId}-${chatroom.recipientId}-${idx}`}
                        to={`/chatboards/${chatroom.senderId}/${chatroom.recipientId}`}
                        className="w-full block"
                    >
                        <div className="flex justify-between items-center my-[16px]">
                            <div className="flex flex-grow gap-[8px]">
                                <div className="w-[80px] flex-shrink-0 ">
                                    <img
                                        src="/assets/logoColor.png"
                                        className="block w-full rounded-[4px]"

                                    />
                                </div>
                                <div>
                                    <div className="py-[4px] subtitle3 text-primary-300">
                                        {chatroom.title || "제목 없음"}
                                    </div>
                                    <div className="body2 text-sub-100">
                                        {chatroom.address || "주소 없음"}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center flex-shrink-0 gap-[4px]">
                                <div>
                                    <img src="/assets/images/likeIcon_color.svg" />
                                </div>
                                <div>{chatroom.likes || 0}</div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </>
    );
}

export default DChattingReqList;
