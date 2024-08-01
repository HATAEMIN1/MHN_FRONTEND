import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";

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

function AccountBoard() {
    const memberId = useSelector((state) => state.userSlice.id);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageRange, setPageRange] = useState([0, 4]);

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = (page) => {
        setLoading(true);
        const apiEndpoint = `/boards/user?memberId=${memberId}&page=${page}&size=4`;
        axiosInstance
            .get(apiEndpoint)
            .then((response) => {
                setPosts(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextRange = () => {
        const newStart = pageRange[1] + 1;
        const newEnd = Math.min(newStart + 4, totalPages - 1);
        setPageRange([newStart, newEnd]);
        setCurrentPage(newStart);
    };

    const handlePrevRange = () => {
        const newEnd = pageRange[0] - 1;
        const newStart = Math.max(newEnd - 4, 0);
        setPageRange([newStart, newEnd]);
        setCurrentPage(newStart);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header title="내가 쓴 글 목록" />
            <div className="flex-grow overflow-auto">
                <ul className="grid grid-cols-2 gap-2 w-full p-4 m-0 list-none">
                    {posts.map((post, index) => (
                        <Link
                            to={`/boards/${post.id}`}
                            key={index}
                            state={{ post }}
                        >
                            <li className="w-full border border-gray-300 shadow-sm p-4 rounded-lg flex flex-col items-start h-64">
                                <div className="w-full h-40 mb-4 overflow-hidden shadow-md">
                                    {post.imageList &&
                                        post.imageList.length > 0 && (
                                            <img
                                                src={`${process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL}/upload/${post.imageList[0].fileName}`}
                                                alt="Post Image"
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    {/* <div className="font-bold text-base text-left text-black truncate"> */}
                                    <div className="subtitle3 text-left text-primary-300 truncate">
                                        {post.title}
                                    </div>
                                    <span className="mini text-gray-300 whitespace-nowrap">
                                        {timeSince(post.createDate)}
                                    </span>
                                </div>
                                <p className="body2 text-sub-200 text-left overflow-hidden truncate">
                                    {post.content.substring(0, 10) +
                                        (post.content.length > 10 ? "..." : "")}
                                </p>
                                <div className="flex gap-[4px]">
                                    <p className="mini text-gray-300">
                                        좋아요 {post.likeCount}
                                    </p>
                                    <p className="mini text-gray-300">|</p>
                                    <p className="mini text-gray-300">
                                        댓글 {post.commentCount}
                                    </p>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sticky bottom-0 bg-white py-4 ">
                <div className="flex justify-center">
                    {pageRange[0] > 0 && (
                        <button
                            onClick={handlePrevRange}
                            className="mx-1 px-3 py-1 border rounded bg-white"
                        >
                            &lt;
                        </button>
                    )}
                    {Array.from(
                        {
                            length: Math.min(
                                pageRange[1] - pageRange[0] + 1,
                                totalPages - pageRange[0]
                            ),
                        },
                        (_, index) => {
                            const pageIndex = pageRange[0] + index;
                            return (
                                <button
                                    key={pageIndex}
                                    onClick={() => handlePageChange(pageIndex)}
                                    className={`mx-1 px-3 py-1 border rounded ${currentPage === pageIndex ? "bg-gray-300" : "bg-white"}`}
                                >
                                    {pageIndex + 1}
                                </button>
                            );
                        }
                    )}
                    {pageRange[1] < totalPages - 1 && (
                        <button
                            onClick={handleNextRange}
                            className="mx-1 px-3 py-1 border rounded bg-white"
                        >
                            &gt;
                        </button>
                    )}
                </div>
            </div>
            <NavBar />
        </div>
    );
}

export default AccountBoard;
