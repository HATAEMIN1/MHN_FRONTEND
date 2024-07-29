import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link } from "react-router-dom";
import FilterModalManager from "../../components/modal/FilterModalManager";
import Searchbar from "../../components/search/Searchbar";
import ChattingListForm from "../../components/Form/ChattingListForm";
import PlusButton from "../../components/button/PlusButton";
import axiosInstance from "../../utils/axios";

function ChattingList() {
    const [chatrooms, setChatrooms] = useState([]);
    const [filteredChatrooms, setFilteredChatrooms] = useState([]);

    const fetchChatrooms = async () => {
        try {
            const response = await axiosInstance.get("/chatrooms");
            setChatrooms(response.data);
            setFilteredChatrooms(response.data); // Initialize with all chatrooms
        } catch (error) {
            console.error("Error fetching chatrooms:", error);
        }
    };

    useEffect(() => {
        fetchChatrooms();
    }, []);

    const handleModalOpen = () => {
        console.log("모달 버튼 클릭됨");
    };

    const onSearch = (searchVal) => {
        console.log(searchVal);
        const filtered = chatrooms.filter(
            (chatroom) =>
                chatroom.title.includes(searchVal) ||
                chatroom.address.includes(searchVal)
        );
        console.log("filtered chatrooms:", filtered);
        setFilteredChatrooms(filtered);
    };

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
                <Searchbar onSearch={onSearch} />
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
                <ChattingListForm chatrooms={filteredChatrooms} />
            </div>
            <PlusButton />
            <NavBar />
        </>
    );
}

export default ChattingList;
