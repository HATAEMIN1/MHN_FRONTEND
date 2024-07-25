import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axios";

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

const BoardComment = ({ freeBoardId, memberId }) => {
    const [comments, setComments] = useState([]);
    const [visibleComments, setVisibleComments] = useState(3); // 초기 표시할 댓글 수
    const [showFoldButton, setShowFoldButton] = useState(false); // 댓글 접기 버튼 상태
    const [commentText, setCommentText] = useState("");
    const commentsRef = useRef(null);

    useEffect(() => {
        axiosInstance
            .get(`/boards/comment?freeBoardId=${freeBoardId}`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the comments:",
                    error
                );
            });
    }, [freeBoardId]);

    useEffect(() => {
        const handleScroll = () => {
            if (commentsRef.current) {
                const { scrollTop, scrollHeight, clientHeight } =
                    commentsRef.current;
                if (scrollTop + clientHeight >= scrollHeight - 5) {
                    setShowFoldButton(true);
                } else {
                    setShowFoldButton(false);
                }
            }
        };

        if (commentsRef.current) {
            commentsRef.current.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (commentsRef.current) {
                commentsRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, [visibleComments]);

    const handleCommentSubmit = () => {
        if (commentText.trim() !== "") {
            const payload = {
                freeBoardId: freeBoardId,
                memberId: memberId, // 직접 전달하는 사용자 ID
                content: commentText,
                parentId: null, // or set the parentId if it's a reply to a comment
            };

            console.log("Submitting comment with payload:", payload); // 로그 추가

            axiosInstance
                .post("/boards/comment", null, { params: payload })
                .then((response) => {
                    const newComment = response.data;
                    setComments([...comments, newComment]);
                    setCommentText("");
                })
                .catch((error) => {
                    console.error(
                        "There was an error posting the comment:",
                        error
                    );
                });
        }
    };

    const handleLoadMoreComments = () => {
        setVisibleComments(visibleComments + 3); // 더보기 클릭 시 추가로 표시할 댓글 수
    };

    const handleFoldComments = () => {
        setVisibleComments(3); // 댓글 접기 시 초기 표시 댓글 수로 되돌림
        setShowFoldButton(false);
        if (commentsRef.current) {
            commentsRef.current.scrollTo(0, 0); // 스크롤을 최상단으로 이동
        }
    };

    const handleDeleteComment = (id) => {
        setComments(comments.filter((comment) => comment.id !== id));
    };

    console.log(comments);

    return (
        <div className="mt-4">
            <h3 className="text-sm text-gray-500">
                {comments.length}개의 댓글
            </h3>
            <div
                ref={commentsRef}
                className="comment-scroll max-h-80 overflow-y-auto"
            >
                <style>
                    {`
                    /* For Chrome, Edge, and Safari */
                    .comment-scroll::-webkit-scrollbar {
                        width: 3px;
                    }
                    .comment-scroll::-webkit-scrollbar-thumb {
                        background-color: #888;
                        border-radius: 3px;
                    }
                    .comment-scroll::-webkit-scrollbar-track {
                        background: transparent;
                    }

                    /* For Firefox */
                    .comment-scroll {
                        scrollbar-width: thin;
                        scrollbar-color: #888 transparent;
                    }
                    `}
                </style>
                {comments.slice(0, visibleComments).map((comment, index) =>
                    comment.step === 0 ? (
                        <div
                            key={index}
                            className="mb-4 flex justify-between items-center"
                        >
                            <div className="flex">
                                <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                                    <img
                                        src={comment.profileImage}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-bold">
                                        {comment.userId}
                                    </div>
                                    <div className="text-sm">
                                        {comment.content}
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center">
                                        {timeAgo(comment.createdAt)}
                                        <button className="ml-2 border-none bg-transparent text-gray-500 cursor-pointer">
                                            댓글달기
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {comment.userId === memberId && (
                                <button
                                    onClick={() =>
                                        handleDeleteComment(comment.id)
                                    }
                                    className="border-none bg-transparent text-gray-500 cursor-pointer"
                                >
                                    삭제
                                </button>
                            )}
                        </div>
                    ) : (
                        <div
                            key={index}
                            className="mb-4 flex justify-between items-center"
                        >
                            <div className="flex">
                                <img
                                    src="/assets/images/likeIcon_color.svg"
                                    alt="like icon"
                                />
                                <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                                    <img
                                        src={comment.profileImage}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-bold">
                                        {comment.userId}
                                    </div>
                                    <div className="text-sm">
                                        {comment.content}
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center">
                                        {timeAgo(comment.createdAt)}
                                        <button className="ml-2 border-none bg-transparent text-gray-500 cursor-pointer">
                                            댓글달기
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {comment.userId === memberId && (
                                <button
                                    onClick={() =>
                                        handleDeleteComment(comment.id)
                                    }
                                    className="border-none bg-transparent text-gray-500 cursor-pointer"
                                >
                                    삭제
                                </button>
                            )}
                        </div>
                    )
                )}
            </div>
            {visibleComments < comments.length && ( // 더보기 버튼 조건부 렌더링
                <button
                    onClick={handleLoadMoreComments}
                    className="border-none bg-transparent text-gray-500 cursor-pointer block mx-auto my-4"
                >
                    댓글 더보기
                </button>
            )}
            {showFoldButton &&
                visibleComments >= comments.length && ( // 접기 버튼 조건부 렌더링
                    <button
                        onClick={handleFoldComments}
                        className="border-none bg-transparent text-gray-500 cursor-pointer block mx-auto my-4"
                    >
                        댓글 접기
                    </button>
                )}
            <div className="absolute bottom-16 left-0 w-full px-4 py-2 bg-white border-t border-gray-300 flex items-center">
                <div className="flex items-center w-full border border-gray-300 rounded-lg px-4 py-2">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="댓글을 입력하세요"
                        className="flex-1 mr-4 border-none outline-none p-2 box-border"
                    />
                    <button
                        onClick={handleCommentSubmit}
                        className="border-none bg-transparent text-gray-500 cursor-pointer p-0 flex items-center"
                    >
                        <img
                            src="/assets/images/enterIcon.svg"
                            alt="댓글 달기"
                            className="w-5 h-5"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoardComment;
