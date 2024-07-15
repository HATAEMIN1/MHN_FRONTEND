import React, { useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import "../../assets/css/style.scss";
import ModalManager from "../../components/modal/ModalManager";
import { useNavigate } from "react-router-dom";
import ButtonBlack from "../../components/button/ButtonBlack";
import PetDropDown from "../../components/PetDropDown";
import ImageUploader from "../../components/ImageUploader";

function AccountPetAdd() {
    const navigate = useNavigate();
    const [hasValue, setHasValue] = useState(false);

    const handleSubmit = (closeModal) => {
        closeModal();
        navigate("/account/pets");
    };

    return (
        <form>
            <ModalManager
                modalContent={({ closeModal }) => (
                    <div>
                        <p className="mb-3">등록되었습니다.</p>
                        <ButtonBlack
                            handleClick={(e) => {
                                e.preventDefault(); // 추가: 폼 제출 방지
                                handleSubmit(closeModal);
                            }}
                            text1="확인"
                            className="body2"
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
                {/* img s */}
                <ImageUploader />
                {/* img e */}

                {/* input s */}
                <div className="w-full flex flex-col border border-gray-200 rounded-lg px-5 py-4 gap-8 justify-center text-primary-300">
                    {/* name s  */}
                    <p className="flex border-b border-gray-500 px-2 py-3 gap-2">
                        <span className="subtitle1">이름</span>
                        <input className="body2 flex-grow text-sub-100 focus:outline-none" />
                    </p>
                    {/* name e  */}
                    <PetDropDown />

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
