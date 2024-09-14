import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";
import { SubscriptionComponent } from "../../components/subscription/SubscriptionComponent";

function ChartList() {
    const navigate = useNavigate();
    const memberId = useSelector((state) => {
        return state.userSlice.id;
    });
    const [chartData, setChartData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const formatDateArray = (dateArray) => {
        // dateArray 형식: [년, 월(0-11), 일, 시, 분, 초, 나노초]
        const [year, month, day, hour, minute, second, nanosecond] = dateArray;
        // JavaScript의 Date 객체는 나노초를 지원하지 않으므로 밀리초로 변환
        const millisecond = Math.floor(nanosecond / 1000000);

        // month는 0부터 시작하므로 1을 더해줍니다.
        return new Date(
            year,
            month - 1,
            day,
            hour,
            minute,
            second,
            millisecond
        ).toISOString();
    };
    const getTimeAgo = (dateArray) => {
        const dateString = formatDateArray(dateArray);
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
    };

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const chartDataInfo = async (page) => {
        try {
            const params = { memberId, page };
            const res = await axiosInstance.get("/charts", {
                params,
            });
            console.log(res.data);
            setChartData(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };
    // 페이지 번호 생성 함수
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbers = 5; // 한 번에 표시할 최대 페이지 번호 수
        let startPage = Math.max(
            0,
            currentPage - Math.floor(maxPageNumbers / 2)
        );
        let endPage = Math.min(totalPages - 1, startPage + maxPageNumbers - 1);

        if (endPage - startPage + 1 < maxPageNumbers) {
            startPage = Math.max(0, endPage - maxPageNumbers + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };
    useEffect(() => {
        if (memberId) {
            chartDataInfo(currentPage);
        } else {
            navigate("/users/login");
        }
    }, [memberId, currentPage]);

    return (
        <>
            <Header title="진료기록" write="charts/new" />
            <SubscriptionComponent />
            <div className="mt-10">
                <div className="mb-8 flex gap-4 flex-wrap justify-center px-5 sm:justify-between flex-grow">
                    {chartData.map((item, index) => (
                        <Link
                            to={`/charts/${item.id}`}
                            className="col-span-1 justify-self-start"
                            key={item.id}
                        >
                            <div className="cardWrap w-full border rounded-md border-gray-500 mb-5 hover:shadow-md transition duration-300">
                                <div className="w-[230px] h-[230px] ">
                                    <img
                                        src={`${process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL}/upload/${item.imgUrl}`}
                                        className="w-[100%] h-[100%] rounded-[4px] block object-cover"
                                        alt={item.petName}
                                    />
                                </div>
                                <div className="px-2 py-3">
                                    <p className="body1 text-primary-300 pb-1">
                                        {item.petName}
                                    </p>
                                    <div className="flex flex-col gap-1">
                                        {/*<p>{item.kind}</p>*/}
                                        <p className="body1 text-sub-200">
                                            {item.diagnosis}
                                        </p>
                                        <p className="body2 text-gray-300">
                                            {getTimeAgo(item.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="mx-1 px-3 py-1 border rounded bg-white disabled:bg-gray-200"
                    >
                        이전
                    </button>
                    {/*<span className="mx-2">*/}
                    {/*    {currentPage + 1} / {totalPages}*/}
                    {/*</span>*/}
                    {getPageNumbers().map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`mx-1 px-3 py-1 border rounded ${
                                currentPage === pageNumber
                                    ? "bg-gray-300"
                                    : "bg-white"
                            }`}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        className="mx-1 px-3 py-1 border rounded bg-white disabled:bg-gray-200"
                    >
                        다음
                    </button>
                </div>
            </div>

            <NavBar />
        </>
    );
}

export default ChartList;
