import React, { useEffect } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link, useNavigate } from "react-router-dom";
import ButtonBlack from "../../components/button/ButtonBlack";
import "../../assets/css/promotion.scss";
import { useSelector } from "react-redux";

function Promotion({ ...props }) {
    const selector = useSelector((state) => {
        return state.userSlice;
    });
    const navigate = useNavigate();
    useEffect(() => {
        if (selector.memberTypeList.length > 1) {
            navigate(`/subscription/${selector.id}`);
        }
    }, []);

    return (
        <>
            <div className="promotion-container pt-[100px] pb-[70px] ">
                <Header title="구독권 결제" />
                <div className="h-[80%] px-[100px]">
                    <div>
                        <img
                            src="/assets/images/promotion.svg"
                            className="block m-auto w-full"
                        />
                    </div>
                    <div className="py-[20px]">
                        <p className="text-center subtitle2">
                            <span className="text-cyan-950 subtitle1">
                                혜택 1{") "}
                            </span>
                            24시간 대기중인 수의사와의 1:1 채팅 전문상담
                        </p>
                        <p className="text-center subtitle2">
                            <span className="text-cyan-950 subtitle1">
                                혜택 2{") "}
                            </span>
                            내 반려동물의 건강상태를 기록할 수 있는
                            <br />
                            진료기록 후기 작성기능 오픈!
                        </p>
                        <p className="text-center subtitle2">
                            <span className="text-cyan-950 subtitle1">
                                혜택 3{") "}
                            </span>
                            구독 결제 금액의 일부로 유기견들을 후원해보세요!
                        </p>
                    </div>
                    <div className="flex justify-center w-full">
                        <Link
                            to="/subscription/payment"
                            style={{ width: "100%" }}
                        >
                            <ButtonBlack
                                text1="지금 구독할래요🥰"
                                width="100%"
                                height="50px"
                            />
                        </Link>
                        {/* <Link to="/subscription/payment">
                            <div className=" text-center text-white text-2xl bg-sub-200 inline-block p-4 w-full">
                                지금 구독할래요😎
                            </div>
                        </Link> */}
                    </div>
                </div>
                <NavBar />
            </div>
        </>
    );
}

export default Promotion;
