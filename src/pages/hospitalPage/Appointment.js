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

    return (
        <>
            <Header title="진료 예약" />
            <div>{formattedDate}</div>
            <div>{month}월</div>
            <div>{day}일</div>
            <div className="flex justify-around">
                {week.map((day, index) => (
                    <div key={index} className="text-center">
                        <p>{day}</p>
                        <p>{weekDays[index]}</p>
                    </div>
                ))}
            </div>
            <NavBar className="hospital-view-navbar" />
        </>
    );
}

export default Appointment;
