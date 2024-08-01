// 병원 찾기 맵에 들어갈 지도
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function KakaoMapSearch({ ...props }) {
    const [location, setLocation] = useState(null);
    const [mapInfo, setMapInfo] = useState(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const infowindowRef = useRef(null);
    const navigate = useNavigate();
    const navigateToPage = (pageUrl) => {
        navigate(pageUrl);
    };

    function mapSet() {
        const kakao = window.kakao;
        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 5, // 지도의 확대 레벨
        };
        const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        mapRef.current = map; // 내위치로 이동하기 버튼 구현 함수에 필요함

        // 새로운 코드: HTML5의 geolocation으로 사용할 수 있는지 확인합니다
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도

                const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    message =
                        '<div style="padding:5px;" class="body2 border">지금 내 위치예요🥰</div>'; // 인포윈도우에 표시될 내용입니다

                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition, message);
                setLocation({ lat: lat, lon: lon });
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
            const imageSrc = "/assets/images/testMarkerIcon_black.svg"; // <=====================현재위치의 마커 모양
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

            // infowindowRef에 현재 인포윈도우 저장
            infowindowRef.current = infowindow;
            // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition);
        }

        // 새로 추가된 getInfo 함수
        function getInfo() {
            // 현재 지도의 중심 좌표를 가져옵니다.
            const center = map.getCenter();

            // 현재 지도의 확대 레벨을 가져옵니다.
            const level = map.getLevel();

            const info = {
                center: { lat: center.getLat(), lng: center.getLng() },
                level: level,
            };

            setMapInfo(info);

            // 지도 이동 시 열려있는 인포윈도우 닫기
            if (infowindowRef.current) {
                infowindowRef.current.close();
                infowindowRef.current = null;
            }
        }

        // 지도 이동 끝났을 때 이벤트 리스너
        kakao.maps.event.addListener(map, "idle", getInfo);
    }

    // 병원 마커 생성 함수
    function createHospitalMarkers() {
        const kakao = window.kakao;
        const map = mapRef.current;

        // 기존 마커 제거
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        const hospitalImageSrc = "/assets/images/testMarkerIcon.svg"; // <=====================병원마커 이미지모양
        props.hospitalList.forEach((hospital) => {
            if (hospital.latitude && hospital.longitude) {
                const imageSize = new kakao.maps.Size(50, 50);
                const markerImage = new kakao.maps.MarkerImage(
                    hospitalImageSrc,
                    imageSize
                );

                const markerPosition = new kakao.maps.LatLng(
                    hospital.latitude,
                    hospital.longitude
                );

                const marker = new kakao.maps.Marker({
                    map: map,
                    position: markerPosition,
                    image: markerImage,
                });

                kakao.maps.event.addListener(marker, "click", () => {
                    navigateToPage(`/hospitals/${hospital.id}`);
                });

                //======추가시작
                // 인포윈도우 생성
                const infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;  width:200px;" class="z-50 rounded-[4px]">
                            <div class="flex items-center justify-start gap-[4px]">
                                <div><img src="/assets/logoColor.png" class="w-[30px] h-[30px] rounded-[4px]"/></div>
                                <div>
                                    <p class="body2 w-full flex flex-grow" style="text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">${hospital.name}</p>
                                    <p class="mini w-full flex flex-grow" >${hospital.phone}</p>
                                </div>
                            </div>
                                <hr/>
                            <div><p class="mini w-full flex flex-grow text-sub-100" >${hospital.address}</p></div>
                        </div>
               `,
                });

                // 마커에 mouseover 이벤트 등록
                kakao.maps.event.addListener(marker, "mouseover", () => {
                    // 기존에 열려있는 인포윈도우 닫기
                    if (infowindowRef.current) {
                        infowindowRef.current.close();
                    }
                    infowindow.open(map, marker);
                    infowindowRef.current = infowindow;
                });

                // 마커에 mouseout 이벤트 등록
                kakao.maps.event.addListener(marker, "mouseout", () => {
                    infowindow.close();
                    infowindowRef.current = null;
                });

                //======추가끝
                markersRef.current.push(marker);
            } else {
                console.warn(
                    "Invalid coordinates for hospital:",
                    hospital.name
                );
            }
        });
    }

    console.log("프롭스값이멀까용", props.hospitalList);

    const setCenter = () => {
        if (mapRef.current) {
            const moveLatLon = new window.kakao.maps.LatLng(
                `${location.lat}`,
                `${location.lon}`
            );
            mapRef.current.setCenter(moveLatLon);
        }
    };

    useEffect(() => {
        if (mapInfo) {
            // console.log("지도 정보::", mapInfo);
            props.onLocationChange({
                lat: mapInfo.center.lat,
                lon: mapInfo.center.lng,
            }); // 부모 컴포넌트에 중심좌표 위치 정보 전달
        }
    }, [mapInfo]);

    useEffect(() => {
        mapSet();
    }, []);

    useEffect(() => {
        if (mapRef.current && props.hospitalList) {
            createHospitalMarkers();
        }
    }, [props.hospitalList]);

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
            >
                {/* 내위치로 이동 버튼 */}
                <button
                    onClick={setCenter}
                    className="flex z-50 items-center gap-[2px] flex justify-end absolute bottom-[10px] right-[20px] z-50 max-w-full border rounded-[50px]
                    bg-white py-[4px] px-[6px]"
                >
                    <div>
                        <img
                            src="/assets/images/targetIcon.svg"
                            className="block w-full"
                        />
                    </div>
                    <p className="subtitle1">내위치로 이동하기</p>
                </button>
            </div>
            <p className="body2 mt-[8px]">
                총{" "}
                <span className="text-sub-100 subtitle2">
                    {props.hospitalList.length}
                </span>
                개의 병원이 검색되었어요!
            </p>
        </>
    );
}

export default KakaoMapSearch;
