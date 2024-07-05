import React, { useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/style.scss";
function AccountChartView() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <Header />
            <div>병원이름</div>
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
                        className="h-[52px] w-full rounded-md border-2"
                    />
                </div>
                <div className="p-2">
                    <h2 className="py-2">설명</h2>
                    <textarea className="h-[130px] w-full rounded-md border-2" />
                </div>
            </div>

            <NavBar />
        </>
    );
}

export default AccountChartView;
