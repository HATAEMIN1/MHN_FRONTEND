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
        <div style={{ paddingTop: "20px", paddingBottom: "30px" }}>
            <Header title="자유게시판" />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <div> {authorName}</div>
                <div style={{ marginLeft: "10px" }}>
                    {timeAgo(post.createdAt)}
                </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
                <Slider {...settings}>
                    {post.images.map((image, index) => (
                        <div key={index}>
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`uploaded ${index}`}
                                style={{
                                    width: "100%",
                                    height: "400px", // 이미지 크기를 좀 더 크게 조정
                                    objectFit: "cover", // 이미지가 꽉 차게 설정
                                }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <div
                style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <button
                    onClick={handleLike}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "10px",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        color: "#888", // 연한 회색
                    }}
                >
                    <img
                        src={
                            liked
                                ? `${process.env.PUBLIC_URL}/assets/images/likeIcon_color.svg`
                                : `${process.env.PUBLIC_URL}/assets/images/likeIcon_clear.svg`
                        }
                        alt="like"
                        style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "5px",
                        }}
                    />
                    좋아요 {liked ? "취소" : ""} {likes}
                </button>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/images/commentIcon.svg`}
                        alt="comment"
                        style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "5px",
                        }}
                    />
                    댓글 {comments.length}
                </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {post.title}
                </h2>
            </div>
            <div style={{ fontSize: "16px" }}>{post.content}</div>
            <div style={{ marginTop: "20px" }}>
                <h3 style={{ fontSize: "14px", color: "#888" }}>
                    {comments.length}개의 댓글
                </h3>
                <div
                    ref={commentsRef}
                    className="comment-scroll"
                    style={{ maxHeight: "300px", overflowY: "auto" }}
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
                                style={{
                                    marginBottom: "10px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <div
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            overflow: "hidden",
                                            marginRight: "10px",
                                        }}
                                    >
                                        <img
                                            src={comment.profileImage}
                                            alt="profile"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: "bold" }}>
                                            {comment.userId}
                                        </div>
                                        <div style={{ fontSize: "14px" }}>
                                            {comment.content}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "12px",
                                                color: "#888",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            {timeAgo(comment.createdAt)}
                                            <button
                                                style={{
                                                    marginLeft: "10px",
                                                    border: "none",
                                                    background: "none",
                                                    color: "#888",
                                                    cursor: "pointer",
                                                }}
                                            >
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
                                        style={{
                                            border: "none",
                                            background: "none",
                                            color: "#888",
                                            cursor: "pointer",
                                        }}
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
                        style={{
                            border: "none",
                            background: "none",
                            color: "#888",
                            cursor: "pointer",
                            display: "block",
                            margin: "10px auto",
                        }}
                    >
                        댓글 더보기
                    </button>
                )}
                {showFoldButton &&
                    visibleComments >= comments.length && ( // 접기 버튼 조건부 렌더링
                        <button
                            onClick={handleFoldComments}
                            style={{
                                border: "none",
                                background: "none",
                                color: "#888",
                                cursor: "pointer",
                                display: "block",
                                margin: "10px auto",
                            }}
                        >
                            댓글 접기
                        </button>
                    )}
            </div>
            <div
                style={{
                    position: "absolute",
                    bottom: "65px",
                    left: 0,
                    width: "100%",
                    padding: "10px 20px",
                    backgroundColor: "#fff",
                    borderTop: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        border: "1px solid #ddd",
                        borderRadius: "15px", // 테두리를 둥글게 설정
                        padding: "5px 10px",
                        boxSizing: "border-box",
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
            </div>

            <NavBar />
        </div>
    );
}

export default BoardView;
