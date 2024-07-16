// 병원 상세 뷰 페이지에 들어갈 지도
import React, { useEffect, useState } from "react";

function KakaoMapView({ ...props }) {
    const [map, setMap] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const kakao = window.kakao;
        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
        };
        const newMap = new kakao.maps.Map(mapContainer, mapOption);
        setMap(newMap);

        // 마커를 표시할 위치와 title 객체 배열입니다
        const positions = [
            {
                title: "카카오",
                latlng: new kakao.maps.LatLng(33.450705, 126.570677),
            },
            {
                title: "생태연못",
                latlng: new kakao.maps.LatLng(33.450936, 126.569477),
            },
            {
                title: "텃밭",
                latlng: new kakao.maps.LatLng(33.450879, 126.56994),
            },
            {
                title: "근린공원",
                latlng: new kakao.maps.LatLng(33.451393, 126.570738),
            },
        ];

        // 마커 이미지의 이미지 주소입니다
        const imageSrc = "/assets/images/testMarkerIcon.svg";

        // 마커를 생성하고 지도에 표시합니다
        positions.forEach((position) => {
            const imageSize = new kakao.maps.Size(50, 50); // 마커 이미지의 이미지 크기입니다
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지를 생성합니다

            // 마커를 생성합니다
            new kakao.maps.Marker({
                map: newMap, // 마커를 표시할 지도
                position: position.latlng, // 마커를 표시할 위치
                title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지
            });
        });
    }, []);

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

    console.log("현재위치 좌표값::", location);
    setDraggable(false);
    setZoomable(false);

    return (
        <>
            <div
                id="map"
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
