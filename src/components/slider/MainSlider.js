import React from "react";
import Slider from "react-slick";
// slick-carousel에서 기본 스타일과 테마 스타일을 가져옴
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/sliderCustom.scss";

function MainSlider() {
    const settings = {
        dots: true, // 슬라이더 하단에 점을 표시
        infinite: true, // 무한 슬라이드 설정
        speed: 500, // 슬라이드 속도 설정 (500ms)
        slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
        slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 개수
        dotsClass: "slick-dots custom-dots", // 커스텀 CSS 클래스 지정
        autoplay: true, // 자동 슬라이드 설정
        autoplaySpeed: 3000, // 슬라이드가 자동으로 넘어가는 속도 (3000ms = 3초)
    };

    const images = [
        "/assets/slideImage/banner1.png",
        "/assets/slideImage/banner2.png",
        "/assets/slideImage/banner3.png",
        // "/assets/slideImage/banner4.png",
    ];
    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                // 각 이미지를 슬라이더 아이템으로 렌더링
                <div key={index} className="border border-gray-400">
                    <img src={image} className="w-full h-[280px] object-fill" />
                </div>
            ))}
        </Slider>
    );
}

export default MainSlider;
