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
    const chartDataInfo = async () => {
        try {
            const params = { memberId };
            const res = await axiosInstance.get("/charts", {
                params,
            });
            setChartData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (memberId) {
            chartDataInfo();
        } else {
            navigate("/users/login");
        }
    }, [memberId]);

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
                        >
                            <div
                                className="cardWrap w-full border rounded-md border-gray-500 mb-5 hover:shadow-md transition duration-300"
                                key={item.createdAt}
                            >
                                <div className="w-[230px] h-[230px] ">
                                    <img
                                        src={`${process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL}/upload/${item.imgUrl}`}
                                        className="w-[100%] h-[100%] rounded-[4px] block object-cover"
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
            </div>
            <NavBar />
        </>
    );
}

export default ChartList;
