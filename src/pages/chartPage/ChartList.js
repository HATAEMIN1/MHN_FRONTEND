import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";

function ChartList() {
    const navigate = useNavigate();
    const memberId = useSelector((state) => {
        console.log(state.userSlice.id);
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
            console.log(res.data);
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
    }, []);
    return (
        <>
            <Header title="진료기록" write="charts/new" />
            <div className=" mt-10 ">
                <div className="mb-8 flex gap-4 flex-wrap justify-center px-5 sm:justify-between flex-grow">
                    {chartData.map((item, index) => (
                        <Link
                            to={`/charts/${item.id}`}
                            className="col-span-1 justify-self-start"
                        >
                            <div
                                className="cardWrap w-full "
                                key={item.createdAt}
                            >
                                <div className="w-[230px] h-[180px] ">
                                    <img
                                        src={`${process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL}/upload/${item.imgUrl}`}
                                        className="w-[100%] h-[100%] rounded-[4px] block "
                                    />
                                </div>
                                <div className="p-2">
                                    <h2>{item.petName}</h2>
                                    <div className="flex gap-2">
                                        {/*<p>{item.kind}</p>*/}
                                        <p>{item.diagnosis}</p>
                                    </div>
                                    <p>{getTimeAgo(item.createdAt)}</p>
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
