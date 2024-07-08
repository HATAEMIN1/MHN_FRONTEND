import React, { useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/datepicker.scss";

function ChartAdd() {
    const pets = [
        { id: 1, name: "멍멍이" },
        { id: 2, name: "야옹이" },
        { id: 3, name: "짹짹이" },
    ];
    const [selectedPet, setSelectedPet] = useState("");
    const handlePetChange = (event) => {
        setSelectedPet(event.target.value);
    };
    const dig = "췌장염";
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <Header title="진료기록 등록" button="작성하기" />
            <div>
                <input
                    type="text"
                    placeholder="병원이름"
                    className="border-b w-full px-4"
                />
            </div>

            <div className="py-8">
                <div className="p-2 ">
                    <h2 className="py-2">펫 선택</h2>
                    <select
                        className="h-[52px] w-full rounded-md border-2 px-4 appearance-none"
                        value={selectedPet}
                        onChange={handlePetChange}
                    >
                        {pets.map((pet) => (
                            <option key={pet.id} value={pet.name}>
                                {pet.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="p-2 relative">
                    <h2 className="py-2">진료 일자</h2>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="h-[52px] w-full rounded-md border-2 p-4"
                    />
                </div>
                <div className="p-2">
                    <h2 className="py-2">병명</h2>
                    <input
                        type="text"
                        className="h-[52px] w-full rounded-md border-2 cursor-auto px-4 "
                        value={dig}
                        readOnly
                    />
                </div>
                <div className="p-2 mb-4">
                    <div className="flex justify-between items-center">
                        <h2 className="py-2">설명</h2>
                        <div className="flex">
                            <div className="flex justify-center items-center w-[24px] h-[24px]">
                                <img
                                    src="/assets/images/clipIcon.svg"
                                    className="block w-full"
                                />
                            </div>
                            <p>파일 첨부</p>
                        </div>
                    </div>

                    <textarea className="h-[184px] w-full rounded-md border-2 p-4 " />
                </div>

                {/*스와이퍼 들어가는 자리*/}
                <div className="flex flex-wrap justify-center">
                    <div className="p-2 w-[576px] ">
                        <img
                            src="/assets/logoColor.png"
                            className="w-full rounded-md"
                        />
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    );
}

export default ChartAdd;
