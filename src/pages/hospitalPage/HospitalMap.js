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
        // console.log("부모 컴포넌트에서 받은 위치:", newLocation);
        // 여기서 location 정보를 활용하여 원하는 작업을 수행할 수 있습니다.
    };

    // console.log(location.lat);
    // console.log(location.lon);
    useEffect(() => {
        const fetchHospitals = async () => {
            if (location) {
                try {
                    const response = await axiosInstance.get(
                        `/hospitals?latitude=${location.lat}&longitude=${location.lon}`
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

    // console.log("Map에서 location:::", location);
    // console.log("병원 목록:", hospitals);

    //===========gpt 거리 계산식
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const latDiff = Math.abs(lat2 - lat1);
        const lonDiff = Math.abs(lon2 - lon1);
        return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 111; // 1도는 약 111km
    };

    const formatDistance = (distance) => {
        if (distance < 1) {
            return `${(distance * 1000).toFixed(0)}m`;
        } else {
            return `${distance.toFixed(1)}km`;
        }
    };

    const hospitalsWithDistance = hospitals.map((hospital) => ({
        ...hospital,
        distance: location
            ? formatDistance(
                  calculateDistance(
                      location.lat,
                      location.lon,
                      hospital.latitude,
                      hospital.longitude
                  )
              )
            : "거리 계산 중",
    }));

    return (
        <>
            <div className="mb-[10px]">
                <Header title="내 주변 병원" />
            </div>
            <div className="mb-[20px]">
                <SearchInput />
            </div>
            <div className="mb-[30px] kakao-map-container">
                <KakaoMapSearch
                    width="100%"
                    height="100%"
                    onLocationChange={handleLocationChange}
                    hospitalList={hospitalsWithDistance}
                />
            </div>
            <div>
                <HospitalListForm hospitalList={hospitalsWithDistance} />
            </div>
            <NavBar />
        </>
    );
}

export default HospitalMap;
