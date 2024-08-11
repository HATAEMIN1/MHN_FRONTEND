// import React from "react";
// import Header from "../../layouts/header/Header";
// import NavBar from "../../layouts/nav/NavBar";

// function Appointment() {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().split("T")[0];

//     // 월 가져오기 (0-11 이므로 1을 더합니다)
//     const month = currentDate.getMonth() + 1;

//     // 일 가져오기
//     const day = currentDate.getDate();

//     // 요일 가져오기
//     const dayIndex = currentDate.getDay();
//     const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
//     //최종 요일
//     const dayOfWeek = weekdays[dayIndex];

//     // // 월과 일을 2자리 숫자로 형식화
//     // const formattedMonth = month.toString().padStart(2, "0");
//     // const formattedDay = day.toString().padStart(2, "0");

//     const week = [day, day + 1, day + 2, day + 3, day + 4, day + 5, day + 6];
//     const dayCount = [dayIndex, dayIndex+1, dayIndex+2, dayIndex+3, dayIndex+4, dayIndex+5, dayIndex+6]
//     return (
//         <>
//             <Header title="진료 예약" />
//             <div>{formattedDate}</div>
//             <div>{month}</div>
//             <div>{day}</div>
//             <div className="flex justify-around">
//                 {week.map((day) => {
//                     return (<p>{day}</p>

//                     )
//                 })}
//             </div>
//             <NavBar className="hospital-view-navbar" />
//         </>
//     );
// }

// export default Appointment;
import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";

function Appointment() {
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

    const selectTime = (selectedTime) => {
        console.log("선택된 시간은", selectedTime);
    };

    return (
        <>
            <Header title="진료 예약" />
            <div>{formattedDate}</div>
            <div>{month}월</div>
            <div>{day}일</div>
            <div className="flex justify-around border-b border-gray-100 py-[8px] mb-[36px]">
                {week.map((day, index) => (
                    <div key={index} className="text-center">
                        <p>{day}</p>
                        <p>{weekDays[index]}</p>
                    </div>
                ))}
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
                ].map((time, index) => (
                    <button
                        key={index}
                        className="border px-[36px] py-[16px] rounded-[4px] flex flex-col items-center justify-center hover:bg-sub-300"
                        onClick={() => selectTime(time.start)}
                    >
                        <p className="body1 text-primary-300">{time.start}</p>
                        <p className="mini text-gray-300">~{time.end}</p>
                    </button>
                ))}
            </div>
            <NavBar className="hospital-view-navbar" />
        </>
    );
}

export default Appointment;
