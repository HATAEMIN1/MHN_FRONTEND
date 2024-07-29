import React, { useEffect } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link } from "react-router-dom";
import FilterModalManager from "../../components/modal/FilterModalManager";
import Searchbar from "../../components/search/Searchbar";
import ChattingListForm from "../../components/Form/ChattingListForm";
import PlusButton from "../../components/button/PlusButton";
import axiosInstance from "../../utils/axios";

function ChattingList() {
    const handleModalOpen = () => {
        console.log("모달 버튼 클릭됨");
    };

    // useEffect(() => {
    //     const fetchChatRoomDTO = async () => {
    //         try {
    //             const response = await axiosInstance.get(
    //                 "chat/room/11_12_cf26ec75-5944-4ee3-8687-cf3cfcdecfca"
    //             );
    //             const chatRoomDTO = response.data;
    //             const chatRoom = chatRoomDTO.chatRoom;
    //             chatRoom.title = "코드랩아카데미병원";
    //             chatRoom.likes = 300;
    //             chatRoom.address =
    //                 "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 1층";
    //             console.log("chatroom:", chatRoom);

    //             const postResponse = await axiosInstance.post(
    //                 "chat/room",
    //                 chatRoom,
    //                 {
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                 }
    //             );

    //             console.log("Saved new chat room:", postResponse.data);
    //         } catch (error) {
    //             console.error(
    //                 "Error getting chatRoomDTO of chatRoomId 11_12_cf26ec75-5944-4ee3-8687-cf3cfcdecfca",
    //                 error
    //             );
    //         }
    //     };
    //     fetchChatRoomDTO();
    // }, []);

    return (
        <>
            <Header title="1:1 채팅 게시판" />
            {/* tab메뉴 */}
            <div className="py-[16px]">
                <ul className="flex justify-around gap-[2px]">
                    <li className=" text-center body2 border-b-2 w-full">
                        1:1 채팅 게시판
                    </li>
                    <Link to="/boards" className=" w-full">
                        <li className="border-b w-full text-center body2">
                            자유 게시판
                        </li>
                    </Link>
                </ul>
            </div>
            {/* tab메뉴 end */}
            {/* 검색창 + 필터모달버튼 start */}
            <div className="flex items-center gap-[8px] mb-[20px]">
                <Searchbar />
                <FilterModalManager
                    modalOpen={
                        <div
                            onClick={handleModalOpen}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src="/assets/images/filterIcon.svg"
                                alt="Filter"
                                className="w-[24px]"
                                // style={{ marginLeft: "auto" }}
                            />
                        </div>
                    }
                    onOpenModal={handleModalOpen}
                />
            </div>
            {/* 검색창 + 필터모달버튼 end */}
            {/* 채팅창 리스트 start*/}
            <div>
                <ChattingListForm />
            </div>
            <PlusButton />
            <NavBar />
        </>
    );
}

export default ChattingList;
