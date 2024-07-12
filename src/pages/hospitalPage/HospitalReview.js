import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link } from "react-router-dom";

//n분전 구현
function timeAgo(date) {
    const now = new Date();
    const secondsPast = (now.getTime() - new Date(date).getTime()) / 1000;

    if (secondsPast < 60) {
        return `${Math.floor(secondsPast)}초 전`;
    }
    if (secondsPast < 3600) {
        return `${Math.floor(secondsPast / 60)}분 전`;
    }
    if (secondsPast < 86400) {
        return `${Math.floor(secondsPast / 3600)}시간 전`;
    }
    if (secondsPast < 2592000) {
        return `${Math.floor(secondsPast / 86400)}일 전`;
    }
    if (secondsPast < 31536000) {
        return `${Math.floor(secondsPast / 2592000)}개월 전`;
    }
    return `${Math.floor(secondsPast / 31536000)}년 전`;
}

function HospitalReview() {
    const [rating, setRating] = useState([true, true, true, true, true]);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const handleOnclick = (idx) => {
        setRating(rating.map((item, index) => (index > idx ? false : true)));
    };
    useEffect(() => {}, [rating]);
    // console.log(rating);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim() !== "") {
            const trueCount = rating.filter(Boolean).length;
            setComments([
                {
                    // id: comments.length,
                    // userId: currentUserId,
                    content: commentText,
                    createdAt: new Date(),
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/profile_default.png`,
                    likeCount: trueCount,
                },
                ...comments,
            ]);
            // console.log(comments);
            setCommentText("");
        }
    };

    // console.log(commentText);
    // console.log(comments);
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
                    <Link to="/hospitals/:hpId" className="border-b w-full">
                        <li className=" text-center body2">병원정보</li>
                    </Link>
                    <li className="border-b-2 w-full text-center body2">
                        진료후기
                    </li>
                </ul>
            </div>
            <form>
                <div className="flex items-center mb-[20px]">
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
                <div
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
                </div>
                {/* 댓글입력폼 end */}
                {comments.map((item) => {
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
                                            {item.content}
                                        </p>
                                        <p className="mini text-gray-300">
                                            {timeAgo(item.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-[2px]">
                                    <img src="/assets/images/ratingIcon_color.svg" />
                                    <p>{item.likeCount}</p>
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
