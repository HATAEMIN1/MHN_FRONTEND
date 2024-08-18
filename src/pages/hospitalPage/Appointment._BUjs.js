// import React, { useEffect, useState } from "react";
// import Header from "../../layouts/header/Header";
// import NavBar from "../../layouts/nav/NavBar";
// import ButtonBlack from "../../components/button/ButtonBlack";
// import ModalManager from "../../components/modal/ModalManager";
// import ButtonClear from "../../components/button/ButtonClear";
// import { useNavigate, useParams } from "react-router-dom";

// function Appointment() {
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [selectedTime, setSelectedTime] = useState(null);
//     const [localDateTime, setLocalDateTime] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [showSecondModal, setShowSecondModal] = useState(false);
//     const { hpId } = useParams();
//     const navigate = useNavigate();

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
//         if (selectedTime !== null) {
//             console.log("선택된 시간은", selectedTime);
//         }
//     }, [selectedTime]);

//     // useEffect(() => {
//     //     if (selectedDay !== null && selectedTime !== null) {
//     //         const year = currentDate.getFullYear();
//     //         const month = currentDate.getMonth();
//     //         const [hours, minutes] = selectedTime.split(":").map(Number);
//     //         const dateTime = new Date(year, month, selectedDay, hours, minutes);
//     //         const formattedDateTime = dateTime.toISOString().slice(0, 19);
//     //         setLocalDateTime(formattedDateTime);
//     //         console.log("LocalDateTime 형식:", formattedDateTime);
//     //     }
//     // }, [selectedDay, selectedTime]);

//     useEffect(() => {
//         if (selectedDay !== null && selectedTime !== null) {
//             const year = currentDate.getFullYear();
//             const month = currentDate.getMonth();
//             const formattedDateTime = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}T${selectedTime}:00`;
//             setLocalDateTime(formattedDateTime);
//             console.log("LocalDateTime 형식:", formattedDateTime);
//         }
//     }, [selectedDay, selectedTime]);
//     const isTimeDisabled = (time) => {
//         if (selectedDay === null) return true; // 날짜가 선택되지 않았으면 모든 시간 비활성화
//         if (selectedDay === day) {
//             const [hours, minutes] = time.split(":").map(Number);
//             const selectedDateTime = new Date(currentDate);
//             selectedDateTime.setHours(hours, minutes, 0, 0);
//             return selectedDateTime <= currentDate;
//         }
//         return false;
//     };

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setShowSecondModal(false);
//     };

//     const createAppointment = () => {
//         setShowSecondModal(true);
//     };

//     useEffect(() => {
//         if (selectedDay !== null) {
//             console.log("선택된 날짜는", selectedDay);
//             setSelectedTime(null); // 날짜가 변경되면 선택된 시간 초기화
//             setLocalDateTime(null);
//         }
//     }, [selectedDay]);
//     console.log(localDateTime);

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
//                 ].map((time, index) => {
//                     const isDisabled = isTimeDisabled(time.start);
//                     return (
//                         <button
//                             key={index}
//                             className={`border px-[36px] py-[16px] rounded-[4px] flex flex-col items-center justify-center
//                                  ${selectedTime === time.start ? "bg-sub-200" : "hover:bg-sub-300"}
//                                  ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
//                             onClick={() => {
//                                 if (!isDisabled) setSelectedTime(time.start);
//                             }}
//                             disabled={isDisabled}
//                         >
//                             <p
//                                 className={`body1 ${selectedTime === time.start ? "text-gray-100" : "text-primary-300"}`}
//                             >
//                                 {time.start}
//                             </p>
//                             <p
//                                 className={`mini ${selectedTime === time.start ? "text-gray-200" : "text-gray-300"}`}
//                             >
//                                 ~{time.end}
//                             </p>
//                         </button>
//                     );
//                 })}
//             </div>
//             <div className="text-center pt-[36px]">
//                 <p className="body2 text-primary-300">병원 진료 예약 신청 후</p>

//                 <p className="body2 text-primary-300">
//                     병원 진료 현황에 따라{" "}
//                     <span className="text-red-500 font-bold">
//                         예약 승인이 거절될 수 있습니다.🥲
//                     </span>
//                 </p>
//                 <p className="body2 text-primary-300">
//                     추가 문의 사항은 해당 병원으로{" "}
//                     <span className="text-red-500 font-bold">
//                         직접 전화 문의{" "}
//                     </span>
//                     부탁드립니다🥰💕
//                 </p>
//                 {/* <Link to={`/hospitals/${hpId}`}>
//                     <p className="font-bold">병원 상세 페이지로 이동</p>
//                 </Link> */}
//             </div>

//             <ModalManager
//                 modalContent={({ closeModal: managerCloseModal }) => (
//                     <div>
//                         {!showSecondModal ? (
//                             <>
//                                 <p className="body1 text-primary-300">
//                                     진료예약을 하시겠습니까?
//                                 </p>
//                                 <p className="mb-[8px] mini text-gray-300">
//                                     확정 전, 날짜와 시간을 다시 한번
//                                     확인해주세요.
//                                 </p>
//                                 <ButtonClear
//                                     text1="네"
//                                     text2="아니요"
//                                     handleClick={async () => {
//                                         await createAppointment();
//                                     }}
//                                     handleClick2={managerCloseModal}
//                                 />
//                             </>
//                         ) : (
//                             <>
//                                 <p className="body1 text-primary-300">
//                                     예약 완료되었습니다.
//                                 </p>
//                                 <ButtonClear
//                                     text1="확인"
//                                     handleClick={() => {
//                                         closeModal();
//                                         navigate(`/hospitals/${hpId}`);
//                                     }}
//                                 />
//                             </>
//                         )}
//                     </div>
//                 )}
//             >
//                 {({ openModal: managerOpenModal }) =>
//                     localDateTime ? (
//                         <div
//                             onClick={() => {
//                                 managerOpenModal();
//                                 openModal();
//                             }}
//                         >
//                             <div className="flex justify-center pt-[36px]">
//                                 <ButtonBlack
//                                     text1="진료예약하기"
//                                     width="100%"
//                                     height="45px"
//                                 />
//                             </div>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="flex justify-center pt-[36px]">
//                                 <ButtonBlack
//                                     text1="진료 날짜, 시간을 먼저 정해주세요!"
//                                     width="100%"
//                                     height="45px"
//                                     disabled={true}
//                                 />
//                             </div>
//                         </>
//                     )
//                 }
//             </ModalManager>
//             <NavBar className="hospital-view-navbar" />
//         </>
//     );
// }

// export default Appointment;
