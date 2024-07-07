import React, { useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import DatePicker from "react-datepicker";

function ChartAdd() {
    const dig = "췌장염";
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <Header />
            <div>
                <input
                    type="text"
                    placeholder="병원이름"
                    className="border-b w-full"
                />
            </div>

            <div className="py-8">
                <div className="p-2 ">
                    <h2 className="py-2">유저 id</h2>
                    <input
                        type="text"
                        className="h-[52px] w-full rounded-md border-2"
                    />
                </div>
                <div className="p-2">
                    <h2 className="py-2">진료 일자</h2>
                    <DatePicker
                        showIcon
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="h-[52px] w-full rounded-md border-2"
                    />
                </div>
                <div className="p-2">
                    <h2 className="py-2">병명</h2>
                    <input
                        type="text"
                        className="h-[52px] w-full rounded-md border-2 cursor-auto"
                        value={dig}
                        readOnly
                    />
                </div>
                <div className="p-2">
                    <div className="flex justify-between">
                        <h2 className="py-2">설명</h2>
                        <div className="flex">
                            <img
                                src="/assets/images/clipIcon.svg"
                                className="block w-full"
                            />
                            <p>파일 첨부</p>
                        </div>
                    </div>

                    <textarea className="h-[130px] w-full rounded-md border-2" />
                </div>

                <div className="flex flex-wrap justify-evenly">
                    <div className="p-2 w-[200px]">
                        <img src="/assets/logoColor.png" className="w-full" />
                    </div>
                    <div className="p-2 w-[200px]">
                        <img src="/assets/logoColor.png" className="w-full" />
                    </div>
                    <div className="p-2 w-[200px]">
                        <img src="/assets/logoColor.png" className="w-full" />
                    </div>
                    <div className="p-2 w-[200px]">
                        <img src="/assets/logoColor.png" className="w-full" />
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    );
}

export default ChartAdd;
