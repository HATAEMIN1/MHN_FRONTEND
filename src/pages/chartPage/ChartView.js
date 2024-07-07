import React, { useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/style.scss";
function ChartView() {
    return (
        <>
            <Header title="진료기록" />
            <div className="border-b p-2">
                <h2>병원 이름</h2>
            </div>

            <div className="py-8">
                <div className="p-2 ">
                    <h2 className="py-2">펫</h2>
                    <div className="border-2 rounded-md h-[52px] flex items-center px-4">
                        <p>김츄츄</p>
                    </div>
                </div>
                <div className="p-2 ">
                    <h2 className="py-2">진료일자</h2>
                    <div className="border-2 rounded-md h-[52px] flex items-center px-4 relative">
                        <p>2024.09.01</p>
                        <div className="absolute right-5">
                            <img
                                src="/assets/images/calendarIcon.svg"
                                className="w-full block"
                            />
                        </div>
                    </div>
                </div>
                <div className="p-2 ">
                    <h2 className="py-2">병명</h2>
                    <div className="border-2 rounded-md h-[52px] flex items-center px-4">
                        <p>췌장염</p>
                    </div>
                </div>
                <div className="p-2 ">
                    <h2 className="py-2">설명</h2>
                    <div className="border-2 rounded-md  flex items-center px-4 mb-4">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Accusamus accusantium autem dolorem eos fuga
                            illum porro recusandae sapiente suscipit ut. Alias
                            aliquam aliquid consequuntur doloremque ea eos
                            exercitationem facilis fugit hic magni molestiae
                            possimus quasi, quidem sint suscipit tempore
                            temporibus, voluptatum? Aperiam aut debitis dicta
                            doloremque ipsa modi nesciunt nulla?
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="p-2 w-[576px]">
                        <img src="/assets/logoColor.png" className="w-full" />
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    );
}

export default ChartView;
