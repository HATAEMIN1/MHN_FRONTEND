import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link } from "react-router-dom";

function HospitalReview() {
    const [rating, setRating] = useState([true, true, true, true, true]);
    const handleOnclick = (idx) => {
        setRating(rating.map((item, index) => (index > idx ? false : true)));
    };
    useEffect(() => {}, [rating]);
    console.log(rating);
    return (
        <>
            <Header title="병원 상세 정보" />
            <div>
                <img
                    src="/assets/images/testHospital.svg"
                    className="m-auto w-full mb-[24px]"
                />
            </div>
            <div className="py-[16px]">
                <ul className="flex justify-around gap-[2px]">
                    <Link to="/hospitals/:hpId" className="border-b w-full">
                        <li className=" text-center body2">병원정보</li>
                    </Link>
                    <li className="border-b-2 w-full text-center body2">
                        진료후기
                    </li>
                </ul>
            </div>
            <div className="flex items-center">
                <p className="mini text-gray-300">nn개의 후기</p>
                <div className="border flex">
                    {rating.map((item, idx) => {
                        return item ? (
                            <img
                                src="/assets/images/ratingIcon_color.svg"
                                onClick={() => handleOnclick(idx)}
                            />
                        ) : (
                            <img
                                src="/assets/images/ratingIcon_clear.svg"
                                onClick={() => handleOnclick(idx)}
                            />
                        );
                    })}
                </div>
            </div>
            {/* 자유게시판 댓글작성 인풋폼 가져오기 컴포넌트 */}
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center w-full gap-[10px]">
                        <img
                            src="/assets/images/testDog.svg"
                            className="w-[50px] h-[50px] rounded-[50px]"
                        />
                        <div>
                            <p className="subtitle2 text-primary-300">닉네임</p>
                            <p className="body2 text-sub-200">댓글내용용</p>
                            <p className="mini text-gray-300">n분전</p>
                        </div>
                    </div>
                    <div className="flex gap-[2px]">
                        <img src="/assets/images/ratingIcon_color.svg" />
                        <p>5</p>
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    );
}

export default HospitalReview;
