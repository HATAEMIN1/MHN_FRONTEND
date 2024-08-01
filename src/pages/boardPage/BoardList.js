// 댓글 인풋창 로그인유저에게만
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Searchbar from "../../components/search/Searchbar";
import NavBar from "../../layouts/nav/NavBar";
import FilterModalManager from "../../components/modal/FilterModalManager";
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

function BoardList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(null); // totalElements 상태 추가
    const [filter, setFilter] = useState("latest");
    const memberId = useSelector((state) => state.userSlice.id); // Redux 스토어에서 사용자 ID 가져오기
    const navigate = useNavigate();

    const PAGE_SIZE = 4; // 한 페이지에 보여줄 게시물 수

    useEffect(() => {
        fetchPosts(currentPage, filter);
    }, [currentPage, filter]);

    const fetchPosts = (page, filter) => {
        setLoading(true);
        const apiEndpoint =
            filter === "likes"
                ? `/boards/likes?memberId=1&page=${page}&size=${PAGE_SIZE}`
                : filter === "oldest"
                  ? `/boards/oldest?memberId=1&page=${page}&size=${PAGE_SIZE}`
                  : `/boards?page=${page}&size=${PAGE_SIZE}`;
        console.log("API Endpoint: ", apiEndpoint); // 디버깅
        axiosInstance
            .get(apiEndpoint)
            .then((response) => {
                console.log("API Response: ", response.data); // 디버깅
                setPosts(response.data.data.content);
                const totalElementsFromResponse =
                    response.data.data.totalElements;
                if (totalElements === null) {
                    setTotalElements(totalElementsFromResponse); // 첫 페이지 요청 시 totalElements 설정
                }
                console.log("Total Elements: ", totalElements); // 디버깅
                const totalPagesCalculated = Math.ceil(
                    totalElementsFromResponse / PAGE_SIZE
                );
                console.log("Total Pages Calculated: ", totalPagesCalculated); // 디버깅
                setTotalPages(totalPagesCalculated);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearch = (query) => {
        navigate(`/boards/search?title=${query}`);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(0);
        setTotalElements(null); // 필터 변경 시 totalElements 초기화
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // console.log(posts);

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 0; i < totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`mx-1 px-3 py-1 border rounded ${currentPage === i ? "bg-gray-300" : "bg-white"}`}
                >
                    {i + 1}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="w-full flex flex-col min-h-screen">
            {memberId ? (
                <Header title="자유게시판" write="boards/new" />
            ) : (
                <Header title="자유게시판" write="users/login" />
            )}

            <div className="py-[16px]">
                <ul className="flex justify-around gap-[2px]">
                    <Link to="/chatboards" className="w-full">
                        <li className="text-center body2 pb-[10px] text-primary-300 border-b w-full">
                            1:1 채팅 게시판
                        </li>
                    </Link>
                    <li className="border-b-2 w-full pb-[10px] text-primary-300 text-center body2">
                        자유 게시판
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-[8px] mb-[20px]">
                <Searchbar onSearch={handleSearch} />
                <FilterModalManager
                    modalOpen={
                        <div onClick={() => {}} style={{ cursor: "pointer" }}>
                            <img
                                src="/assets/images/filterIcon.svg"
                                alt="Filter"
                                className="w-[24px]"
                            />
                        </div>
                    }
                    onFilterChange={handleFilterChange}
                />
            </div>
            <div className="flex-grow overflow-auto">
                <ul className="grid grid-cols-2 gap-2 w-full p-0 m-0 list-none">
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
                                    <div className="subtitle3 text-primary-300 truncate">
                                        {post.title}
                                    </div>
                                    <span className="mini text-gray-300 whitespace-nowrap">
                                        {timeSince(post.createDate)}
                                    </span>
                                </div>
                                {/* <p className="text-sm text-left overflow-hidden truncate"> */}
                                <p className="body2 text-sub-200 overflow-hidden truncate">
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
            {/* <div className="sticky bottom-0 bg-white py-4 shadow-md"> */}
            <div className="sticky bottom-0 bg-white py-4 ">
                <div className="flex justify-center">
                    {currentPage > 0 && (
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="mx-1 px-3 py-1 border rounded bg-white"
                        >
                            &lt;
                        </button>
                    )}
                    {renderPageButtons()}
                    {currentPage < totalPages - 1 && (
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
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

export default BoardList;
