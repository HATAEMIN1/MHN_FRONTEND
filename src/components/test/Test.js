import React, { useEffect } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import ButtonBlack from "../../components/button/ButtonBlack";
import ButtonClear from "../../components/button/ButtonClear";
import FilterModalManager from "../modal/FilterModalManager";
// import Modal from "../../components/Modal";

function Test({ ...props }) {
    // 창훈이꺼 모달 컴포넌트 연습 - 제출하는 폼도 있어야 함
    // const handleSubmit = (closeModal) => {
    //     if (title && content) {
    //         const newPost = {
    //             title,
    //             content,
    //             images,
    //             createdAt: new Date().toISOString(),
    //         };
    //         onAddPost(newPost);
    //         console.log("Submitted Post:", newPost); // 콘솔에 데이터 출력
    //         closeModal(); // 모달 닫기
    //         navigate("/boards"); // 리스트 페이지로 이동
    //     }
    // };

    //=====================================================

    // function handleOutsideClick(e) {
    //     if (e.target.classList.contains("modal-overlay")) {
    //         onClose();
    //     }
    // }

    return (
        <>
            {/* gpej 타이틀 px20 */}
            {/* <Modal check={closeModal} /> */}
            <Header button="완료" title="테스트" />
            <div className="mini">이게아마안나오겠지?</div>
            <ButtonBlack text1="확인" height="45px" width="100%" />
            <ButtonBlack text1="중복체크" />
            <ButtonClear text1="확인" text2="아니오" />
            <ButtonClear text1="해제하기" />

            <div className="text-gray-100">테에에스트으으으</div>
            <div className="text-gray-200">테에에스트으으으</div>
            <div className="text-gray-300">테에에스트으으으</div>
            <div className="text-gray-400">테에에스트으으으</div>
            <FilterModalManager
                modalOpen={
                    <ButtonClear
                        text1="모달버튼"
                        handleClick={() => {
                            console.log("모달 버튼 클릭됨");
                        }}
                    />
                }
            />

            <NavBar />
        </>
    );
}

export default Test;
