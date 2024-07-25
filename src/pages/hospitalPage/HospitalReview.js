import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import ModalManager from "../../components/modal/ModalManager";
import ButtonClear from "../../components/button/ButtonClear";

//n분전 구현
function getTimeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    // memberId값 나중에 로그인유저로 바뀌어야함

    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
        return "방금 전";
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}분 전`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}시간 전`;
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}일 전`;
    } else if (diffInSeconds < 31536000) {
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months}개월 전`;
    } else {
        const years = Math.floor(diffInSeconds / 31536000);
        return `${years}년 전`;
    }
}

function HospitalReview() {
    const [rating, setRating] = useState([true, true, true, true, true]);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleOnclick = (idx) => {
        setRating(rating.map((item, index) => (index > idx ? false : true)));
    };
    useEffect(() => {}, [rating]);
    const { hpId } = useParams();
    const memberId = 4;

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim() !== "") {
            const trueCount = rating.filter(Boolean).length;
            const newComment = {
                content: commentText,
                profileImage: `${process.env.PUBLIC_URL}/assets/images/profile_default.png`,
                likeCount: trueCount,
            };

            // DB로 전송 포스트요청
            const body = {
                memberId: memberId,
                hospitalId: hpId,
                comment: newComment.content,
                rating: newComment.likeCount,
            };

            try {
                await axiosInstance.post(
                    `/hospitals/review?hospitalId=${hpId}`,
                    body
                );
                setShouldRefetch(true);
                setCommentText("");
            } catch (error) {
                console.error("에러 발생:", error);
            }
        }
    };

    async function fetchHospitalComment() {
        try {
            const res = await axiosInstance.get(
                `/hospitals/review?hospitalId=${hpId}`
            );

            console.log(res.data);
            setComments(res.data);
            setShouldRefetch(false); // 데이터를 가져온 후 리페치 플래그 재설정
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchHospitalComment();
    }, [shouldRefetch]);

    const handleDeleteComment = async (commentId, closeModal) => {
        console.log("댓글 삭제할거임");

        try {
            const response = await axiosInstance.delete(
                `/hospitals/review?id=${commentId}`
            );
            console.log(comments);
            setShouldRefetch(true);
            closeModal(); // 모달 닫기
        } catch (error) {
            console.error("삭제요청실패", error);
        }
    };

    const handleCommentChange = (e) => {
        const newText = e.target.value;
        setCommentText(newText);
        // 실시간으로 댓글 길이 체크
        if (newText.trim().length > 0 && newText.length <= 200) {
            setIsValid(true);
            setErrorMessage("");
        } else if (newText.length > 200) {
            setIsValid(false);
            setErrorMessage("댓글은 200자 이내로 작성해주세요");
        } else {
            setIsValid(false);
            setErrorMessage("");
        }
    };

    return (
        <>
            <Header title="병원 상세 정보" />
            <div>
                <img
                    src="/assets/images/testHospital.svg"
                    className="m-auto w-full mb-[24px]"
                />
            </div>
            <div className="py-[16px]">
                <ul className="flex justify-around gap-[2px]">
                    <Link to={`/hospitals/${hpId}`} className="border-b w-full">
                        <li className=" text-center body2">병원정보</li>
                    </Link>
                    <li className="border-b-2 w-full text-center body2">
                        진료후기
                    </li>
                </ul>
            </div>
            <form onSubmit={handleCommentSubmit}>
                <div className="flex items-center mb-[20px] gap-[4px]">
                    <p className="mini text-gray-300">
                        {comments.length}개의 후기
                    </p>
                    <div className="border flex">
                        {rating.map((item, idx) => {
                            return item ? (
                                <img
                                    src="/assets/images/ratingIcon_color.svg"
                                    onClick={() => handleOnclick(idx)}
                                />
                            ) : (
                                <img
                                    src="/assets/images/ratingIcon_clear.svg"
                                    onClick={() => handleOnclick(idx)}
                                />
                            );
                        })}
                    </div>
                </div>
                {/* 자유게시판 댓글작성 인풋폼 가져오기 컴포넌트 */}
                {/* 댓글입력폼 start */}
                {/* <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        border: "1px solid #ddd",
                        borderRadius: "15px", // 테두리를 둥글게 설정
                        padding: "5px 10px",
                        boxSizing: "border-box",
                        marginBottom: "20px",
                    }}
                >
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="댓글을 입력하세요"
                        style={{
                            flex: 1,
                            marginRight: "10px",
                            border: "none", // 입력창의 기본 테두리 제거
                            outline: "none", // 입력창에 포커스 시 생기는 테두리 제거
                            padding: "5px",
                            boxSizing: "border-box",
                        }}
                    />
                    <button
                        onClick={handleCommentSubmit}
                        style={{
                            border: "none",
                            background: "none",
                            color: "#888",
                            cursor: "pointer",
                            padding: "0",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src="/assets/images/enterIcon.svg"
                            alt="댓글 달기"
                            style={{ width: "20px", height: "20px" }}
                        />
                    </button>
                </div> */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        marginBottom: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            border: "1px solid #ddd",
                            borderRadius: "15px",
                            padding: "5px 10px",
                            boxSizing: "border-box",
                        }}
                    >
                        <input
                            type="text"
                            value={commentText}
                            onChange={handleCommentChange}
                            placeholder="댓글을 입력하세요 (1-200자)"
                            style={{
                                flex: 1,
                                marginRight: "10px",
                                border: "none",
                                outline: "none",
                                padding: "5px",
                                boxSizing: "border-box",
                            }}
                        />
                        <button
                            onClick={handleCommentSubmit}
                            disabled={!isValid}
                            style={{
                                border: "none",
                                background: "none",
                                color: isValid ? "#888" : "#ccc",
                                cursor: isValid ? "pointer" : "not-allowed",
                                padding: "0",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src="/assets/images/enterIcon.svg"
                                alt="댓글 달기"
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    opacity: isValid ? 1 : 0.3,
                                }}
                            />
                        </button>
                    </div>
                    {errorMessage && (
                        <p
                            style={{
                                color: "red",
                                fontSize: "12px",
                                marginTop: "5px",
                            }}
                        >
                            {errorMessage}
                        </p>
                    )}
                </div>
                {/* 댓글입력폼 end */}

                {comments.map((item) => {
                    // console.log(item);
                    return (
                        <div className="mb-[20px]">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center w-full gap-[10px]">
                                    <img
                                        src="/assets/images/testDog.svg"
                                        className="w-[50px] h-[50px] rounded-[50px]"
                                    />
                                    <div>
                                        <p className="subtitle2 text-primary-300">
                                            닉네임
                                        </p>
                                        <p className="body2 text-sub-200">
                                            {item.comment}
                                        </p>
                                        <div className="flex gap-[4px]">
                                            <p className="mini text-gray-300">
                                                {getTimeAgo(item.createdAt)} |
                                            </p>
                                            {/* 나중에 삭제하기버튼은 로그인유저값이랑 댓글작성자 아이디값 동일할때만 보이도록 프론트단에서 처리해야함 삼항연산자 */}

                                            <ModalManager
                                                modalContent={({
                                                    closeModal,
                                                }) => (
                                                    <div>
                                                        <p className="mb-[8px]">
                                                            댓글을 삭제할까요?
                                                        </p>
                                                        {/* <div className="flex gap-[4px]">
                                                            <ButtonClear
                                                                handleClick={(
                                                                    e
                                                                ) => {
                                                                    handleDeleteComment(
                                                                        item.id
                                                                    );
                                                                }}
                                                                text1="네"
                                                            />
                                                            <ButtonClear
                                                                handleClick={(
                                                                    e
                                                                ) => {
                                                                    closeModal();
                                                                }}
                                                                text1="아니요"
                                                            />
                                                        </div> */}
                                                        <ButtonClear
                                                            text1="네"
                                                            text2="아니요"
                                                            handleClick={(
                                                                e
                                                            ) => {
                                                                handleDeleteComment(
                                                                    item.id
                                                                );
                                                                closeModal();
                                                            }}
                                                            handleClick2={(
                                                                e
                                                            ) => {
                                                                closeModal();
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            >
                                                {({ openModal }) => (
                                                    <div onClick={openModal}>
                                                        <p className="mini text-gray-300 cursor-pointer">
                                                            삭제하기
                                                        </p>
                                                    </div>
                                                )}
                                            </ModalManager>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-[2px]">
                                    <img src="/assets/images/ratingIcon_color.svg" />
                                    <p>{item.rating}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </form>
            <NavBar />
        </>
    );
}

export default HospitalReview;
