import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import Icons from "../../assets/Icons";

function AccountPetAdd() {
    return (
        <>
            <Header title="펫 등록" />
            <div className="flex">
                <img src={Icons.pets} />
                <h2>펫 정보를 입력해주세요</h2>
            </div>
            <div>
                <p className="flex">
                    <span>이름</span>
                    <input></input>
                </p>
                <p className="flex">
                    <span>종</span>
                    <select></select>
                    <img src={Icons.dog} />
                    <p>강아지</p>
                    <img src={Icons.cat} />
                    <p>고양이</p>
                </p>
                <p className="flex">
                    <span>생일</span>
                    <p>2000.00.00</p>
                </p>
            </div>
            <NavBar />
        </>
    );
}

export default AccountPetAdd;
