import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import axiosInstance from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import DatePicker from "react-datepicker";
import ButtonBlack from "../../components/button/ButtonBlack";
import ModalManager from "../../components/modal/ModalManager";
import "../../assets/css/datepicker.scss";

function ChartView() {
    const { chartId } = useParams();
    const navigate = useNavigate();
    const [chartData, setChartData] = useState({});
    const [editData, setEditData] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [images, setImages] = useState([]);
    const formatDate = (date) => {
        if (!date) return "";
        return date.toISOString().split("T")[0];
    };
    const chartDataInfo = async () => {
        try {
            const params = { id: chartId };
            const res = await axiosInstance.get("/charts/view", { params });
            const data = res.data;
            data.treatmentDate = data.treatmentDate
                ? new Date(data.treatmentDate)
                : null;
            setChartData(data);
            setEditData(data);
        } catch (error) {
            console.error("Error fetching chart data:", error);
            setSubmitError("차트 데이터를 불러오는데 실패했습니다.");
        }
    };
    const handleEdit = () => {
        setIsEditing(true);
        setEditData({ ...chartData });
    };

    const handleSave = async (closeModal) => {
        try {
            if (!validateImages()) return;

            const formData = new FormData();
            formData.append("id", chartId);
            formData.append(
                "hospitalName",
                editData.hospitalName || editData.hospital
            );
            formData.append(
                "petName",
                editData.petName || editData.selectedPet
            );
            formData.append(
                "visitDate",
                formatDate(editData.treatmentDate || editData.startDate)
            );
            formData.append("diseaseName", editData.diagnosis || editData.dig);
            formData.append("description", editData.description);
            images.forEach((image) => {
                formData.append("files", image);
            });
            console.log(formData);
            await axiosInstance.put(`/charts/view`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setChartData(editData);
            setIsEditing(false);
            closeModal();
        } catch (error) {
            console.error("Error saving data:", error);
            setSubmitError("데이터 저장 중 오류가 발생했습니다.");
        }
    };

    const handleCancel = () => {
        setEditData(chartData);
        setIsEditing(false);
        setImages([]);
        setSubmitError("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        setEditData((prev) => ({ ...prev, treatmentDate: date }));
    };

    const handleImageChange = (e) => {
        const newImages = Array.from(e.target.files);
        setImages((prev) => [...prev, ...newImages]);
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const validateImages = () => {
        if (images.length === 0) {
            setSubmitError("이미지를 최소 1개 이상 첨부해주세요.");
            return false;
        }
        setSubmitError("");
        return true;
    };

    const handleDelete = async () => {
        const params = { id: chartId };
        await axiosInstance.delete("/charts/view", { params });
        navigate("/charts");
    };

    useEffect(() => {
        chartDataInfo();
    }, [isEditing]);

    return (
        <>
            <ModalManager
                modalContent={({ closeModal }) => (
                    <div>
                        <p>등록완료</p>
                        <ButtonBlack
                            handleClick={(e) => {
                                e.preventDefault();
                                handleSave(closeModal);
                            }}
                            text1="확인"
                        />
                    </div>
                )}
            >
                {({ openModal }) => (
                    <div>
                        <Header
                            title="진료기록"
                            button={isEditing ? "저장" : "수정"}
                            handleClick={(e) => {
                                e.preventDefault();
                                if (isEditing) {
                                    if (validateImages()) {
                                        openModal();
                                    }
                                } else {
                                    handleEdit();
                                }
                            }}
                        ></Header>
                    </div>
                )}
            </ModalManager>
            <div className="flex justify-between">
                {isEditing && (
                    <div className="p-4 flex justify-center ">
                        <button
                            onClick={handleCancel}
                            className="bg-primary-300 rounded-[8px] px-[16px] text-white text-center whitespace-nowrap subtitle1 w-full"
                        >
                            취소
                        </button>
                    </div>
                )}
                {isEditing && (
                    <div className="p-4 flex justify-center">
                        <button
                            onClick={handleDelete}
                            className="bg-primary-300 rounded-[8px] px-[16px] text-white text-center whitespace-nowrap subtitle1 w-full"
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>
            <div className="border-b p-2">
                {isEditing ? (
                    <input
                        type="text"
                        placeholder="병원이름"
                        className="h-[52px] subtitle1 text-primary-300 border border-gray-400 rounded-md w-full px-4 focus:outline-none focus:ring-0 focus:border-blue-100 hover:border-blue-200 hover:shadow-md transition duration-300"
                        onChange={handleChange}
                        name="hospitalName"
                        value={editData.hospitalName || ""}
                    />
                ) : (
                    <h2>{chartData.hospitalName}</h2>
                )}
            </div>

            <div className="py-8">
                <div className="p-2">
                    <h2 className="py-2">펫</h2>
                    <div className="border-2 rounded-md h-[52px] flex items-center px-4">
                        <p>{chartData.petName}</p>
                    </div>
                </div>
                <div className="p-2">
                    <h2 className="py-2">진료일자</h2>
                    {isEditing ? (
                        <div className="relative">
                            <DatePicker
                                selected={editData.treatmentDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                className="h-[52px] w-full rounded-md border border-gray-400 p-4 pr-10 focus:border-blue-100 hover:border-blue-200 hover:shadow-md transition duration-300"
                            />
                            <img
                                src="/assets/images/calendarIcon.svg"
                                alt="calendar"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                            />
                        </div>
                    ) : (
                        <div className="border-2 rounded-md h-[52px] flex items-center px-4 relative">
                            <p>
                                {chartData.treatmentDate &&
                                    chartData.treatmentDate
                                        .toLocaleDateString()
                                        .replace(/\.$/, "")}
                            </p>
                            <div className="absolute right-5">
                                <img
                                    src="/assets/images/calendarIcon.svg"
                                    className="w-full block"
                                    alt="calendar"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-2">
                    <h2 className="py-2">병명</h2>
                    {isEditing ? (
                        <input
                            type="text"
                            placeholder="병명"
                            className="h-[52px] w-full rounded-md border border-gray-400 cursor-auto px-4 focus:outline-none focus:ring-0 focus:border-blue-100 hover:border-blue-200 hover:shadow-md transition duration-300"
                            onChange={handleChange}
                            name="diagnosis"
                            value={editData.diagnosis || ""}
                        />
                    ) : (
                        <div className="border-2 rounded-md h-[52px] flex items-center px-4">
                            <p>{chartData.diagnosis}</p>
                        </div>
                    )}
                </div>
                <div className="p-2">
                    <h2 className="py-2">설명</h2>
                    {isEditing ? (
                        <>
                            <textarea
                                placeholder="설명"
                                className="w-full h-24 rounded-md border border-gray-400 cursor-auto p-4 focus:outline-none focus:ring-0 focus:border-blue-100 hover:border-blue-200 hover:shadow-md transition duration-300"
                                onChange={handleChange}
                                name="description"
                                value={editData.description || ""}
                            />
                            <div className="flex mt-2">
                                <div className="flex justify-center items-center w-[24px] h-[24px]">
                                    <img
                                        src="/assets/images/clipIcon.svg"
                                        className="block w-full"
                                        alt="clip"
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
                        </>
                    ) : (
                        <div className="border-2 rounded-md flex items-center px-4 mb-4">
                            <p>{chartData.description}</p>
                        </div>
                    )}
                </div>
                {submitError && (
                    <p className="px-2 text-red-500 text-sm">{submitError}</p>
                )}
                {isEditing ? (
                    <div className="flex flex-wrap gap-8 px-4">
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
                ) : (
                    <div className="flex flex-wrap justify-center">
                        <Swiper
                            spaceBetween={8}
                            slidesPerView={"auto"}
                            className="mySwiper"
                        >
                            {chartData.uploadFileNames &&
                                chartData.uploadFileNames.map((item, idx) => {
                                    return (
                                        <SwiperSlide key={item.id}>
                                            <div
                                                key={idx}
                                                className="p-2 w-[576px] h-[250px]"
                                            >
                                                <img
                                                    src={`${process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL}/upload/${item}`}
                                                    className="w-full rounded-md h-full object-contain"
                                                    alt={`uploaded ${idx}`}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                        </Swiper>
                    </div>
                )}
            </div>

            <NavBar />
        </>
    );
}

export default ChartView;
