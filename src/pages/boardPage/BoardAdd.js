import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import Header from "../../layouts/header/Header";
import ModalManager from "../../components/modal/ModalManager";
import ButtonBlack from "../../components/button/ButtonBlack";

function BoardAdd({ onAddPost }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [images, setImages] = useState([]);
    const [imageError, setImageError] = useState("");
    const navigate = useNavigate();
    const memberId = useSelector((state) => state.userSlice.id); // Redux 스토어에서 사용자 ID 가져오기

    // useEffect(() => {
    //     if (!memberId) {
    //         navigate("/users/login");
    //     }
    // }, [memberId, navigate]);

    const handleTitleChange = (event) => {
        const value = event.target.value;
        if (value.length > 10) {
            setTitleError("제목은 10자 이내로 입력해주세요.");
        } else {
            setTitleError("");
            setTitle(value);
        }
    };

    const handleContentChange = (event) => {
        const value = event.target.value;
        if (value.length > 1000) {
            setContentError("내용은 1000자 이내로 입력해주세요.");
        } else {
            setContentError("");
            setContent(value);
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

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (closeModal) => {
        if (title && content) {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("memberId", memberId); // Redux에서 가져온 memberId 추가
            images.forEach((image) => {
                formData.append("files", image);
            });

            try {
                const response = await axiosInstance.post("/boards", formData);
                console.log("Submitted Post:", response.data); // 콘솔에 데이터 출력
                onAddPost(response.data);
                closeModal(); // 모달 닫기
                navigate("/boards"); // 리스트 페이지로 이동
            } catch (error) {
                if (error.response) {
                    // 서버가 응답을 했지만 status code가 2xx 범위 밖일 때
                    console.error("Error response data:", error.response.data);
                    console.error(
                        "Error response status:",
                        error.response.status
                    );
                    console.error(
                        "Error response headers:",
                        error.response.headers
                    );
                } else if (error.request) {
                    // 요청이 만들어졌지만 응답을 받지 못함
                    console.error("Error request:", error.request);
                } else {
                    // 요청을 설정하는 중에 발생한 오류
                    console.error("Error message:", error.message);
                }
                console.error("Error config:", error.config);
            }
        }
    };

    return (
        <form className="flex flex-col gap-5 max-w-lg mx-auto p-5 rounded-lg bg-white">
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
                        />
                    </div>
                )}
            >
                {({ openModal }) => (
                    <div>
                        <Header
                            title="게시글 등록"
                            button="완료"
                            handleClick={(e) => {
                                e.preventDefault(); // 추가: 폼 제출 방지
                                openModal();
                            }}
                        />
                    </div>
                )}
            </ModalManager>
            <div className="border-b-0">
                <input
                    type="text"
                    placeholder="제목쓰기"
                    value={title}
                    onChange={handleTitleChange}
                    className="text-black bg-white p-2 w-full border-b border-gray-300 outline-none text-base box-border"
                />
                {titleError && (
                    <p className="text-red-500 text-sm mt-2">{titleError}</p>
                )}
            </div>
            <div className="border-b-0 relative">
                <textarea
                    placeholder="내용쓰기"
                    value={content}
                    onChange={handleContentChange}
                    className="no-scrollbar w-full h-48 p-2 border-b border-gray-300 outline-none resize-none text-base bg-white box-border"
                />
                {contentError && (
                    <p className="text-red-500 text-xs mt-2">{contentError}</p>
                )}
                <p className="absolute bottom-5 right-10 text-xs text-gray-500">
                    {content.length}/1000
                </p>
            </div>
            <div className="flex flex-wrap mt-8 pb-2">
                {images.map((image, index) => (
                    <div key={index} className="w-24 h-24 relative mr-4 mb-4">
                        <img
                            src={URL.createObjectURL(image)}
                            alt={`uploaded ${index}`}
                            className="w-full h-full rounded-lg object-cover"
                        />
                        <button
                            type="button"
                            className="absolute top-0 right-0 bg-gray-400 text-white border-none rounded-full cursor-pointer w-5 h-5 flex items-center justify-center"
                            onClick={() => removeImage(index)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            <p
                className="text-gray-500 text-xs"
                style={{
                    display: images.length === 0 ? "block" : "none",
                }}
            >
                이미지는 최대 5개까지 첨부할 수 있습니다.
            </p>
            {imageError && <p className="text-red-500 text-xs">{imageError}</p>}
            <div className="flex items-center mt-4 cursor-pointer border-b-0">
                <label
                    htmlFor="image-upload"
                    className="flex items-center cursor-pointer"
                >
                    <img
                        src="/assets/images/cameraIcon.svg"
                        alt="camera"
                        className="w-6 h-6 mr-2"
                    />
                    이미지 첨부
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
        </form>
    );
}

export default BoardAdd;
