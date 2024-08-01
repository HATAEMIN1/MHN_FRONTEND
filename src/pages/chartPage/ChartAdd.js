import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/datepicker.scss";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import ModalManager from "../../components/modal/ModalManager";
import ButtonBlack from "../../components/button/ButtonBlack";
import { useSelector } from "react-redux";

function ChartAdd() {
    const memberId = useSelector((state) => {
        return state.userSlice.id;
    });
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [submitError, setSubmitError] = useState("");
    const [imageError, setImageError] = useState("");
    const [pet, setPet] = useState([{ name: "펫이 없습니다" }]);
    const [formData, setFormData] = useState({
        petId: "",
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
        if (!validateImages()) {
            return;
        }

        const formDataList = new FormData();
        formDataList.append("petId", formData.petId);
        console.log(formData.petId);
        formDataList.append("hospitalName", formData.hospital);
        formDataList.append("petName", formData.selectedPet);
        formDataList.append("visitDate", formatDate(formData.startDate));
        formDataList.append("diseaseName", formData.dig);
        formDataList.append("description", formData.description);
        images.forEach((file, index) => {
            formDataList.append(`files`, file);
        });
        try {
            const res = await axiosInstance.post("/charts", formDataList, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
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
    const validateImages = () => {
        if (images.length === 0) {
            setSubmitError("이미지를 최소 1개 이상 첨부해주세요.");
            return false;
        }
        setSubmitError("");
        return true;
    };
    const petInfo = async () => {
        const params = { memberId };
        const res = await axiosInstance.get("/pets", { params });
        console.log(res.data);
        setPet(res.data);
    };
    useEffect(() => {
        if (memberId) {
            petInfo();
        } else {
            navigate("/users/login");
        }
    }, [memberId]);
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
                                button="완료"
                                handleClick={(e) => {
                                    e.preventDefault(); // 추가: 폼 제출 방지
                                    if (validateImages()) {
                                        openModal();
                                    }
                                }}
                            />
                        </div>
                    )}
                </ModalManager>
                {/*<Header title="진료기록 등록" button="작성하기" />*/}
                <div className="px-2">
                    <p className="subtitle1 text-primary-300 mt-8 pb-4">
                        병원이름
                    </p>
                    <input
                        type="text"
                        placeholder="병원이름"
                        className="h-[52px] subtitle1 text-primary-300 border border-gray-400 rounded-md w-full px-4 focus:outline-none focus:ring-0 focus:border-blue-100 hover:border-blue-200 hover:shadow-md transition duration-300"
                        onChange={handleChange}
                        name="hospital"
                    />
                </div>

                <div className="py-8">
                    <div className="px-2 pb-6">
                        <p className="pb-4 subtitle1 text-primary-300">
                            펫 선택
                        </p>

                        <div className="relative">
                            <select
                                className="h-[52px] w-full rounded-md border border-gray-400 px-4 appearance-none focus:outline-none focus:ring-0 focus:border-blue-100 hover:border-blue-200 hover:shadow-md transition duration-300"
                                value={formData.selectedPet}
                                onChange={(e) => {
                                    const selectedPetName = e.target.value;
                                    const selectedPet = pet.find(
                                        (p) => p.name === selectedPetName
                                    );
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        selectedPet: selectedPetName,
                                        petId: selectedPet
                                            ? selectedPet.id
                                            : "",
                                    }));
                                }}
                            >
                                <option value="" disabled>
                                    펫을 선택하세요
                                </option>
                                {pet &&
                                    pet.map((pet) => (
                                        <option key={pet.name} value={pet.name}>
                                            {pet.name}
                                        </option>
                                    ))}
                            </select>
                            <img
                                src="/assets/images/moreIcon.svg"
                                alt="calendar"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                            />
                        </div>
                        {/* <select
                            className="h-[52px] w-full rounded-md border-2 px-4 appearance-none focus:outline-none focus:ring-0"
                            value={formData.selectedPet}
                            onChange={(e) => {
                                const selectedPetName = e.target.value;
                                const selectedPet = pet.find(
                                    (p) => p.name === selectedPetName
                                );
                                setFormData((prevData) => ({
                                    ...prevData,
                                    selectedPet: selectedPetName,
                                    petId: selectedPet ? selectedPet.id : "",
                                }));
                            }}
                        >
                            <option value="" disabled>
                                펫을 선택하세요
                            </option>
                            {pet &&
                                pet.map((pet) => (
                                    <option key={pet.name} value={pet.name}>
                                        {pet.name}
                                    </option>
                                ))}
                        </select> */}
                    </div>
                    <div className="px-2 pb-6 relative">
                        <p className="pb-4 subtitle1 text-primary-300">
                            진료 일자
                        </p>
                        {/* <DatePicker
                            selected={formData.startDate}
                            onChange={(date) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    startDate: date,
                                }))
                            }
                            dateFormat="yyyy-MM-dd"
                            className="h-[52px] w-full rounded-md border-2 p-4"
                        /> */}
                        <div className="relative">
                            <DatePicker
                                selected={formData.startDate}
                                onChange={(date) =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        startDate: date,
                                    }))
                                }
                                dateFormat="yyyy-MM-dd"
                                className="h-[52px] w-full rounded-md border border-gray-400 p-4 pr-10 focus:border-blue-100 hover:border-blue-200 hover:shadow-md transition duration-300" // 오른쪽 패딩 추가
                            />
                            <img
                                src="/assets/images/calendarIcon.svg"
                                alt="calendar"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                            />
                        </div>
                    </div>
                    <div className="px-2 pb-5">
                        <p className="pb-4 subtitle1 text-primary-300">병명</p>
                        <input
                            type="text"
                            placeholder="병명"
                            className="h-[52px] w-full rounded-md border border-gray-400 cursor-auto px-4 focus:outline-none focus:ring-0 focus:border-blue-100 hover:border-blue-200 hover:shadow-md transition duration-300"
                            onChange={handleChange}
                            name="dig"
                        />
                    </div>
                    <div className="px-2 mb-4">
                        <div className="flex justify-between items-center">
                            <p className="pb-4 subtitle1 text-primary-300">
                                설명
                            </p>
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
                                    <p className="body2 text-sub-100">
                                        파일 첨부
                                    </p>
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
                            className="h-[280px] w-full rounded-md border border-gray-400 p-4 focus:outline-none focus:ring-0 resize-none focus:border-blue-100 hover:border-blue-200 hover:shadow-md transition duration-300"
                            onChange={handleChange}
                            name="description"
                        />
                    </div>
                    {imageError && (
                        <p className="px-2 text-red-500 text-xs">
                            {imageError}
                        </p>
                    )}
                    {submitError && (
                        <p className="px-2 text-red-500 text-sm">
                            {submitError}
                        </p>
                    )}
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
