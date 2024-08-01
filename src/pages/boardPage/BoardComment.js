// 페이지 헤더에 등록연필버튼 로그인유저한테만 열리도록 모달 / 페이지 이동
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

const BoardComment = ({ freeBoardId, memberId, onCommentsUpdate }) => {
    const [comments, setComments] = useState([]);
    const [visibleComments, setVisibleComments] = useState(3);
    const [showFoldButton, setShowFoldButton] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [replyParentId, setReplyParentId] = useState(null);
    const [commentError, setCommentError] = useState("");
    const commentsRef = useRef(null);

    useEffect(() => {
        fetchComments();
    }, [freeBoardId]);

    const fetchComments = () => {
        axiosInstance
            .get(`/boards/comment?freeBoardId=${freeBoardId}`)
            .then((response) => {
                setComments(response.data);
                onCommentsUpdate(response.data.length); // 댓글 개수 업데이트
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the comments:",
                    error
                );
            });
    };

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
        if (!memberId) {
            alert("로그인한 유저만 댓글을 작성할 수 있습니다.");
            return;
        }

        if (commentText.trim() === "") {
            setCommentError("댓글을 입력하세요.");
            return;
        } else if (commentText.length > 150) {
            setCommentError("댓글은 150글자 이내로 작성해주세요.");
            return;
        } else {
            setCommentError("");
        }

        const payload = {
            freeBoardId: freeBoardId,
            memberId: memberId,
            content: commentText,
            parentId: null,
        };

        axiosInstance
            .post("/boards/comment", payload)
            .then(() => {
                setCommentText("");
                fetchComments(); // 댓글 목록 다시 가져오기
            })
            .catch((error) => {
                console.error("There was an error posting the comment:", error);
            });
    };

    const handleReplySubmit = (parentId) => {
        if (!memberId) {
            alert("로그인한 유저만 대댓글을 작성할 수 있습니다.");
            return;
        }

        if (replyText.trim() === "") {
            setCommentError("대댓글을 입력하세요.");
            return;
        } else if (replyText.length > 150) {
            setCommentError("대댓글은 150글자 이내로 작성해주세요.");
            return;
        } else {
            setCommentError("");
        }

        const payload = {
            freeBoardId: freeBoardId,
            memberId: memberId,
            content: replyText,
            parentId: parentId,
        };

        axiosInstance
            .post("/boards/comment", payload)
            .then(() => {
                setReplyText("");
                setReplyParentId(null);
                fetchComments(); // 댓글 목록 다시 가져오기
            })
            .catch((error) => {
                console.error("There was an error posting the reply:", error);
            });
    };

    const handleLoadMoreComments = () => {
        setVisibleComments(visibleComments + 3);
    };

    const handleFoldComments = () => {
        setVisibleComments(3);
        setShowFoldButton(false);
        if (commentsRef.current) {
            commentsRef.current.scrollTo(0, 0);
        }
    };

    const handleDeleteComment = (id) => {
        axiosInstance
            .delete(`/boards/delcomment`, { params: { commentId: id } })
            .then(() => {
                fetchComments(); // 댓글 목록 다시 가져오기
            })
            .catch((error) => {
                console.error(
                    "There was an error deleting the comment:",
                    error
                );
            });
    };

    const handleDeleteReply = (id) => {
        axiosInstance
            .delete(`/boards/delcomment`, { params: { commentId: id } })
            .then(() => {
                fetchComments(); // 댓글 목록 다시 가져오기
            })
            .catch((error) => {
                console.error("There was an error deleting the reply:", error);
            });
    };

    const handleReplyClick = (parentId) => {
        setReplyParentId(parentId);
    };

    const handleCommentTextChange = (e) => {
        const value = e.target.value;
        setCommentText(value);
        if (value.length > 150) {
            setCommentError("댓글은 150글자 이내로 작성해주세요.");
        } else {
            setCommentError("");
        }
    };

    const handleReplyTextChange = (e) => {
        const value = e.target.value;
        setReplyText(value);
        if (value.length > 150) {
            setCommentError("대댓글은 150글자 이내로 작성해주세요.");
        } else {
            setCommentError("");
        }
    };

    const renderReplies = (replies) => {
        return replies.map((reply, index) => {
            const profileImageUrl = reply.profileImage
                ? `http://localhost:8080${reply.profileImage}`
                : "/assets/images/testDog.svg";

            return (
                <div
                    key={index}
                    className="py-4 flex justify-between items-center reply"
                >
                    <div className="flex items-center gap-[8px]">
                        <img
                            src="/assets/images/recommentIcon.svg"
                            className="w-[16px]"
                        />
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                <img
                                    src={profileImageUrl}
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="subtitle2 text-primary-300">
                                    {reply.nickName}
                                </div>{" "}
                                {/* 닉네임 표시 */}
                                <div className="body2 text-sub-200">
                                    {reply.content}
                                </div>
                                <div className="mini text-gray-300 flex items-center">
                                    {timeAgo(reply.createDate)}
                                </div>
                            </div>
                        </div>
                    </div>
                    {reply.memberId === memberId && (
                        <button
                            onClick={() => handleDeleteReply(reply.id)}
                            className="border-none cursor-pointer"
                        >
                            <p className="text-xl text-gray-200">×</p>
                        </button>
                    )}
                </div>
            );
        });
    };

    useEffect(() => {
        console.log("Comments updated:", comments);
    }, [comments]);

    return (
        <div className="mt-4">
            <p className="mini text-gray-300">{comments.length}개의 댓글</p>
            <div
                ref={commentsRef}
                className="comment-scroll max-h-80 overflow-y-auto"
            >
                <style>
                    {`
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
                    .comment-scroll {
                        scrollbar-width: thin;
                        scrollbar-color: #888 transparent;
                    }
                    .reply {
                        // background-color: #f9f9f9;
                        // border-left: 2px solid #ddd;
                        padding-left: 8px;
                    }
                    `}
                </style>
                {comments.slice(0, visibleComments).map((comment, index) => {
                    const profileImageUrl = comment.profileImage
                        ? `${process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL}${comment.profileImage}`
                        : "/assets/images/testDog.svg";

                    return (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-center">
                                <div className="flex">
                                    <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                                        <img
                                            src={profileImageUrl}
                                            alt="profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="subtitle2 text-primary-300">
                                            {comment.nickName}{" "}
                                            {/* 닉네임 표시 */}
                                        </div>
                                        <div className="body2 text-primary-300">
                                            {comment.content}
                                        </div>
                                        <div className="mini text-gray-300 flex items-center">
                                            {timeAgo(comment.createDate)}
                                            <button
                                                className="ml-2 border-none bg-transparent mini text-gray-300 cursor-pointer"
                                                onClick={() =>
                                                    handleReplyClick(comment.id)
                                                }
                                            >
                                                댓글달기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {comment.memberId === memberId && (
                                    <button
                                        onClick={() =>
                                            handleDeleteComment(comment.id)
                                        }
                                        className="border-none bg-transparent cursor-pointer"
                                    >
                                        <p className="text-xl text-gray-300">
                                            ×
                                        </p>
                                    </button>
                                )}
                            </div>
                            {replyParentId === comment.id && (
                                <div className="ml-8 mb-4 flex items-center">
                                    <input
                                        type="text"
                                        value={replyText}
                                        onChange={handleReplyTextChange}
                                        placeholder="대댓글을 입력하세요"
                                        className={`flex-1 mr-4 border border-gray-300 rounded-lg px-4 py-2 ${commentError ? "border-red-500" : ""}`}
                                    />
                                    <button
                                        onClick={() =>
                                            handleReplySubmit(comment.id)
                                        }
                                        className="border-none bg-transparent text-gray-500 cursor-pointer p-0 flex items-center"
                                    >
                                        <img
                                            src="/assets/images/enterIcon.svg"
                                            alt="대댓글 달기"
                                            className="w-5 h-5"
                                        />
                                    </button>
                                </div>
                            )}
                            {/* 대댓글 */}
                            {comment.replies && renderReplies(comment.replies)}
                        </div>
                    );
                })}
            </div>
            {visibleComments < comments.length && (
                <button
                    onClick={handleLoadMoreComments}
                    className="border-none bg-transparent text-gray-300 mini cursor-pointer block mx-auto my-4"
                >
                    댓글 더보기
                </button>
            )}
            {showFoldButton && visibleComments >= comments.length && (
                <button
                    onClick={handleFoldComments}
                    className="border-none bg-transparent text-gray-300 mini  cursor-pointer block mx-auto my-4"
                >
                    댓글 접기
                </button>
            )}
            <div className="absolute bottom-16 left-0 w-full px-4 py-2 bg-white border-t border-gray-300">
                <div className="flex flex-col w-full">
                    {commentError && (
                        <div className="text-red-500 text-xs mb-1">
                            {commentError}
                        </div>
                    )}
                    <div className="flex items-center w-full border border-gray-300 rounded-lg px-4 py-2">
                        <input
                            type="text"
                            value={commentText}
                            onChange={handleCommentTextChange}
                            placeholder="댓글을 입력하세요"
                            className={`flex-1 mr-4 border-none outline-none p-[4px] box-border ${commentError ? "border-red-500" : ""}`}
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
        </div>
    );
};

export default BoardComment;
