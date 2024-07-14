import React from "react";
import NavBar from "../../layouts/nav/NavBar";
import MainSlider from "../../components/slider/MainSlider";
import CardSlider from "../../components/slider/CardSlider";
import { Link } from "react-router-dom";
import PlusButton from "../../components/button/PlusButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
function Main() {
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
                            <p className="title">자유게시판</p>
                            <img src="/assets/images/nextIcon.svg" />
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
                        <div className="flex items-center">
                            <p className="title">1:1 채팅 게시판</p>
                            <img src="/assets/images/nextIcon.svg" />
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
                        <p className="title">병원찾기</p>
                        <img src="/assets/images/nextIcon.svg" />
                    </div>
                    <div className="flex gap-[8px]">
                        <p>많이 찾는 병원</p>
                        <p>가까운 병원</p>
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
                                <SwiperSlide className="!w-auto">
                                    <CardSlider imgRoute="/assets/images/ratingIcon_color.svg" />
                                </SwiperSlide>
                                <SwiperSlide className="!w-auto">
                                    <CardSlider imgRoute="/assets/images/ratingIcon_color.svg" />
                                </SwiperSlide>
                                <SwiperSlide className="!w-auto">
                                    <CardSlider imgRoute="/assets/images/ratingIcon_color.svg" />
                                </SwiperSlide>
                                <SwiperSlide className="!w-auto">
                                    <CardSlider imgRoute="/assets/images/ratingIcon_color.svg" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                    {/* <div className="scroll-container no-scrollbar"> */}
                    {/* <div className="scroll-container custom-scroll-bar">
                        <div className="card-list m-auto ">
                            <CardSlider
                                imgRoute={"/assets/images/ratingIcon_color.svg"}
                            />
                            <CardSlider
                                imgRoute={"/assets/images/ratingIcon_color.svg"}
                            />
                        </div>
                    </div> */}
                    {/* 병원정보 카드섹션 e */}
                </div>

                <PlusButton />
                <NavBar />
            </div>
        </>
    );
}

export default Main;
