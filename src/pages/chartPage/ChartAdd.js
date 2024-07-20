import React, { useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/datepicker.scss";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import ModalManager from "../../components/modal/ModalManager";
import ButtonBlack from "../../components/button/ButtonBlack";

function ChartAdd() {
    const navigate = useNavigate();
    const pets = [
        { id: 1, name: "멍멍이" },
        { id: 2, name: "야옹이" },
        { id: 3, name: "짹짹이" },
    ];
    const [images, setImages] = useState([]);
    const [imageError, setImageError] = useState("");
    const [formData, setFormData] = useState({
        petId: 1,
        hospital: "",
        selectedPet: "",
        dig: "",
        startDate: new Date(),
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };
    const formatDate = (date) => {
        return date.toISOString().split("T")[0];
    };
    const handleChartSubmit = async (closeModal) => {
        // const body = {
        //     petId: formData.petId,
        //     hospitalName: formData.hospital,
        //     petName: formData.petName,
        //     visitDate: formData.visitDate,
        //     diseaseName: formData.dig,
        //     description: formData.description,
        // };
        const formDataList = new FormData();

        // 차트 데이터 추가
        formDataList.append("petId", formData.petId);
        formDataList.append("hospitalName", formData.hospital);
        formDataList.append("petName", formData.selectedPet);
        formDataList.append("visitDate", formatDate(formData.startDate));
        formDataList.append("diseaseName", formData.dig);
        formDataList.append("description", formData.description);
        // 이미지 파일 추가
        images.forEach((file, index) => {
            formDataList.append(`files`, file);
        });
        try {
            const res = await axiosInstance.post("/charts", formDataList, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res.data);
            setImages([]); // 이미지 상태 초기화
            setImageError(""); // 에러 메시지 초기화
            closeModal();
            navigate("/charts");
        } catch (e) {
            console.log("엑시우스 에러", e);
        }
    };
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (images.length + files.length > 5) {
            setImageError("이미지는 최대 5개까지 첨부할 수 있습니다.");
            return;
        }
        setImages([...images, ...files]);
        setImageError("");
    };
    console.log(formData.startDate);
    return (
        <>
            <form>
                <ModalManager
                    modalContent={({ closeModal }) => (
                        <div>
                            <p>등록완료</p>
                            <ButtonBlack
                                handleClick={(e) => {
                                    e.preventDefault(); // 추가: 폼 제출 방지
                                    handleChartSubmit(closeModal);
                                }}
                                text1="확인"
                            />
                        </div>
                    )}
                >
                    {({ openModal }) => (
                        <div>
                            <Header
                                title="진료기록 등록"
                                button="작성하기"
                                handleClick={(e) => {
                                    e.preventDefault(); // 추가: 폼 제출 방지
                                    openModal();
                                }}
                            />
                        </div>
                    )}
                </ModalManager>
                {/*<Header title="진료기록 등록" button="작성하기" />*/}
                <div className="px-2">
                    <input
                        type="text"
                        placeholder="병원이름"
                        className="border-b w-full px-4 focus:outline-none focus:ring-0"
                        onChange={handleChange}
                        name="hospital"
                    />
                </div>

                <div className="py-8">
                    <div className="p-2 ">
                        <h2 className="py-2">펫 선택</h2>
                        <select
                            className="h-[52px] w-full rounded-md border-2 px-4 appearance-none focus:outline-none focus:ring-0"
                            value={formData.selectedPet}
                            onChange={handleChange}
                        >
                            {pets.map((pet) => (
                                <option key={pet.id} value={pet.name}>
                                    {pet.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="p-2 relative">
                        <h2 className="py-2">진료 일자</h2>
                        <DatePicker
                            selected={formData.startDate}
                            onChange={(date) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    startDate: date,
                                }))
                            }
                            dateFormat="yyyy-MM-dd"
                            className="h-[52px] w-full rounded-md border-2 p-4"
                        />
                    </div>
                    <div className="p-2">
                        <h2 className="py-2">병명</h2>
                        <input
                            type="text"
                            placeholder="병명"
                            className="h-[52px] w-full rounded-md border-2 cursor-auto px-4 focus:outline-none focus:ring-0 "
                            onChange={handleChange}
                            name="dig"
                        />
                    </div>
                    <div className="p-2 mb-4">
                        <div className="flex justify-between items-center">
                            <h2 className="py-2">설명</h2>
                            <div className="flex">
                                <div className="flex justify-center items-center w-[24px] h-[24px]">
                                    <img
                                        src="/assets/images/clipIcon.svg"
                                        className="block w-full"
                                    />
                                </div>
                                <label
                                    htmlFor="image-upload"
                                    className="flex items-center cursor-pointer"
                                >
                                    <p>파일 첨부</p>
                                </label>
                                <input
                                    id="image-upload"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <textarea
                            className="h-[184px] w-full rounded-md border-2 p-4 focus:outline-none focus:ring-0"
                            onChange={handleChange}
                            name="description"
                        />
                    </div>
                    <div className="flex flex-wrap gap-8 px-4  ">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="w-24 h-24 relative mr-2 mb-2"
                            >
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`uploaded ${index}`}
                                    className="w-full h-full rounded-lg object-cover block"
                                />
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 bg-gray-400 text-white rounded-full cursor-pointer w-5 h-5 flex items-center justify-center"
                                    onClick={() => removeImage(index)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <NavBar />
            </form>
        </>
    );
}

export default ChartAdd;
