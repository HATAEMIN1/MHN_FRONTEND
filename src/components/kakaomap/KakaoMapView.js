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

            const mapOption = {
                center: new kakao.maps.LatLng(
                    hospitals.latitude,
                    hospitals.longitude
                ),
                level: 3,
            };

            const map = new kakao.maps.Map(mapRef.current, mapOption);

            const markerPosition = new kakao.maps.LatLng(
                hospitals.latitude,
                hospitals.longitude
            );

            const hospitalImageSrc = "/assets/images/testMarkerIcon.svg";
            const imageSize = new kakao.maps.Size(50, 50);
            const markerImage = new kakao.maps.MarkerImage(
                hospitalImageSrc,
                imageSize
            );

            const marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage,
            });

            marker.setMap(map);
            const setDraggable = (draggable) => {
                if (map) {
                    map.setDraggable(draggable);
                }
            };

            const setZoomable = (zoomable) => {
                if (map) {
                    map.setZoomable(zoomable);
                }
            };

            setDraggable(false);
            setZoomable(false);
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
