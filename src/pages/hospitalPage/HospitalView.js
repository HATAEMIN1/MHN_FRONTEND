import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link, useParams } from "react-router-dom";
import KakaoMapView from "../../components/kakaomap/KakaoMapView";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";

function HospitalView() {
    // const [bookmark, setBookmark] = useState(false);
    // 북마크 겟해왔을 때 상태값
    const [bookmarkState, setBookmarkState] = useState(null);
    // function handleOnclick() {
    //     setBookmark(!bookmark);
    //     console.log(bookmark);
    // }

    const loginState = useSelector((state) => {
        console.log(state.userSlice);
        console.log(state.userSlice.id);
        return state.userSlice;
    });
    const [hospitalInfo, setHospitalInfo] = useState({});
    const [randomImageNumber, setRandomImageNumber] = useState(null);
    const { hpId } = useParams();
    // const memberId = 4;
    useEffect(() => {
        console.log("부모 hospitalInfo::", hospitalInfo);
    }, [hospitalInfo]);

    const addBMK = async () => {
        // console.log("북마크 추가할거임");
        const body = {
            // memberId값 나중엔 로그인 유저 아이디값으로 대체되어야 함
            memberId: loginState.id,
            hospitalId: hpId,
        };

        try {
            await axiosInstance.post(`/hospitals/bmk`, body);
            setBookmarkState(1);
            await fetchBMK();
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };
    const deleteBMK = async () => {
        console.log("북마크 삭제할거임");
        if (!bookmarkState || !bookmarkState.id) {
            console.error("북마크 ID가 없습니다.");
            return;
        }
        try {
            const response = await axiosInstance.delete(
                `/hospitals/bmk?id=${bookmarkState.id}`
            );
            setBookmarkState(null);
            console.log(response.data);
        } catch (error) {
            console.error("삭제요청실패", error);
        }
    };

    const fetchBMK = async () => {
        try {
            const response = await axiosInstance.get(
                // `/hospitals/bmk?hospitalId=${hpId}&memberId=${나중에 여기 로그인유저값 들어가야함}`
                `/hospitals/bmk?hospitalId=${hpId}&memberId=${loginState.id}`
            );
            setBookmarkState(response.data);
            console.log("bmk상태는::", response.data);
        } catch (error) {
            console.error("병원 정보를 가져오는 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        fetchBMK();
        setRandomImageNumber(Math.floor(Math.random() * 17) + 1);
    }, [hpId]);

    return (
        <>
            <Header title="병원 상세 정보" />
            <form action="">
                {/* <div>
                    <img
                        src={`/assets/images/hospitalImage${randomImageNumber}.svg`}
                        className="m-auto w-full mb-[24px]"
                    />
                </div> */}
                <div className="w-full aspect-[542.67/397.07] mb-[24px] overflow-hidden">
                    <img
                        src={`/assets/images/hospitalImage${randomImageNumber}.svg`}
                        className="w-full h-full object-cover"
                        alt="Hospital Image"
                    />
                </div>
                {/* 정보/후기 선택탭 s */}
                <div className="py-[16px]">
                    <ul className="flex justify-around gap-[2px]">
                        <li className="border-b-2 w-full text-center body2">
                            병원정보
                        </li>
                        <Link
                            to={`/hospitals/review/${hpId}`}
                            className="border-b w-full"
                        >
                            <li className=" text-center body2">진료후기</li>
                        </Link>
                    </ul>
                </div>
                {/* 병원정보 s */}
                <div className="mb-[24px]">
                    <div className="flex gap-[2px]8">
                        {/* <div onClick={handleOnclick}> */}
                        <div>
                            {loginState.email ? (
                                bookmarkState ? (
                                    <div onClick={deleteBMK}>
                                        <img
                                            src="/assets/images/bmkIcon_color.svg"
                                            alt="Remove Bookmark"
                                        />
                                    </div>
                                ) : (
                                    <div onClick={addBMK}>
                                        <img
                                            src="/assets/images/bmkIcon_clear.svg"
                                            alt="Add Bookmark"
                                        />
                                    </div>
                                )
                            ) : (
                                <img
                                    src="/assets/images/bmkIcon_clear.svg"
                                    alt="Add Bookmark"
                                    className="invisible"
                                />
                            )}
                            {/* {bookmarkState ? (
                                <div onClick={deleteBMK}>
                                    <img
                                        src="/assets/images/bmkIcon_color.svg"
                                        alt="Remove Bookmark"
                                    />
                                </div>
                            ) : (
                                <div onClick={addBMK}>
                                    <img
                                        src="/assets/images/bmkIcon_clear.svg"
                                        alt="Add Bookmark"
                                    />
                                </div>
                            )} */}
                        </div>
                        <p className="subtitle2">{hospitalInfo.name}</p>
                    </div>
                    <div className="pl-[24px]">
                        <p className="body2 text-sub-200">
                            {hospitalInfo.address}
                        </p>
                        <p className="body2 text-sub-100">
                            {hospitalInfo.phone}
                        </p>
                    </div>
                </div>
                <div>
                    <p className="subtitle1">병원 지도</p>
                    <KakaoMapView
                        width="90%"
                        height="200px"
                        radius="4px"
                        setHospitalInfo={setHospitalInfo}
                    />
                </div>
            </form>

            <NavBar className="hospital-view-navbar" />
        </>
    );
}

export default HospitalView;
