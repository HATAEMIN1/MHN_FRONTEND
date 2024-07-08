import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";

function Promotion(props) {
    return (
        <>
            <Header title="구독권 결제"></Header>
            <div className="relative">
                <img
                    src="/assets/images/promotion.svg"
                    className="w-full block"
                />
                <div className="absolute bottom-0 left-0 right-0 text-center text-white text-2xl bg-black">
                    지금 구독할래요😎
                </div>
            </div>
            <NavBar></NavBar>
        </>
    );
}

export default Promotion;
