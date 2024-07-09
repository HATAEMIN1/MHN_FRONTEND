import React, { useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import Icons from "../../assets/Icons";
import "../../assets/css/style.scss";

function AccountPetAdd() {
    const [selectedPet, setSelectedPet] = useState("");

    const handleChange = (event) => {
        setSelectedPet(event.target.value);
    };

    return (
        <>
            <Header title="펫 등록" />
            <div className="h-full mx-7">
                <div className="flex gap-3 my-16 items-center">
                    <img src={Icons.pets} className="w-10" />
                    <h2 className="subtitle1 text-primary-300">
                        펫 정보를 입력해주세요.
                    </h2>
                </div>
                <div className="h-[300px]  flex flex-col border rounded-lg px-5 py-4 gap-8 justify-center text-primary-300">
                    <p className="flex border-b px-2 py-3 justify-between gap-2">
                        <span className="subtitle1">이름</span>
                        <input className="body2" />
                    </p>
                    <p className="flex border-b px-2 py-3 justify-between gap-2">
                        <span className="subtitle1">종</span>
                        <select
                            value={selectedPet}
                            onChange={handleChange}
                            className="body2"
                        >
                            <option disabled>목록</option>
                            <option>강아지</option>
                            <option>고양이</option>
                        </select>
                    </p>
                    <p className="flex border-b px-2 py-3 justify-between gap-2">
                        <span className="subtitle1">생일</span>
                        <input type="date" className="body2" />
                    </p>
                </div>
            </div>
            <NavBar />
        </>
    );
}

export default AccountPetAdd;
