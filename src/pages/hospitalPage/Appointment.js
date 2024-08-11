// import React, { useEffect, useState } from "react";
// import Header from "../../layouts/header/Header";
// import NavBar from "../../layouts/nav/NavBar";

// function Appointment() {
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [selectedTime, setSelectedTime] = useState(null);
//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().split("T")[0];

//     // 월과 일 가져오기
//     const month = currentDate.getMonth() + 1;
//     const day = currentDate.getDate();

//     // 요일 배열
//     const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

//     // 오늘부터 7일간의 날짜, 요일 생성
//     const week = [];
//     const weekDays = [];

//     for (let i = 0; i < 7; i++) {
//         const date = new Date(currentDate);
//         date.setDate(currentDate.getDate() + i);
//         week.push(date.getDate());
//         weekDays.push(weekdays[date.getDay()]);
//     }

//     useEffect(() => {
//         if (selectedDay !== null) {
//             console.log("선택된 날짜는", selectedDay);
//         }
//     }, [selectedDay]);

//     useEffect(() => {
//         if (selectedTime !== null) {
//             console.log("선택된 시간은", selectedTime);
//         }
//     }, [selectedTime]);

//     return (
//         <>
//             <Header title="진료 예약" />
//             <div>{formattedDate}</div>
//             <div>{month}월</div>
//             <div>{day}일</div>
//             <div className="flex justify-around border-b border-gray-100 py-[8px] mb-[36px]">
//                 {week.map((day, index) =>
//                     selectedDay == day ? (
//                         <button key={index}>
//                             <div
//                                 className="text-center "
//                                 onClick={() => {
//                                     setSelectedDay(day);
//                                 }}
//                             >
//                                 <p className="bg-sub-200 rounded-[50px] px-[8px] py-[4px] text-gray-100">
//                                     {/* <p
//                                     className={`bg-sub-200 rounded-[50px] px-[8px] py-[4px] ${
//                                         weekDays[index] === "일"
//                                             ? "text-red-500"
//                                             : weekDays[index] === "토"
//                                               ? "text-blue-700"
//                                               : "text-gray-100"
//                                     }`}
//                                 > */}
//                                     {day}
//                                 </p>
//                                 <p
//                                     className={
//                                         weekDays[index] === "일"
//                                             ? "text-red-500"
//                                             : weekDays[index] === "토"
//                                               ? "text-blue-700"
//                                               : ""
//                                     }
//                                 >
//                                     {weekDays[index]}
//                                 </p>
//                             </div>
//                         </button>
//                     ) : (
//                         <button key={index}>
//                             <div
//                                 className="text-center"
//                                 onClick={() => {
//                                     setSelectedDay(day);
//                                 }}
//                             >
//                                 <p
//                                     className={
//                                         weekDays[index] === "일"
//                                             ? "text-red-500"
//                                             : weekDays[index] === "토"
//                                               ? "text-blue-700"
//                                               : ""
//                                     }
//                                 >
//                                     {day}
//                                 </p>
//                                 <p
//                                     className={
//                                         weekDays[index] === "일"
//                                             ? "text-red-500"
//                                             : weekDays[index] === "토"
//                                               ? "text-blue-700"
//                                               : ""
//                                     }
//                                 >
//                                     {weekDays[index]}
//                                 </p>
//                             </div>
//                         </button>
//                     )
//                 )}
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                 {[
//                     { start: "11:00", end: "12:00" },
//                     { start: "12:00", end: "13:00" },
//                     { start: "13:00", end: "14:00" },
//                     { start: "14:00", end: "15:00" },
//                     { start: "15:00", end: "16:00" },
//                     { start: "16:00", end: "17:00" },
//                     { start: "17:00", end: "18:00" },
//                     { start: "18:00", end: "19:00" },
//                 ].map((time, index) =>
//                     selectedTime == time.start ? (
//                         <button
//                             key={index}
//                             className="border px-[36px] py-[16px] rounded-[4px] flex flex-col items-center justify-center bg-sub-200"
//                             onClick={() => {
//                                 setSelectedTime(time.start);
//                             }}
//                         >
//                             <p className="body1 text-gray-100">{time.start}</p>
//                             <p className="mini text-gray-200">~{time.end}</p>
//                         </button>
//                     ) : (
//                         <button
//                             key={index}
//                             className="border px-[36px] py-[16px] rounded-[4px] flex flex-col items-center justify-center hover:bg-sub-300"
//                             onClick={() => {
//                                 setSelectedTime(time.start);
//                             }}
//                         >
//                             <p className="body1 text-primary-300">
//                                 {time.start}
//                             </p>
//                             <p className="mini text-gray-300">~{time.end}</p>
//                         </button>
//                     )
//                 )}
//             </div>
//             <NavBar className="hospital-view-navbar" />
//         </>
//     );
// }

// export default Appointment;
import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";

function Appointment() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    // 월과 일 가져오기
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    // 요일 배열
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

    // 오늘부터 7일간의 날짜, 요일 생성
    const week = [];
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        week.push(date.getDate());
        weekDays.push(weekdays[date.getDay()]);
    }

    useEffect(() => {
        if (selectedDay !== null) {
            console.log("선택된 날짜는", selectedDay);
            setSelectedTime(null); // 날짜가 변경되면 선택된 시간 초기화
        }
    }, [selectedDay]);

    useEffect(() => {
        if (selectedTime !== null) {
            console.log("선택된 시간은", selectedTime);
        }
    }, [selectedTime]);

    const isTimeDisabled = (time) => {
        if (selectedDay === null) return true; // 날짜가 선택되지 않았으면 모든 시간 비활성화
        if (selectedDay === day) {
            const [hours, minutes] = time.split(":").map(Number);
            const selectedDateTime = new Date(currentDate);
            selectedDateTime.setHours(hours, minutes, 0, 0);
            return selectedDateTime <= currentDate;
        }
        return false;
    };

    return (
        <>
            <Header title="진료 예약" />
            <div>{formattedDate}</div>
            <div>{month}월</div>
            <div>{day}일</div>
            <div className="flex justify-around border-b border-gray-100 py-[8px] mb-[36px]">
                {week.map((day, index) =>
                    selectedDay == day ? (
                        <button key={index}>
                            <div
                                className="text-center "
                                onClick={() => {
                                    setSelectedDay(day);
                                }}
                            >
                                <p className="bg-sub-200 rounded-[50px] px-[8px] py-[4px] text-gray-100">
                                    {/* <p
                                    className={`bg-sub-200 rounded-[50px] px-[8px] py-[4px] ${
                                        weekDays[index] === "일"
                                            ? "text-red-500"
                                            : weekDays[index] === "토"
                                              ? "text-blue-700"
                                              : "text-gray-100"
                                    }`}
                                > */}
                                    {day}
                                </p>
                                <p
                                    className={
                                        weekDays[index] === "일"
                                            ? "text-red-500"
                                            : weekDays[index] === "토"
                                              ? "text-blue-700"
                                              : ""
                                    }
                                >
                                    {weekDays[index]}
                                </p>
                            </div>
                        </button>
                    ) : (
                        <button key={index}>
                            <div
                                className="text-center"
                                onClick={() => {
                                    setSelectedDay(day);
                                }}
                            >
                                <p
                                    className={
                                        weekDays[index] === "일"
                                            ? "text-red-500"
                                            : weekDays[index] === "토"
                                              ? "text-blue-700"
                                              : ""
                                    }
                                >
                                    {day}
                                </p>
                                <p
                                    className={
                                        weekDays[index] === "일"
                                            ? "text-red-500"
                                            : weekDays[index] === "토"
                                              ? "text-blue-700"
                                              : ""
                                    }
                                >
                                    {weekDays[index]}
                                </p>
                            </div>
                        </button>
                    )
                )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { start: "11:00", end: "12:00" },
                    { start: "12:00", end: "13:00" },
                    { start: "13:00", end: "14:00" },
                    { start: "14:00", end: "15:00" },
                    { start: "15:00", end: "16:00" },
                    { start: "16:00", end: "17:00" },
                    { start: "17:00", end: "18:00" },
                    { start: "18:00", end: "19:00" },
                ].map((time, index) => {
                    const isDisabled = isTimeDisabled(time.start);
                    return (
                        <button
                            key={index}
                            className={`border px-[36px] py-[16px] rounded-[4px] flex flex-col items-center justify-center
                                 ${selectedTime === time.start ? "bg-sub-200" : "hover:bg-sub-300"}
                                 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => {
                                if (!isDisabled) setSelectedTime(time.start);
                            }}
                            disabled={isDisabled}
                        >
                            <p
                                className={`body1 ${selectedTime === time.start ? "text-gray-100" : "text-primary-300"}`}
                            >
                                {time.start}
                            </p>
                            <p
                                className={`mini ${selectedTime === time.start ? "text-gray-200" : "text-gray-300"}`}
                            >
                                ~{time.end}
                            </p>
                        </button>
                    );
                })}
            </div>
            <NavBar className="hospital-view-navbar" />
        </>
    );
}

export default Appointment;
