import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link } from "react-router-dom";
import ButtonBlack from "../../components/button/ButtonBlack";
import "../../assets/css/promotion.scss";

function Promotion({ ...props }) {
    return (
        <>
            <div className="promotion-container pt-[100px]">
                <Header title="구독권 결제" />
                <div className="h-[80vh] px-[100px]">
                    <div>
                        <img
                            src="/assets/images/promotion.svg"
                            className="block m-auto w-full"
                        />
                    </div>
                    <div className="py-[40px]">
                        <p className="text-center subtitle2">
                            대략적인 구독권 추가 설명
                        </p>
                        <p className="text-center subtitle2">
                            대략적인 구독권 추가 설명
                        </p>
                        <p className="text-center subtitle2">
                            대략적인 구독권 추가 설명
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
                <NavBar></NavBar>
            </div>
        </>
    );
}

export default Promotion;
