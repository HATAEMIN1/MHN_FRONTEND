import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import ButtonBlack from "../../components/ButtonBlack";
import "../../assets/css/style.scss";

function AccountPetList() {
    return (
        <>
            <Header title="펫 리스트" />

            <div className="h-full flex flex-col items-center justify-evenly">
                <div className="w-full flex flex-col items-center gap-2 py-4 border-b">
                    <img
                        src="/assets/images/dog.svg"
                        className="inline-block w-8 h-8"
                    />
                    <p className="subtitle1 text-primary-300">김츄츄</p>
                    <span className="body2 block text-sub-100">2024.02.15</span>
                    <button className="body2 inline-block gray-300">
                        삭제하기
                    </button>
                </div>
                <div className="w-full flex flex-col items-center gap-2 py-4 border-b ">
                    <img
                        src="/assets/images/cat.svg"
                        className="inline-block w-8 h-8"
                    />
                    <p className="subtitle1 text-primary-300">김챠챠</p>
                    <span className="body2 block text-sub-100">2018.11.20</span>
                    <button className="body2 inline-block">삭제하기</button>
                </div>
                <div className="w-full flex flex-col items-center gap-2 py-4 border-b ">
                    <img
                        src="/assets/images/dog.svg"
                        className="inline-block w-8 h-8"
                    />
                    <p className="subtitle1 text-primary-300">김퓨퓨</p>
                    <span className="body2 block text-sub-100">2021.03.07</span>
                    <button className="body2 inline-block">삭제하기</button>
                </div>

                <button className="w-full flex justify-center py-2 bg-primary-300 rounded-lg text-primary-400">
                    <span className="ml-4">펫 등록하기 </span>
                    <img src="/assets/images/arrow_rightW.svg" />
                </button>
            </div>
            <NavBar />
        </>
    );
}

export default AccountPetList;
