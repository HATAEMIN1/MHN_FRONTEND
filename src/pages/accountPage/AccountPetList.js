import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import "../../assets/css/style.scss";
import { useNavigate, useParams } from "react-router-dom";
import ModalManager from "../../components/modal/ModalManager";
import ButtonBlack from "../../components/button/ButtonBlack";
import ImageUploader from "../../components/ImageUploader";
import axios from "axios";

function AccountPetList() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [pets, setPets] = useState([]);

    // 모든 펫 정보 가져오기
    useEffect(() => {
        axios
            .get("http://localhost:8084/api/v1/pets/allpet")
            .then((response) => {
                setPets(response.data);
            })
            .catch((error) => {
                console.error("Error fetching pets:", error);
            });
    }, []);

    // 한마리 펫 정보 가져오기
    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8084/api/v1/pets/${id}`)
    //         .then((response) => {
    //             console.log(response.data); // 서버에서 받은 데이터 처리
    //             // 필요한 경우 상태에 저장하거나 다른 작업 수행
    //         })
    //         .catch((error) => {
    //             console.error(`Error fetching pet ${id}:`, error);
    //         });
    // }, [id]); // id가 변경될 때마다 다시 요청

    // 펫 삭제
    const handleDelete = (id, closeModal) => {
        axios
            .delete(`http://localhost:8084/api/v1/pets/${id}`)
            .then(() => {
                setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
                closeModal();
            })
            .catch((error) => {
                console.error(`Error deleting pet ${id}:`, error);
            });
    };

    return (
        <>
            <Header title="펫 리스트" />

            <div className="flex flex-col items-center">
                {pets.map((pet) => (
                    <div
                        key={pet.id}
                        className="w-full flex flex-col items-center gap-2 py-4 my-2 border-b border-gray-100"
                    >
                        <div className="w-24 h-24 mb-4">
                            {pet.petImage ? (
                                <img
                                    src={`http://localhost:8084/api/v1/pets/image/${pet.petImage}`}
                                    alt={pet.name}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
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
                        <p className="subtitle1 text-primary-300">{pet.name}</p>
                        <span className="body2 block text-sub-100">
                            {pet.kind}
                        </span>
                        <span className="body2 block text-sub-100">
                            {pet.age}
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
                        <img
                            src="/assets/images/arrow_rightW.svg"
                            alt="arrow right"
                        />
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
