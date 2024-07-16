// 병원 상세 뷰 페이지에 들어갈 지도
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useParams } from "react-router-dom";

function KakaoMapView({ ...props }) {
    const { hpId } = useParams();
    const [hospitals, setHospitals] = useState([]);
    const mapRef = useRef(null);

    useEffect(() => {
        const fetchHospitals = async () => {
            if (hpId) {
                try {
                    const response = await axiosInstance.get(
                        `/hospitals/view?id=${hpId}`
                    );
                    setHospitals(response.data);
                    console.log(response.data);
                    props.setHospitalInfo(response.data);
                } catch (error) {
                    console.error("병원 정보를 가져오는 중 오류 발생:", error);
                }
            }
        };

        fetchHospitals();
    }, [hpId, props.setHospitalInfo]);

    useEffect(() => {
        if (hospitals && hospitals.latitude && hospitals.longitude) {
            const kakao = window.kakao;

            const markerPosition = new kakao.maps.LatLng(
                `${hospitals.latitude}`,
                `${hospitals.longitude}`
            );

            // 이미지 지도에 표시할 마커입니다
            const marker = {
                position: markerPosition,
            };

            const staticMapOption = {
                center: new kakao.maps.LatLng(
                    `${hospitals.latitude}`,
                    `${hospitals.longitude}`
                ), // 이미지 지도의 중심좌표
                level: 3, // 이미지 지도의 확대 레벨
                marker: marker, // 이미지 지도에 표시할 마커
            };

            // 이미지 지도를 생성합니다
            new kakao.maps.StaticMap(mapRef.current, staticMapOption);
        }
    }, [hospitals]);

    console.log("hospitals.latitude", hospitals.latitude);
    console.log("hospitals.longitude", hospitals.longitude);
    return (
        <>
            {/* <div
                id="map"
                style={{
                    width: `${props.width}`,
                    height: `${props.height}`,
                    borderRadius: `${props.radius}`,
                    margin: "auto",
                }}
            ></div> */}
            <div
                ref={mapRef}
                style={{
                    width: `${props.width}`,
                    height: `${props.height}`,
                    borderRadius: `${props.radius}`,
                    margin: "auto",
                }}
            ></div>
        </>
    );
}

export default KakaoMapView;
