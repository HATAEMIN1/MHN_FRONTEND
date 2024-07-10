import React, { useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import "../../assets/css/style.scss";
import ModalManager from "../../components/modal/ModalManager";
import { useNavigate } from "react-router-dom";
import ButtonBlack from "../../components/button/ButtonBlack";

function AccountPetAdd() {
    const navigate = useNavigate();
    const [selectedPet, setSelectedPet] = useState("");
    const [hasValue, setHasValue] = useState(false);

    const handleChange = (event) => {
        setSelectedPet(event.target.value);
    };
    const handleSubmit = (closeModal) => {
        closeModal();
        navigate("/account/pets");
    };

    return (
        <form>
            <ModalManager
                modalContent={({ closeModal }) => (
                    <div>
                        <p>등록완료</p>
                        <ButtonBlack
                            handleClick={(e) => {
                                e.preventDefault(); // 추가: 폼 제출 방지
                                handleSubmit(closeModal);
                            }}
                            text1="확인"
                            style={{
                                marginTop: "20px",
                                fontSize: "16px",
                                cursor: "pointer",
                                color: "blue",
                            }}
                        />
                    </div>
                )}
            >
                {({ openModal }) => (
                    <div>
                        <Header
                            title="펫 등록"
                            button="완료"
                            handleClick={(e) => {
                                e.preventDefault(); // 추가: 폼 제출 방지
                                openModal();
                            }}
                        />
                    </div>
                )}
            </ModalManager>

            <div className="h-full flex flex-col items-center ">
                {/* <div className="flex gap-3 items-center">
                    <img src="/assets/images/pets.svg" className="w-7" />
                    <h2 className="subtitle1 text-primary-300">
                        펫 정보를 입력해주세요
                    </h2>
                </div> */}

                {/* img s */}
                <div className="relative my-14">
                    <img
                        src="/assets/images/dog44.png"
                        className="w-24 h-24 rounded-full"
                    />
                    <button className="bg-primary-300 w-8 h-8 rounded-full flex items-center justify-center absolute bottom-[-5px] right-[-10px]">
                        <img
                            src="/assets/images/camera_W.svg"
                            className="w-5 h-5"
                        />
                    </button>
                </div>
                {/* img e */}

                {/* input s */}
                <div className="w-full flex flex-col border border-gray-200 rounded-lg px-5 py-4 gap-8 justify-center text-primary-300">
                    {/* name s  */}
                    <p className="flex border-b border-gray-500 px-2 py-3 gap-2">
                        <span className="subtitle1">이름</span>
                        <input className="body2 flex-grow text-sub-100 focus:outline-none" />
                    </p>
                    {/* name e  */}

                    {/* sel s  */}
                    <p className="flex border-b border-gray-500 px-2 py-3 justify-between">
                        <span className="subtitle1">종</span>
                        <select
                            value={selectedPet}
                            onChange={handleChange}
                            className="body2 focus:outline-none text-sub-100"
                        >
                            <option disabled>목록</option>
                            <option>강아지</option>
                            <option>고양이</option>
                        </select>
                    </p>
                    {/* sel e  */}

                    {/* date s  */}
                    <p className="flex border-b border-gray-500 px-2 py-3 justify-between">
                        <span className="subtitle1">생일</span>
                        <input
                            type="date"
                            className={`body2 focus:outline-none ${hasValue ? "text-sub-100" : "text-transparent"}`}
                            // hasValue가 true면 text-sub-100
                            // hasvalue가 false면 text-transparent
                            onChange={(e) => setHasValue(e.target.value !== "")}
                            // 입력 값이 비어있지 않으면 setHasValue(true)
                            // 입력 값이 비어있으면 setHasValue(false)
                        />
                    </p>
                    {/* date e  */}
                </div>
                {/* input e  */}
            </div>
            <NavBar />
        </form>
    );
}

export default AccountPetAdd;
