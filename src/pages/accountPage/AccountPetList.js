import React, { useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import "../../assets/css/style.scss";
import { useNavigate } from "react-router-dom";
import ModalManager from "../../components/modal/ModalManager";
import ButtonBlack from "../../components/button/ButtonBlack";
import ImageUploader from "../../components/ImageUploader";

function AccountPetList() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const handleDelete = (petId, closeModal) => {
        // 서버에 삭제 요청 전송
        console.log(`펫 ${petId} 삭제 요청`);
        closeModal();
    };

    const pets = [
        {
            id: 1,
            name: "김츄츄",
            date: "2024.02.15",
            imgSrc: "/assets/images/petDogIcon.svg",
        },
        {
            id: 2,
            name: "김챠챠",
            date: "2018.11.20",
            imgSrc: "/assets/images/petCatIcon.svg",
        },
        {
            id: 3,
            name: "김퓨퓨",
            date: "2021.03.07",
            imgSrc: "/assets/images/petDogIcon.svg",
        },
    ];

    return (
        <>
            <Header title="펫 리스트" />

            <div className="flex flex-col items-center">
                {pets.map((pet) => (
                    <div
                        key={pet.id}
                        className="w-full flex flex-col items-center gap-2 py-4 my-2 border-b border-gray-100"
                    >
                        {/* <ImageUploader /> */}
                        <div className="w-24 h-24 mb-4">
                            {image ? (
                                // 업로드 된 이미지
                                <img
                                    src={image}
                                    alt="Uploaded"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                // 기본 이미지
                                <div className="w-full h-full bg-gray-500 border border-gray-200 rounded-full flex items-center justify-center">
                                    <img
                                        width="30"
                                        height="30"
                                        src="https://img.icons8.com/ios-glyphs/30/737373/dog-muzzle.png"
                                        alt="dog-muzzle"
                                    />
                                </div>
                            )}
                        </div>
                        {/* <img
                            src={pet.imgSrc}
                            className="inline-block w-7 h-7"
                        /> */}
                        <p className="subtitle1 text-primary-300">{pet.name}</p>
                        <span className="body2 block text-sub-100">
                            {pet.date}
                        </span>

                        <ModalManager
                            modalContent={({ closeModal }) => (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleDelete(pet.id, closeModal);
                                    }}
                                >
                                    <p className="mb-3">
                                        정말로 삭제하시겠습니까?
                                    </p>
                                    <ButtonBlack
                                        type="submit"
                                        text1="확인"
                                        style={{
                                            marginTop: "20px",
                                            fontSize: "16px",
                                            cursor: "pointer",
                                            color: "blue",
                                            font: "body2",
                                        }}
                                    />
                                </form>
                            )}
                        >
                            {({ openModal }) => (
                                <button
                                    type="button"
                                    onClick={openModal}
                                    className="body2 inline-block text-gray-300"
                                >
                                    삭제하기
                                </button>
                            )}
                        </ModalManager>
                    </div>
                ))}

                {pets.length < 3 && (
                    <button
                        type="button"
                        className="w-full flex justify-center py-1 my-6 bg-primary-300 rounded-lg text-primary-400"
                        onClick={() => navigate("/account/pets/new")}
                    >
                        <span className="ml-4">펫 등록하기 </span>
                        <img src="/assets/images/arrow_rightW.svg" />
                    </button>
                )}

                {pets.length >= 3 && (
                    <p className="mini text-sub-100 my-6">
                        펫은 최대 3마리까지 등록 가능합니다.
                    </p>
                )}
            </div>

            <NavBar />
        </>
    );
}

export default AccountPetList;
