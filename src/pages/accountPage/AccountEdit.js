import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";

function AccountEdit() {
    return (
        <>
            <Header title="프로필 수정" />
            <div className="h-full flex flex-col items-center justify-evenly">
                {/* img s */}
                <div className="relative">
                    <img
                        src="/assets/images/dog44.png"
                        className="w-24 h-24 rounded-full"
                    />
                    <button className="bg-primary-300 w-8 h-8 rounded-full flex items-center justify-center absolute bottom-[-5px] right-[-10px]">
                        <img
                            src="/assets/images/camera_W.svg"
                            className="w-5 h-5"
                        />
                    </button>
                </div>

                {/* input s */}
                <div className="flex flex-col w-full border border-gray-200 rounded-lg px-5 py-4 gap-3 justify-center text-primary-300">
                    <p className="flex border-b border-gray-500 py-3 gap-2">
                        <span className="subtitle1">회원번호</span>
                        <input
                            placeholder="회원번호**"
                            className="body2 flex-grow text-sub-100 text-right  focus:outline-none"
                        />
                    </p>
                    <p className="flex border-b border-gray-500 py-3 gap-2">
                        <span className="subtitle1">닉네임</span>
                        <input
                            placeholder="닉네임**"
                            className="body2 flex-grow text-sub-100 text-right  focus:outline-none"
                        />
                        <img src="/assets/images/editIcon.svg" />
                    </p>
                    <p className="flex border-b border-gray-500 py-3 gap-2">
                        <span className="subtitle1">이메일</span>
                        <input
                            placeholder="이메일**"
                            className="body2 flex-grow text-sub-100 text-right  focus:outline-none"
                        />
                    </p>
                    <p className="flex border-b border-gray-500 py-3 gap-2">
                        <span className="subtitle1">비밀번호 변경</span>
                        <input className="body2 flex-grow text-sub-100 text-right  focus:outline-none" />
                        <img src="/assets/images/editIcon.svg" />
                    </p>
                    <p className="flex border-b border-gray-500 py-3 gap-2">
                        <span className="subtitle1">이름</span>
                        <input
                            placeholder="등록하기"
                            className="body2 flex-grow text-sub-100 text-right focus:outline-none"
                        />
                        <img src="/assets/images/editIcon.svg" />
                    </p>
                    <p className="flex border-b border-gray-500 py-3 gap-2">
                        <span className="subtitle1">휴대폰</span>
                        <input
                            placeholder="인증하기"
                            className="body2 flex-grow text-sub-100 text-right focus:outline-none"
                        />
                        <img src="/assets/images/editIcon.svg" />
                    </p>
                </div>
            </div>
            <NavBar />
        </>
    );
}

export default AccountEdit;
