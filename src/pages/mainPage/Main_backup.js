import React, { useEffect, useState } from "react";
import NavBar from "../../layouts/nav/NavBar";
import MainSlider from "../../components/slider/MainSlider";
import CardSlider from "../../components/slider/CardSlider";
import { Link, useNavigate } from "react-router-dom";
import PlusButton from "../../components/button/PlusButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axiosInstance from "../../utils/axios";

function Main() {
    // 현재 이용자의 위치값 확인
    const [location, setLocation] = useState(null);
    const [hospitalData, setHospitalData] = useState([]);
    const navigate = useNavigate();
    const navigateToPage = (pageUrl) => {
        navigate(pageUrl);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setLocation({ lat, lon });
                },
                function (error) {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);
    console.log("location", location);

    useEffect(() => {
        const fetchHospitalsAndBookmarks = async () => {
            if (location) {
                try {
                    // 병원 정보 가져오기
                    const response = await axiosInstance.get(
                        `/hospitals?latitude=${location.lat}&longitude=${location.lon}`
                    );
                    const hospitals = response.data;
                    console.log(response);

                    // 병원 정보 먼저 설정
                    setHospitalData(
                        hospitals.map((hospital) => ({
                            ...hospital,
                            bookmarkCount: 0,
                            averageRating: 0,
                        }))
                    );

                    // 북마크 정보와 별점 평균 가져오기 (비동기적으로 처리)
                    hospitals.forEach(async (hospital, index) => {
                        try {
                            const [bookmarkResponse, ratingResponse] =
                                await Promise.all([
                                    axiosInstance.get(
                                        `/hospitals/bmk/count?hospitalId=${hospital.id}`
                                    ),
                                    axiosInstance.get(
                                        `/hospitals/review/rating?hospitalId=${hospital.id}`
                                    ),
                                ]);

                            setHospitalData((prevData) => {
                                const newData = [...prevData];
                                newData[index] = {
                                    ...newData[index],
                                    bookmarkCount:
                                        bookmarkResponse.data.totalBMKCount,
                                    ratingAVG:
                                        Math.floor(
                                            ratingResponse.data.ratingAVG * 10
                                        ) / 10, // 별점 평균 추가
                                };
                                return newData;
                            });
                        } catch (error) {
                            console.error(
                                `북마크 정보 또는 별점 평균을 가져오는 중 오류 발생 (병원 ID: ${hospital.id}):`,
                                error
                            );
                        }
                    });
                } catch (error) {
                    console.error("병원 정보를 가져오는 중 오류 발생:", error);
                }
            }
        };

        fetchHospitalsAndBookmarks();
    }, [location]);

    return (
        <>
            <div className="w-full">
                {/* 헤더구간 s */}
                <div className="bg-white top-0 z-50 w-[100%]  top-0 left-0 right-0 absolute h-[65px] px-[16px] flex items-center border-b">
                    <img
                        src="/assets/images/logoWhite.svg"
                        className="h-full m-auto"
                    />
                </div>
                {/* 헤더구간 e */}
                <div className="mb-[28px]">
                    <MainSlider />
                </div>
                <div className="bg-white rounded-t-[8px] rounded-r-[8px] ">
                    <div className="mb-[45px]">
                        <div className="flex items-center">
                            <Link to="/boards" className="flex">
                                <p className="title">자유게시판</p>
                                <img src="/assets/images/nextIcon.svg" />
                            </Link>
                        </div>
                        {/* 자유게시판 카드섹션 s */}
                        {/* <div className="scroll-container"> */}
                        <div className="px-[4px]">
                            <div className="overflow-hidden">
                                <Swiper
                                    // modules={[Pagination]}
                                    spaceBetween={8}
                                    slidesPerView={"auto"}
                                    // pagination={{ clickable: true }}
                                    className="mySwiper"
                                >
                                    <SwiperSlide className="!w-auto">
                                        <CardSlider imgRoute="/assets/images/likeIcon_color.svg" />
                                    </SwiperSlide>
                                    <SwiperSlide className="!w-auto">
                                        <CardSlider imgRoute="/assets/images/likeIcon_color.svg" />
                                    </SwiperSlide>
                                    <SwiperSlide className="!w-auto">
                                        <CardSlider imgRoute="/assets/images/likeIcon_color.svg" />
                                    </SwiperSlide>
                                    <SwiperSlide className="!w-auto">
                                        <CardSlider imgRoute="/assets/images/likeIcon_color.svg" />
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    {/* 자유게시판 카드섹션 e */}
                    <div className="mb-[45px]">
                        <div className="flex items-center ">
                            <Link to="/chatboards" className="flex">
                                <p className="title">1:1 채팅 게시판</p>
                                <img src="/assets/images/nextIcon.svg" />
                            </Link>
                        </div>
                        <div>
                            <ul>
                                <li className="mb-[12px]">
                                    <p className="body1">title</p>
                                    <p className="body2">contentsssssssss</p>
                                    <div className="flex gap-[4px] mini">
                                        <p>writer</p>
                                        <p>|좋아요</p>
                                        <img src="/assets/images/likeIcon_color.svg" />
                                    </div>
                                </li>
                                <li className="mb-[12px]">
                                    <p className="body1">title</p>
                                    <p className="body2">
                                        contentsssssssssssssssss
                                    </p>
                                    <div className="flex gap-[4px] mini">
                                        <p>writer</p>
                                        <p>|좋아요</p>
                                        <img src="/assets/images/likeIcon_color.svg" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link to="/hospitals/map" className="flex">
                            <p className="title">내 근처 병원</p>
                            <img src="/assets/images/nextIcon.svg" />
                        </Link>
                    </div>
                    <div className="flex gap-[8px]">
                        <p className="cursor-pointer">가까운 순 |</p>
                        <p className="cursor-pointer">별점 높은 순</p>
                    </div>
                    {/* 병원정보 카드섹션 s */}
                    {/* <div className="scroll-container "> */}
                    <div className="px-[4px]">
                        <div className="overflow-hidden">
                            <Swiper
                                // modules={[Pagination]}
                                spaceBetween={8}
                                slidesPerView={"auto"}
                                // pagination={{ clickable: true }}
                                className="mySwiper"
                            >
                                {hospitalData.map((item, idx) => {
                                    console.log(item);
                                    if (idx <= 5) {
                                        return (
                                            <SwiperSlide
                                                key={idx}
                                                className="!w-auto"
                                            >
                                                <div
                                                    onClick={() =>
                                                        navigateToPage(
                                                            `/hospitals/${item.id}`
                                                        )
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <CardSlider
                                                        imgRoute="/assets/images/ratingIcon_color.svg"
                                                        title={item.name}
                                                        bookmarkCount={
                                                            item.bookmarkCount
                                                        }
                                                        ratingAVG={
                                                            item.ratingAVG
                                                        }
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    }
                                    console.log(item);
                                    return null;
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>

                <PlusButton />
                <NavBar />
            </div>
        </>
    );
}

export default Main;
