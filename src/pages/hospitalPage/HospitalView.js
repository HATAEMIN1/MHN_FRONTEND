// 내일 해야할 일 - 포스트 요청으로 연결해주고, get해온 응답값 setBookmarkState이 null이면 bookmark가 false값이도록, 있으면 bookmark가 true값이도록 조정
// 백엔드 delete 요청 만들어야함
import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link, useParams } from "react-router-dom";
import KakaoMapView from "../../components/kakaomap/KakaoMapView";
import axiosInstance from "../../utils/axios";

function HospitalView() {
    const [bookmark, setBookmark] = useState(false);
    const [bookmarkState, setBookmarkState] = useState(null);
    function handleOnclick() {
        setBookmark(!bookmark);
        console.log(bookmark);
    }
    const [hospitalInfo, setHospitalInfo] = useState({});
    const { hpId } = useParams();

    useEffect(() => {
        console.log("부모 hospitalInfo::", hospitalInfo);
    }, [hospitalInfo]);

    const addBMK = () => {
        console.log("북마크 추가할거임");
    };
    const deleteBMK = () => {
        console.log("북마크 삭제할거임");
    };
    const fetchBMK = async () => {
        try {
            const response = await axiosInstance.get(
                // `/hospitals/bmk?hospitalId=${hpId}&memberId=${나중에 여기 로그인유저값 들어가야함}`
                `/hospitals/bmk?hospitalId=${hpId}&memberId=1`
            );
            setBookmarkState(response.data);
            console.log("bmk상태는::", response.data);
        } catch (error) {
            console.error("병원 정보를 가져오는 중 오류 발생:", error);
        }
    };
    useEffect(() => {
        fetchBMK();
    }, []);

    return (
        <>
            <Header title="병원 상세 정보" />
            <form action="">
                <div>
                    <img
                        src="/assets/images/testHospital.svg"
                        className="m-auto w-full mb-[24px]"
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
                        <div onClick={handleOnclick}>
                            {bookmarkState == null ? (
                                // 이거 누르면 create axios로 실행되게 해야함
                                <div onClick={addBMK}>
                                    <img src="/assets/images/bmkIcon_clear.svg" />
                                </div>
                            ) : (
                                // 이거는 누르면 delete axios로 실행되게 해야함
                                <div onClick={deleteBMK}>
                                    <img src="/assets/images/bmkIcon_color.svg" />
                                </div>
                            )}
                            {/* {bookmark ? (
                                // 이거는 누르면 delete axios로 실행되게 해야함
                                <div onClick={deleteBMK}>
                                    <img src="/assets/images/bmkIcon_color.svg" />
                                </div>
                            ) : (
                                // 이거 누르면 create axios로 실행되게 해야함
                                <div onClick={addBMK}>
                                    <img src="/assets/images/bmkIcon_clear.svg" />
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
