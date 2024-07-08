import React from "react";
import Header from "../../../layouts/header/Header";
import NavBar from "../../../layouts/nav/NavBar";
import ButtonBlack from "../../../components/ButtonBlack";
import { Link } from "react-router-dom";

function Account() {
    return (
        <>
            <Header title="마이페이지" />
            <div className="border-b mb-[20px] h-[120px] py-[16px] ">
                <div className="flex justify-between">
                    <div className="flex items-center gap-[8px]">
                        <img
                            src="/assets/images/testDog_.svg"
                            className="w-[56px] h-[56px] rounded-[50px] "
                        />
                        <div>
                            <p className="body1 text-primary-300">닉네임</p>
                            <p className="body2 text-sub-100">test@test.com</p>
                        </div>
                    </div>
                    <div className="flex">
                        <img
                            src="/assets/images/authIcon.svg"
                            className="w-[20px] h-[20px]"
                        />
                        <p className="body2 text-primary-300">D-24</p>
                    </div>
                </div>
                <div className="ml-[56px] mb-[18px]">
                    <ButtonBlack text1="프로필 수정" />
                </div>
            </div>
            {/* 마이페이지 메뉴 시작 */}
            <ul>
                <Link to="/">
                    <li className="w-full flex justify-between py-[16px]">
                        <p>구독 관리 페이지</p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
                <Link to="/account/chatting">
                    <li className="w-full flex justify-between py-[16px]">
                        <p>1:1 채팅내역</p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
                <Link>
                    <li className="w-full flex justify-between py-[16px]">
                        <p>즐겨찾기 한 병원</p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
                <Link>
                    <li className="w-full flex justify-between py-[16px]">
                        <p>내가 쓴 글 목록</p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
                <Link>
                    <li className="w-full flex justify-between py-[16px]">
                        <p>펫 리스트</p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
            </ul>
            <NavBar />
        </>
    );
}

export default Account;
