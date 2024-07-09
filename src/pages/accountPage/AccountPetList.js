import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import Icons from "../../assets/Icons";
import ButtonBlack from "../../components/ButtonBlack";
import "../../assets/css/style.scss";

function AccountPetList() {
    return (
        <>
            <Header title="펫 리스트" />

            <div className="h-full flex flex-col items-center justify-evenly">
                <div className="w-full flex flex-col items-center gap-2 py-4 border-b border-gray-100">
                    <img src={Icons.dog} className="inline-block w-7 h-7" />
                    <p className="subtitle1 text-primary-300">김츄츄</p>
                    <span className="body2 block text-sub-100">2024.02.15</span>
                    <button className="body2 inline-block text-gray-300">
                        삭제하기
                    </button>
                </div>
                <div className="w-full flex flex-col items-center gap-2 py-4 border-b border-gray-100">
                    <img src={Icons.cat} className="inline-block w-7 h-7" />
                    <p className="subtitle1 text-primary-300">김챠챠</p>
                    <span className="body2 block text-sub-100">2018.11.20</span>
                    <button className="body2 inline-block text-gray-300">
                        삭제하기
                    </button>
                </div>
                <div className="w-full flex flex-col items-center gap-2 py-4 border-b border-gray-100">
                    <img src={Icons.dog} className="inline-block w-7 h-7" />
                    <p className="subtitle1 text-primary-300">김퓨퓨</p>
                    <span className="body2 block text-sub-100">2021.03.07</span>
                    <button className="body2 inline-block text-gray-300">
                        삭제하기
                    </button>
                </div>

                <button className="w-full flex justify-center py-1 bg-primary-300 rounded-lg text-primary-400">
                    <span className="ml-4">펫 등록하기 </span>
                    <img src={Icons.arrowRightW} />
                </button>

                <p className="mini text-sub-100">
                    펫은 최대 3마리까지 등록 가능합니다.
                </p>
            </div>
            <NavBar />
        </>
    );
}

export default AccountPetList;
