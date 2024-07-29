import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import FilterModalManager from "../../components/modal/FilterModalManager";
import axiosInstance from "../../utils/axios";
import Searchbar from "../../components/search/Searchbar";

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

function BoardSearchList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageRange, setPageRange] = useState([0, 4]);

    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get("title");

    useEffect(() => {
        if (query) {
            fetchPosts(currentPage, query);
        }
    }, [currentPage, query]);

    const fetchPosts = (page, query) => {
        setLoading(true);
        axiosInstance
            .get(`/boards/search?title=${query}&page=${page}&size=4`)
            .then((response) => {
                console.log("Fetched posts:", response.data);
                setPosts(response.data.content);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setError(error);
                setLoading(false);
            });
    };

    const handleModalOpen = () => {
        console.log("모달 버튼 클릭됨");
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

    const handleSearch = (query) => {
        navigate(`/boards/search?title=${query}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="w-full">
            <Header title="자유게시판" write="boards/new" />
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
                <Searchbar onSearch={handleSearch} />
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
                            />
                        </div>
                    }
                    onOpenModal={handleModalOpen}
                />
            </div>
            <ul className="grid grid-cols-2 gap-2 w-full p-0 m-0 list-none">
                {posts && posts.length > 0 ? (
                    posts.map((post, index) => (
                        <Link
                            to={`/boards/${post.id}`}
                            key={index}
                            state={{ post }}
                        >
                            <li
                                key={index}
                                className="w-full border border-gray-300 shadow-sm p-4 rounded-lg flex flex-col items-start h-64"
                            >
                                <div className="w-full h-40 mb-4 overflow-hidden">
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
                                    <div className="font-bold text-base text-left text-black truncate">
                                        {post.title}
                                    </div>
                                    <span className="text-sm text-gray-600 whitespace-nowrap">
                                        {timeSince(post.createDate)}
                                    </span>
                                </div>
                                <p className="text-sm text-left overflow-hidden truncate">
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
                    ))
                ) : (
                    <div>No posts found.</div>
                )}
            </ul>
            <div className="flex justify-center mt-4">
                {pageRange[0] > 0 && (
                    <button
                        onClick={handlePrevRange}
                        className="mx-1 px-3 py-1 border rounded bg-white"
                    >
                        &lt;
                    </button>
                )}
                {Array.from(
                    { length: pageRange[1] - pageRange[0] + 1 },
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
            <NavBar />
        </div>
    );
}

export default BoardSearchList;