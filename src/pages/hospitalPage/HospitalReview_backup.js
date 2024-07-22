import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";

//n분전 구현
function getTimeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
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
    const handleOnclick = (idx) => {
        setRating(rating.map((item, index) => (index > idx ? false : true)));
    };
    useEffect(() => {}, [rating]);
    const { hpId } = useParams();

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

    const handleDeleteComment = async (commentId) => {
        console.log("댓글 삭제할거임");

        try {
            const response = await axiosInstance.delete(
                `/hospitals/review?id=${commentId}`
            );
            console.log(comments);
            setShouldRefetch(true);
        } catch (error) {
            console.error("삭제요청실패", error);
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
                                            <div
                                                onClick={() =>
                                                    handleDeleteComment(item.id)
                                                }
                                            >
                                                <p className="mini text-gray-300 cursor-pointer">
                                                    삭제하기
                                                </p>
                                            </div>
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
