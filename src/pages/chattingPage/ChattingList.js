import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link } from "react-router-dom";
import FilterModalManager from "../../components/modal/FilterModalManager";
import Searchbar from "../../components/search/Searchbar";

function ChattingList() {
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
            {/* tab메뉴 end */}
            <div>ChattingList</div>
            <NavBar />
        </>
    );
}

export default ChattingList;
