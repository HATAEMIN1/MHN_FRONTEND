import React, { useEffect } from "react";
import Header from "../../layouts/header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DoctorNav from "../../layouts/nav/DoctorNav";

function DChattingReqList() {
    // Redux store에서 loginState를 가져옵니다.
    const loginState = useSelector((state) => state.userSlice);
    const navigate = useNavigate();

    const chatrooms = useSelector((state) => state.chatRoomSlice.chatRooms);
    const user = useSelector((state) => state.userSlice);
    console.log("logged in user:", user);

    useEffect(() => {
        // loginState가 존재하고 doctorStatus가 PENDING일 때만 리다이렉트합니다.
        if (loginState && loginState.doctorStatus === "PENDING") {
            navigate("/doctors/register/pending");
        }
    }, [loginState, navigate]);

    // loginState가 없거나 doctorStatus가 PENDING이면 아무것도 렌더링하지 않습니다.
    if (!loginState || loginState.doctorStatus === "PENDING") {
        return null;
    }

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

    // 채팅방 병원 랜덤이미지
    const getRandomImageNumber = () => Math.floor(Math.random() * 17) + 1;

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
                                <div className="w-[80px] h-[80px] flex-shrink-0 ">
                                    <img
                                        src={`/assets/images/petImage${getRandomImageNumber()}.svg`}
                                        className="block w-full h-full rounded-[50px] object-cover"
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
                            {/* <div className="flex items-center flex-shrink-0 gap-[4px]">
                                <div>
                                    <img src="/assets/images/likeIcon_color.svg" />
                                </div>
                                <div>{chatroom.likes || 0}</div>
                            </div> */}
                        </div>
                    </Link>
                );
            })}
            <DoctorNav />
        </>
    );
}

export default DChattingReqList;
