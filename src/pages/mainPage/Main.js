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
import { useSelector } from "react-redux";

function Main() {
    const [location, setLocation] = useState(null);
    const [hospitalData, setHospitalData] = useState([]);
    const [boardPosts, setBoardPosts] = useState([]);
    const [sortBy, setSortBy] = useState("distance");
    const chatrooms = useSelector((state) => state.chatRoomSlice.chatRooms);
    console.log("chatrooms:", chatrooms);

    let firstChatRoom = null;
    let secondChatRoom = null;
    if (chatrooms != [] && chatrooms.length > 0) {
        firstChatRoom = chatrooms[0];
        if (chatrooms.length > 1) secondChatRoom = chatrooms[1];
    }

    const loginState = useSelector((state) => {
        console.log(state.userSlice);
        console.log(state.userSlice.id);
    });

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
                        `/hospitals?latitude=${location.lat}&longitude=${location.lon}`

                        // "/hospitals?latitude=37.3938325&longitude=126.960293"
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

                <div className="bg-white top-0 z-50 w-[100%] left-0 right-0 absolute h-[65px] px-[16px] flex items-center border-b">
                    <img
                        src="/assets/images/logoWhite.svg"
                        className="h-full m-auto"
                    />
                </div>
                <div>
                    <MainSlider />
                </div>
                <div className="bg-whit pt-7 px-4 ">
                    <div className="mb-[45px] flex flex-col gap-4">
                        <div className="flex items-center">
                            <Link to="/boards" className="flex">
                                <p className="title text-primary-300">
                                    자유게시판
                                </p>
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
                                                    <div className="bg-white w-[300px] py-3 rounded-[4px] border px-4 border-gray-400">
                                                        <div className="w-[270px] h-[160px] mb-[4px] rounded-[4px] overflow-hidden bg-gray-200">
                                                            {post.imageList &&
                                                                post.imageList
                                                                    .length >
                                                                    0 && (
                                                                    <img
                                                                        src={`${process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL}/upload/${post.imageList[0].fileName}`}
                                                                        className="w-full h-full object-cover rounded-[4px]"
                                                                        alt="Post Image"
                                                                    />
                                                                )}
                                                        </div>
                                                        <div className="flex justify-between mt-2">
                                                            <p className="body2 text-primary-300">
                                                                {post.title}
                                                            </p>
                                                            <div className="flex items-center">
                                                                <img
                                                                    src="/assets/images/likeIcon_color.svg"
                                                                    alt="Like Icon"
                                                                />
                                                                <p className="ml-1 subtitle1 text-sub-100">
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
                                        <p className="body1 text-sub-100">
                                            아직 게시판 정보가 없습니다.
                                        </p>
                                    )}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="mb-[45px] flex flex-col gap-4">
                        <div className="flex items-center mb-[5px]">
                            <Link to="/chatboards" className="flex">
                                <p className="title text-primary-300">
                                    1:1 채팅 게시판
                                </p>
                                <img src="/assets/images/nextIcon.svg" />
                            </Link>
                        </div>
                        <div>
                            {firstChatRoom ? (
                                <ul>
                                    <Link
                                        to={`/chatboards/${firstChatRoom?.senderId}/${firstChatRoom?.recipientId}`}
                                        className="flex "
                                    >
                                        <li className="mb-5 flex flex-col gap-1">
                                            <p className="body1 text-primary-300">
                                                {firstChatRoom?.title}
                                            </p>
                                            <p className="body2 text-sub-100">
                                                {firstChatRoom?.address}
                                            </p>
                                            <div className="flex gap-[4px] mini text-gray-300">
                                                <p>
                                                    writer ID:{" "}
                                                    {firstChatRoom?.senderId}
                                                </p>
                                                <p>
                                                    | 좋아요{" "}
                                                    {firstChatRoom?.likes}
                                                </p>
                                                <img src="/assets/images/likeIcon_color.svg" />
                                            </div>
                                        </li>
                                    </Link>
                                    {secondChatRoom && (
                                        <Link
                                            to={`/chatboards/${secondChatRoom?.senderId}/${secondChatRoom?.recipientId}`}
                                            className="flex"
                                        >
                                            <li className="flex flex-col gap-1">
                                                <p className="body1 text-primary-300">
                                                    {secondChatRoom?.title}
                                                </p>
                                                <p className="body2 text-sub-100">
                                                    {secondChatRoom?.address}
                                                </p>
                                                <div className="flex gap-[4px] mini text-gray-300">
                                                    <p>
                                                        writer ID:{" "}
                                                        {
                                                            secondChatRoom?.senderId
                                                        }
                                                    </p>
                                                    <p>
                                                        | 좋아요{" "}
                                                        {secondChatRoom?.likes}
                                                    </p>
                                                    <img src="/assets/images/likeIcon_color.svg" />
                                                </div>
                                            </li>
                                        </Link>
                                    )}
                                </ul>
                            ) : (
                                <div className="ml-[5px] body1 text-sub-100">
                                    아직 채팅방이 없습니다.
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mb-7">
                        <div className="flex items-center">
                            <Link to="/hospitals/map" className="flex">
                                <p className="title text-primary-300">
                                    내 근처 병원
                                </p>
                                <img src="/assets/images/nextIcon.svg" />
                            </Link>
                        </div>
                        {hospitalData.length > 0 && (
                            <div className="flex gap-[8px] body1">
                                <p
                                    className={`cursor-pointer ${sortBy === "distance" ? "text-primary-300" : "text-gray-300"}`}
                                    onClick={() => setSortBy("distance")}
                                >
                                    가까운 순 |
                                </p>
                                <p
                                    className={`cursor-pointer ${sortBy === "rating" ? "text-primary-300" : "text-gray-300"}`}
                                    onClick={() => setSortBy("rating")}
                                >
                                    별점 높은 순
                                </p>
                            </div>
                        )}

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
                                                            className="cursor-pointer rounded-[4px] border border-gray-400"
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
                                    <p className="body1 text-sub-100">
                                        아직 병원 정보가 없습니다.
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
