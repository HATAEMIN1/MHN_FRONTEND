import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { useNavigate } from "react-router-dom";
import ModalManager from "../../components/modal/ModalManager";
import ButtonBlack from "../../components/button/ButtonBlack";

function AccountEdit() {
    const navigate = useNavigate();
    const handleSubmit = (closeModal) => {
        // if (title && content) {
        //     const newPost = {
        //         title,
        //         content,
        //         images,
        //         createdAt: new Date().toISOString(),
        //     };
        //     onAddPost(newPost);
        //     console.log("Submitted Post:", newPost); // 콘솔에 데이터 출력
        closeModal(); // 모달 닫기
        navigate("/account"); // 리스트 페이지로 이동
    };

    return (
        <>
            <form>
                <ModalManager
                    modalContent={({ closeModal }) => (
                        <div>
                            <p>등록완료</p>
                            <ButtonBlack
                                handleClick={(e) => {
                                    e.preventDefault(); // 추가: 폼 제출 방지
                                    handleSubmit(closeModal);
                                }}
                                text1="확인"
                                style={{
                                    marginTop: "20px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    color: "blue",
                                }}
                            />
                        </div>
                    )}
                >
                    {({ openModal }) => (
                        <div>
                            <Header
                                title="게시글 등록"
                                button="완료"
                                handleClick={(e) => {
                                    e.preventDefault(); // 추가: 폼 제출 방지
                                    openModal();
                                }}
                            />
                        </div>
                    )}
                </ModalManager>
                <div className="h-full flex flex-col items-center justify-evenly">
                    {/* img s */}
                    <div className="py-[30px]">
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
            </form>
        </>
    );
}

export default AccountEdit;
