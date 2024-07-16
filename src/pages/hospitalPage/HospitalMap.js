import React, { useEffect, useState } from "react";
import NavBar from "../../layouts/nav/NavBar";
import Header from "../../layouts/header/Header";
import HospitalListForm from "../../components/Form/HospitalListForm";
import SearchInput from "../../components/search/SearchInput";
import { Link } from "react-router-dom";
import KakaoMapSearch from "../../components/kakaomap/KakaoMapSearch";
import axiosInstance from "../../utils/axios";

function HospitalMap() {
    const [location, setLocation] = useState(null);

    const [hospitals, setHospitals] = useState([]);

    const handleLocationChange = (newLocation) => {
        setLocation(newLocation);
        console.log("부모 컴포넌트에서 받은 위치:", newLocation);
        // 여기서 location 정보를 활용하여 원하는 작업을 수행할 수 있습니다.
    };

    // console.log(location.lat);
    // console.log(location.lon);
    useEffect(() => {
        const fetchHospitals = async () => {
            if (location) {
                try {
                    const response = await axiosInstance.get(
                        `/api/v1/hospitals?latitude=${location.lat}&longitude=${location.lon}`
                    );
                    console.log(response);
                    setHospitals(response.data);
                } catch (error) {
                    console.error("병원 정보를 가져오는 중 오류 발생:", error);
                }
            }
        };

        fetchHospitals();
    }, [location]);

    console.log("Map에서 location:::", location);
    console.log("병원 목록:", hospitals);
    return (
        <>
            <div className="mb-[10px]">
                <Header title="내 주변 병원" />
            </div>
            <div className="mb-[20px]">
                <SearchInput />
            </div>
            <div className="mb-[10px] kakao-map-container">
                <KakaoMapSearch
                    width="100%"
                    height="100%"
                    onLocationChange={handleLocationChange}
                />
            </div>
            <div>
                <HospitalListForm hospitalList={hospitals} />
            </div>
            <NavBar />
        </>
    );
}

export default HospitalMap;
