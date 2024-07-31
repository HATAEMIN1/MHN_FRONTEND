import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import axiosInstance from "../../utils/axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
function ChartView() {
    const [chartData, setChartData] = useState([]);
    const { chartId } = useParams();
    const chartDataInfo = async () => {
        const params = { id: chartId };
        const res = await axiosInstance.get("/charts/view", { params });
        setChartData(res.data);
        console.log(res.data);
    };
    useEffect(() => {
        chartDataInfo();
    }, []);
    return (
        <>
            <Header title="진료기록" />
            <div className="border-b p-2">
                <h2>{chartData && chartData.hospitalName}</h2>
            </div>

            <div className="py-8">
                <div className="p-2 ">
                    <h2 className="py-2">펫</h2>
                    <div className="border-2 rounded-md h-[52px] flex items-center px-4">
                        <p>{chartData && chartData.petName}</p>
                    </div>
                </div>
                <div className="p-2 ">
                    <h2 className="py-2">진료일자</h2>
                    <div className="border-2 rounded-md h-[52px] flex items-center px-4 relative">
                        <p>{chartData && chartData.treatmentDate}</p>
                        <div className="absolute right-5">
                            <img
                                src="/assets/images/calendarIcon.svg"
                                className="w-full block"
                            />
                        </div>
                    </div>
                </div>
                <div className="p-2 ">
                    <h2 className="py-2">병명</h2>
                    <div className="border-2 rounded-md h-[52px] flex items-center px-4">
                        <p>{chartData.diagnosis}</p>
                    </div>
                </div>
                <div className="p-2 ">
                    <h2 className="py-2">설명</h2>
                    <div className="border-2 rounded-md  flex items-center px-4 mb-4">
                        <p>{chartData && chartData.description}</p>
                    </div>
                </div>
                {/*스와이퍼 들어가는 자리*/}
                <div className="flex flex-wrap justify-center">
                    <Swiper
                        spaceBetween={8}
                        slidesPerView={"auto"}
                        className="mySwiper"
                    >
                        {chartData.uploadFileNames &&
                            chartData.uploadFileNames.map((item, idx) => {
                                return (
                                    <SwiperSlide key={item.id}>
                                        <div
                                            key={idx}
                                            className="p-2 w-[576px] h-[250px]"
                                        >
                                            <img
                                                src={`${process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL}/upload/${item}`}
                                                className="w-full rounded-md h-full"
                                            />
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
            </div>
            <NavBar />
        </>
    );
}

export default ChartView;
