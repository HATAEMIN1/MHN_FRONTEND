import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ChattingListForm({ filteredChatrooms }) {
    const chatrooms = useSelector((state) => state.chatRoomSlice.chatRooms);
    console.log("chatrooms:", chatrooms);
    console.log("fileredChatRooms:", filteredChatrooms);
    const displayChatrooms =
        filteredChatrooms.length > 0 ? filteredChatrooms : chatrooms;

    // 랜덤 병원 이미지 출력
    const getRandomImageNumber = () => Math.floor(Math.random() * 17) + 1;
    return (
        <>
            {displayChatrooms.map((chatroom, idx) => {
                return (
                    <Link
                        key={`${chatroom.senderId}-${chatroom.recipientId}-${idx}`}
                        to={`/chatboards/${chatroom.senderId}/${chatroom.recipientId}`}
                        className="w-full block"
                    >
                        <div className="flex justify-between items-center my-[16px]">
                            <div className="flex flex-grow gap-[8px]">
                                <div className="w-[80px] h-[80px] flex-shrink-0 ">
                                    <img
                                        src={`/assets/images/hospitalImage${getRandomImageNumber()}.svg`}
                                        className="block w-full rounded-[4px] h-full object-cover "
                                    />
                                </div>
                                <div>
                                    <div className="py-[4px] subtitle3 text-primary-300">
                                        {chatroom.title}
                                    </div>
                                    <div className="body2 text-sub-100">
                                        {chatroom.address}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center flex-shrink-0 gap-[4px]">
                                <div>
                                    <img src="/assets/images/likeIcon_color.svg" />
                                </div>
                                <div className="mini text-gray-300">
                                    {chatroom.likes}
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </>
    );
}

export default ChattingListForm;
