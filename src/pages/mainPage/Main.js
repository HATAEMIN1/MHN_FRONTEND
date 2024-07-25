import React, { useEffect, useState } from "react";
import NavBar from "../../layouts/nav/NavBar";
import MainSlider from "../../components/slider/MainSlider";
import CardSlider from "../../components/slider/CardSlider";
import { Link, useNavigate } from "react-router-dom";
import PlusButton from "../../components/button/PlusButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axiosInstance from "../../utils/axios";

function Main() {
    const [location, setLocation] = useState(null);
    const [hospitalData, setHospitalData] = useState([]);
    const [boardPosts, setBoardPosts] = useState([]);
    const [sortBy, setSortBy] = useState("distance");

    const navigate = useNavigate();
    const navigateToPage = (pageUrl) => {
        navigate(pageUrl);
    };

    const sortHospitals = (hospitals, sortType) => {
        if (sortType === "rating") {
            return [...hospitals].sort(
                (a, b) => (b.ratingAVG || 0) - (a.ratingAVG || 0)
            );
        }
        return hospitals;
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

    useEffect(() => {
        const fetchHospitalsAndBookmarks = async () => {
            if (location) {
                try {
                    const response = await axiosInstance.get(
                        // `/hospitals?latitude=${location.lat}&longitude=${location.lon}`
                        `/hospitals?latitude=37.3835006&longitude=126.9606728`
                    );
                    const hospitals = response.data;

                    const updatedHospitals = await Promise.all(
                        hospitals.map(async (hospital) => {
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

                                return {
                                    ...hospital,
                                    bookmarkCount:
                                        bookmarkResponse.data.totalBMKCount,
                                    ratingAVG:
                                        Math.floor(
                                            ratingResponse.data.ratingAVG * 10
                                        ) / 10,
                                    randomImageNumber:
                                        Math.floor(Math.random() * 17) + 1,
                                };
                            } catch (error) {
                                console.error(
                                    `Error fetching bookmark or rating for hospital ID: ${hospital.id}:`,
                                    error
                                );
                                return {
                                    ...hospital,
                                    bookmarkCount: 0,
                                    ratingAVG: 0,
                                    randomImageNumber:
                                        Math.floor(Math.random() * 17) + 1,
                                };
                            }
                        })
                    );

                    setHospitalData(updatedHospitals);
                } catch (error) {
                    console.error("Error fetching hospitals:", error);
                    setHospitalData([]);
                }
            }
        };

        fetchHospitalsAndBookmarks();
    }, [location]);

    useEffect(() => {
        const fetchBoardPosts = async () => {
            try {
                const response = await axiosInstance.get(
                    `/boards?page=0&size=4`
                );
                setBoardPosts(response.data.data.content);
            } catch (error) {
                console.error("Error fetching board posts:", error);
                setBoardPosts([]);
            }
        };

        fetchBoardPosts();
    }, []);

    return (
        <>
            <div className="w-full overflow-x-hidden">
                {/* 헤더구간 s */}

                <div className="bg-white top-0 z-50 w-[100%]  top-0 left-0 right-0 absolute h-[65px] px-[16px] flex items-center border-b">
                    <img
                        src="/assets/images/logoWhite.svg"
                        className="h-full m-auto"
                    />
                </div>
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
                        <div className="px-[4px]">
                            <div className="overflow-hidden">
                                <Swiper
                                    spaceBetween={8}
                                    slidesPerView={"auto"}
                                    className="mySwiper"
                                >
                                    {boardPosts.length > 0 ? (
                                        boardPosts.map((post) => (
                                            <SwiperSlide
                                                key={post.id}
                                                className="!w-auto"
                                            >
                                                <div
                                                    onClick={() =>
                                                        navigateToPage(
                                                            `/boards/${post.id}`
                                                        )
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <div className="bg-white w-[300px] py-[8px] rounded-[4px] border px-[16px]">
                                                        {post.imageList &&
                                                            post.imageList
                                                                .length > 0 && (
                                                                <div className="w-[270px] h-[160px] mb-[4px] rounded-[4px] overflow-hidden">
                                                                    <img
                                                                        src={`${process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL}/upload/${post.imageList[0].fileName}`}
                                                                        className="w-full h-full object-cover rounded-[4px]"
                                                                        alt="Post Image"
                                                                    />
                                                                </div>
                                                            )}
                                                        <div className="flex justify-between">
                                                            <p>{post.title}</p>
                                                            <div className="flex items-center">
                                                                <img
                                                                    src="/assets/images/likeIcon_color.svg"
                                                                    alt="Like Icon"
                                                                />
                                                                <p className="ml-1">
                                                                    {post.likeCount ||
                                                                        0}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    ) : (
                                        <p>
                                            게시판 정보를 불러오는 중 오류가
                                            발생했습니다.
                                        </p>
                                    )}
                                </Swiper>
                            </div>
                        </div>
                    </div>
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
                        <p
                            className={`cursor-pointer ${sortBy === "distance" ? "font-bold" : ""}`}
                            onClick={() => setSortBy("distance")}
                        >
                            가까운 순 |
                        </p>
                        <p
                            className={`cursor-pointer ${sortBy === "rating" ? "font-bold" : ""}`}
                            onClick={() => setSortBy("rating")}
                        >
                            별점 높은 순
                        </p>
                    </div>
                    <div className="px-[4px]">
                        <div className="overflow-hidden">
                            <Swiper
                                spaceBetween={8}
                                slidesPerView={"auto"}
                                className="mySwiper"
                            >
                                {hospitalData.length > 0 ? (
                                    sortHospitals(hospitalData, sortBy).map(
                                        (item, idx) => {
                                            if (idx <= 5) {
                                                return (
                                                    <SwiperSlide
                                                        key={item.id}
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
                                                                title={
                                                                    item.name
                                                                }
                                                                bookmarkCount={
                                                                    item.bookmarkCount
                                                                }
                                                                ratingAVG={
                                                                    item.ratingAVG
                                                                }
                                                                randomImageNumber={
                                                                    item.randomImageNumber
                                                                }
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                );
                                            }
                                            return null;
                                        }
                                    )
                                ) : (
                                    <p>
                                        병원 정보를 불러오는 중 오류가
                                        발생했습니다.
                                    </p>
                                )}
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
