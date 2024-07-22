// BoardView.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";

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

function BoardView({ posts }) {
    const { bdId } = useParams();
    const post = posts[bdId];

    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [visibleComments, setVisibleComments] = useState(3); // 초기 표시할 댓글 수
    const [showFoldButton, setShowFoldButton] = useState(false); // 댓글 접기 버튼 상태

    const currentUserId = "currentUserId"; // 현재 사용자 ID (나중에 서버에서 가져올 값)

    const commentsRef = useRef(null);

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

    if (!post) {
        return <div>게시물을 찾을 수 없습니다.</div>;
    }

    const authorName = "겸둥이"; // 나중에 서버에서 가져올 값

    const settings = {
        dots: true,
        infinite: false, // 마지막 이미지에서 멈추도록 설정
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
    };

    const handleCommentSubmit = () => {
        if (commentText.trim() !== "") {
            setComments([
                ...comments,
                {
                    id: comments.length,
                    userId: currentUserId,
                    content: commentText,
                    createdAt: new Date(),
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/profile_default.png`,
                },
            ]);
            setCommentText("");
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

    return (
        <div className="pt-5 pb-7">
            <Header title="자유게시판" />
            <div className="flex items-center mb-5">
                <div> {authorName}</div>
                <div style={{ marginLeft: "10px" }}>
                    {timeAgo(post.createdAt)}
                </div>
            </div>
            <div className="mb-5">
                <Slider {...settings}>
                    {post.images.map((image, index) => (
                        <div key={index}>
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`uploaded ${index}`}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="mb-5 flex items-center">
                <button
                    onClick={handleLike}
                    className="flex items-center mr-2 border-none bg-transparent cursor-pointer text-gray-500"
                >
                    <img
                        src={
                            liked
                                ? `${process.env.PUBLIC_URL}/assets/images/likeIcon_color.svg`
                                : `${process.env.PUBLIC_URL}/assets/images/likeIcon_clear.svg`
                        }
                        alt="like"
                        className="w-5 h-5 mr-1"
                    />
                    좋아요 {liked ? "취소" : ""} {likes}
                </button>
                <div className="flex items-center">
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/images/commentIcon.svg`}
                        alt="comment"
                        className="w-5 h-5 mr-1"
                    />
                    댓글 {comments.length}
                </div>
            </div>
            <div className="mb-5">
                <h2 className="text-lg font-bold">{post.title}</h2>
            </div>
            <div className="text-base">{post.content}</div>
            <div className="mt-4">
                <h3 className="text-sm text-gray-500">
                    {comments.length}개의 댓글
                </h3>
                <div
                    ref={commentsRef}
                    className="comment-scroll max-h-80 overflow-y-auto"
                >
                    {" "}
                    {/* 스크롤 추가 */}
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
                    {comments
                        .slice(0, visibleComments)
                        .map((comment, index) => (
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
                                {comment.userId === currentUserId && (
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
                        ))}
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
            </div>
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
                            className="w-5 h-5s"
                        />
                    </button>
                </div>
            </div>

            <NavBar />
        </div>
    );
}

export default BoardView;
