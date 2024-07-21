import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link } from "react-router-dom";
import FilterModalManager from "../../components/modal/FilterModalManager";
import Searchbar from "../../components/search/Searchbar";
import ChattingListForm from "../../components/Form/ChattingListForm";
import PlusButton from "../../components/button/PlusButton";

function ChattingList() {
    const hospitalExam = [
        {
            title: "코드랩아카데미병원",
            content:
                "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층 가나다라마바사아자차 자잗자ㅣ겆디",
            like: 333,
        },
        {
            title: "코드랩아카데미병원22",
            content: "어쩌구저쩌구어어어어어어ㅏ",
            like: 10,
        },
    ];

    const handleModalOpen = () => {
        console.log("모달 버튼 클릭됨");
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
            <div style={{ display: "flex" }}>
                <ChattingListForm hospitalList={hospitalExam} />
            </div>
            <PlusButton />
            <NavBar />
        </>
    );
}

export default ChattingList;
