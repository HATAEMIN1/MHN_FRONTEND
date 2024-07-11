import React from "react";
import { Link } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Searchbar from "../../components/search/Searchbar";
import NavBar from "../../layouts/nav/NavBar";
import FilterModalManager from "../../components/modal/FilterModalManager";

function timeSince(date) {
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

function BoardList({ posts }) {
    const handleModalOpen = () => {
        console.log("모달 버튼 클릭됨");
    };
    return (
        <div className="w-full">
            <Header title="자유게시판" write="boards/new" />
            {/* tab메뉴 */}
            <div className="py-[16px] ">
                <ul className="flex justify-around gap-[2px]">
                    <Link to="/chatboards" className=" w-full">
                        <li className=" text-center body2 border-b w-full">
                            1:1 채팅 게시판
                        </li>
                    </Link>

                    <li className="border-b-2 w-full text-center body2">
                        자유 게시판
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-[8px] mb-[20px]">
                <Searchbar />
                <FilterModalManager
                    modalOpen={
                        <div
                            onClick={handleModalOpen}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src="/assets/images/filterIcon.svg"
                                alt="Filter"
                                className="w-[24px]"
                                // style={{ marginLeft: "auto" }}
                            />
                        </div>
                    }
                    onOpenModal={handleModalOpen}
                />
            </div>
            {/* tab메뉴 end */}
            <ul
                style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                    gap: "8px",
                    width: "100%",
                    padding: 0, // ul의 기본 패딩 제거
                    margin: 0, // ul의 기본 마진 제거
                    listStyle: "none", // ul의 기본 리스트 스타일 제거
                }}
            >
                {posts.map((post, index) => (
                    <Link to={`/boards/${index}`} state={{ post }}>
                        <li
                            key={index}
                            style={{
                                border: "1px solid #ddd",
                                // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                padding: "10px",
                                borderRadius: "8px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                // minHeight: "350px",
                            }}
                            className="w-full"
                        >
                            <div
                                style={{
                                    width: "100%",
                                    aspectRatio: "1 / 1",
                                    marginBottom: "10px",
                                    overflow: "hidden",
                                }}
                            >
                                {post.images && post.images.length > 0 && (
                                    <img
                                        src={URL.createObjectURL(
                                            post.images[0]
                                        )}
                                        alt="Post Image"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                )}
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        textAlign: "left",
                                        color: "black",
                                        textDecoration: "none",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {post.title}
                                </div>
                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "#666",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {timeSince(post.createdAt)}
                                </span>
                            </div>
                            <p
                                style={{
                                    fontSize: "14px",
                                    textAlign: "left",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                }}
                            >
                                {post.content.substring(0, 10) +
                                    (post.content.length > 10 ? "..." : "")}
                            </p>
                            <div className="flex gap-[4px]">
                                <p className="mini text-gray-300">좋아요 13</p>
                                <p className="mini text-gray-300">|</p>
                                <p className="mini text-gray-300">댓글 12</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
            <NavBar />
        </div>
    );
}

export default BoardList;
