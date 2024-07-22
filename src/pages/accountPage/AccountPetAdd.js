import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import "../../assets/css/style.scss";
import ModalManager from "../../components/modal/ModalManager";
import { useNavigate } from "react-router-dom";
import ButtonBlack from "../../components/button/ButtonBlack";
import PetDropDown from "../../components/PetDropDown";
import ImageUploader from "../../components/ImageUploader";
import axios from "axios";

function AccountPetAdd() {
    const navigate = useNavigate();
    const [hasValue, setHasValue] = useState(false);
    const [pet, setPet] = useState({ name: "", kind: "", age: 0 });
    const [petImage, setPetImage] = useState(null);

    const handleImageChange = (file) => {
        setPetImage(file);
    };

    // 입력 필드 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPet((prevPet) => ({
            ...prevPet,
            [name]: value,
        }));
    };

    // 드롭다운 선택 핸들러
    const handleSelectKind = (kind) => {
        setPet((prevPet) => ({
            ...prevPet,
            kind,
        }));
    };

    // 펫 등록
    const handleAddPet = () => {
        const formData = new FormData();
        formData.append("name", pet.name);
        formData.append("kind", pet.kind);
        formData.append("age", pet.age);
        if (petImage) {
            formData.append("petImage", petImage);
        }

        axios
            .post("http://localhost:8084/api/v1/pets/addpet", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                console.log("펫 등록 완료 !!!!!!");
                navigate("/account/pets");
            })
            .catch((error) => {
                console.error("펫 등록 오류!@@@@@@", error);
            });
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
                                handleAddPet();
                                openModal();
                            }}
                        />
                    </div>
                )}
            </ModalManager>

            <div className="h-full flex flex-col items-center ">
                {/* img s */}
                <ImageUploader onImageChange={handleImageChange} />
                {/* ... 다른 JSX */}
                {/* img e */}

                {/* input s */}
                <div className="w-full flex flex-col border border-gray-200 rounded-lg px-5 py-4 gap-8 justify-center text-primary-300">
                    {/* name s  */}
                    <p className="flex border-b border-gray-500 px-2 py-3 gap-2">
                        <span className="subtitle1">이름</span>
                        <input
                            className="body2 flex-grow text-sub-100 focus:outline-none"
                            name="name"
                            value={pet.name}
                            onChange={handleChange}
                        />
                    </p>
                    {/* name e  */}
                    <PetDropDown onSelect={handleSelectKind} />

                    {/* date s  */}
                    <p className="flex border-b border-gray-500 px-2 py-3 justify-between">
                        <span className="subtitle1">생일</span>
                        <input
                            type="date"
                            className={`body2 focus:outline-none ${hasValue ? "text-sub-100" : "text-transparent"}`}
                            // hasValue가 true면 text-sub-100
                            // hasvalue가 false면 text-transparent
                            onChange={(e) => {
                                setHasValue(e.target.value !== "");
                                handleChange(e);
                            }}
                            name="age"
                            value={pet.age}
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
