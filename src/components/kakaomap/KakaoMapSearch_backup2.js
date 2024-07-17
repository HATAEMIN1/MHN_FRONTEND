// 병원 찾기 맵에 들어갈 지도
import React, { useEffect, useRef, useState } from "react";

function KakaoMapSearch({ ...props }) {
    const [location, setLocation] = useState(null);
    const [mapInfo, setMapInfo] = useState(null);
    const mapRef = useRef(null);
    useEffect(() => {
        // 카카오 지도 API를 비동기로 로드
        // const script = document.createElement("script");
        // script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_KEY}`;
        // script.async = true;
        // script.onload = () => {
        // 지도 초기화
        const kakao = window.kakao;
        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
        };
        const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        mapRef.current = map;

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
        const imageSrc =
            // "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
            "/assets/images/testMarkerIcon.svg";

        // 마커를 생성하고 지도에 표시합니다
        props.hospitalList.forEach((position) => {
            const imageSize = new kakao.maps.Size(50, 50); // 마커 이미지의 이미지 크기입니다
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지를 생성합니다

            // 마커를 생성합니다
            new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(
                    position.latitude,
                    position.longitude
                ), // 마커를 표시할 위치
                title: position.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지
            });
        });

        //병원마커 생성
        const hospitalImageSrc = "/assets/images/testMarkerIcon.svg";
        props.hospitalList.forEach((position) => {
            const imageSize = new kakao.maps.Size(50, 50);
            const markerImage = new kakao.maps.MarkerImage(
                hospitalImageSrc,
                imageSize
            );

            new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(
                    position.latitude,
                    position.longitude
                ),
                title: position.name,
                image: markerImage,
            });
        });
        // };
        // document.head.appendChild(script);

        // 새로운 코드: HTML5의 geolocation으로 사용할 수 있는지 확인합니다
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도

                const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    message =
                        '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition, message);
                console.log("lat::", lat);
                console.log("lon::", lon);
                setLocation({ lat: lat, lon: lon });
                console.log("병원정보가뭔디", props.hospitalList);
            });
        } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            const locPosition = new kakao.maps.LatLng(37.4809349, 126.87949),
                message = "geolocation을 사용할수 없어요..";

            displayMarker(locPosition, message);
        }

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition, message) {
            // 마커를 생성합니다
            const imageSize = new kakao.maps.Size(50, 50); // 마커 이미지의 이미지 크기입니다
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지를 생성합니다

            const marker = new kakao.maps.Marker({
                map: map,
                position: locPosition,
                image: markerImage,
            });

            const iwContent = message, // 인포윈도우에 표시할 내용
                iwRemoveable = true;

            // 인포윈도우를 생성합니다
            const infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable,
            });

            // 인포윈도우를 마커위에 표시합니다
            infowindow.open(map, marker);

            // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition);
        }

        // 새로 추가된 getInfo 함수
        function getInfo() {
            const center = map.getCenter();
            const level = map.getLevel();
            const mapTypeId = map.getMapTypeId();
            const bounds = map.getBounds();
            const swLatLng = bounds.getSouthWest();
            const neLatLng = bounds.getNorthEast();

            const info = {
                center: { lat: center.getLat(), lng: center.getLng() },
                level: level,
                mapTypeId: mapTypeId,
                bounds: {
                    sw: { lat: swLatLng.getLat(), lng: swLatLng.getLng() },
                    ne: { lat: neLatLng.getLat(), lng: neLatLng.getLng() },
                },
            };

            setMapInfo(info);
        }

        // 지도 이동 끝났을 때 이벤트 리스너
        kakao.maps.event.addListener(map, "idle", getInfo);
        // };
        // document.head.appendChild(script);
    }, []);
    console.log("현재위치 좌표값::", location);

    useEffect(() => {
        if (location) {
            console.log("현재위치 좌표값::", location);
            props.onLocationChange(location); // 위치가 변경될 때마다 부모 컴포넌트에 알림
        }
    }, []);

    useEffect(() => {
        if (mapInfo) {
            console.log("지도 정보::", mapInfo);
            props.onLocationChange({
                lat: mapInfo.center.lat,
                lon: mapInfo.center.lng,
            }); // 부모 컴포넌트에 중심좌표 위치 정보 전달
        }
    }, [mapInfo]);

    const setCenter = () => {
        if (mapRef.current) {
            const moveLatLon = new window.kakao.maps.LatLng(
                `${location.lat}`,
                `${location.lon}`
            );
            mapRef.current.setCenter(moveLatLon);
        }
    };

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
            <button
                onClick={setCenter}
                className="flex z-50 items-center gap-[2px]"
            >
                <div>
                    <img
                        src="/assets/images/targetIcon.svg"
                        className="block w-full"
                    />
                </div>
                <p>내위치로 이동하기</p>
            </button>
        </>
    );
}

export default KakaoMapSearch;
