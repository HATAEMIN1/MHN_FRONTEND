import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import ButtonBlack from "../../components/ButtonBlack";
import "../../assets/css/style.scss";
import { useNavigate } from "react-router-dom";

function AccountPetList() {
    const navigate = useNavigate();
    return (
        <>
            <Header title="펫 리스트" />

            <div className="h-full flex flex-col items-center justify-evenly">
                {/* pet1 s */}
                <div className="w-full flex flex-col items-center gap-2 py-4 border-b border-gray-100">
                    <img
                        src="/assets/images/dog.svg"
                        className="inline-block w-7 h-7"
                    />
                    <p className="subtitle1 text-primary-300">김츄츄</p>
                    <span className="body2 block text-sub-100">2024.02.15</span>
                    <button className="body2 inline-block text-gray-300">
                        삭제하기
                    </button>
                </div>
                {/* pet1 e  */}

                {/* pet2 s  */}
                <div className="w-full flex flex-col items-center gap-2 py-4 border-b border-gray-100">
                    <img
                        src="/assets/images/cat.svg"
                        className="inline-block w-7 h-7"
                    />
                    <p className="subtitle1 text-primary-300">김챠챠</p>
                    <span className="body2 block text-sub-100">2018.11.20</span>
                    <button className="body2 inline-block text-gray-300">
                        삭제하기
                    </button>
                </div>
                {/* pet2 e  */}

                {/* pet3 s */}
                <div className="w-full flex flex-col items-center gap-2 py-4 border-b border-gray-100">
                    <img
                        src="/assets/images/dog.svg"
                        className="inline-block w-7 h-7"
                    />
                    <p className="subtitle1 text-primary-300">김퓨퓨</p>
                    <span className="body2 block text-sub-100">2021.03.07</span>
                    <button className="body2 inline-block text-gray-300">
                        삭제하기
                    </button>
                </div>
                {/* pet3 e */}

                {/* btn s  */}
                <button
                    className="w-full flex justify-center py-1 bg-primary-300 rounded-lg text-primary-400"
                    onClick={() => navigate("/account/pets/new")}
                >
                    <span className="ml-4">펫 등록하기 </span>
                    <img src="/assets/images/arrow_rightW.svg" />
                </button>
                {/* btn e  */}

                {/* text s */}
                <p className="mini text-sub-100">
                    펫은 최대 3마리까지 등록 가능합니다.
                </p>
                {/* text e  */}
            </div>

            <NavBar />
        </>
    );
}

export default AccountPetList;
