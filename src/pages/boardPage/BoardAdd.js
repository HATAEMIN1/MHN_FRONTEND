// BoardAdd.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Searchbar from "../../components/Searchbar";
import ModalManager from "../../components/ModalManager";
import ButtonBlack from "../../components/ButtonBlack";

function BoardAdd({ onAddPost }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [images, setImages] = useState([]);
    const [imageError, setImageError] = useState("");
    const navigate = useNavigate();

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title && content) {
            const newPost = {
                title,
                content,
                images,
                createdAt: new Date().toISOString(),
            };
            onAddPost(newPost);
            console.log("Submitted Post:", newPost); // 콘솔에 데이터 출력
            navigate("/board"); // 리스트 페이지로 이동
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                maxWidth: "600px",
                margin: "0 auto",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "white",
            }}
        >
            <ModalManager
                modalContent={
                    <div>
                        <p>등록완료</p>
                        <ButtonBlack
                            handleClick={handleSubmit}
                            text1="확인"
                            style={{
                                marginTop: "20px",
                                fontSize: "16px",
                                cursor: "pointer",
                                color: "blue",
                            }}
                        />
                    </div>
                }
            >
                {({ openModal }) => (
                    <div>
                        <Header
                            title="게시글 등록"
                            button="완료"
                            handleClick={openModal}
                        />
                    </div>
                )}
            </ModalManager>
            <Searchbar />
            <div style={{ borderBottom: "none" }}>
                <input
                    type="text"
                    placeholder="제목쓰기"
                    value={title}
                    onChange={handleTitleChange}
                    style={{
                        color: "black",
                        backgroundColor: "white",
                        padding: "10px",
                        width: "100%",
                        border: "none",
                        borderBottom: "1px solid #e0e0e0",
                        outline: "none",
                        fontSize: "16px",
                        boxSizing: "border-box",
                    }}
                />
                {titleError && (
                    <p
                        style={{
                            color: "red",
                            fontSize: "0.875em",
                            marginTop: "5px",
                        }}
                    >
                        {titleError}
                    </p>
                )}
            </div>
            <div style={{ borderBottom: "none", position: "relative" }}>
                <textarea
                    placeholder="내용쓰기"
                    value={content}
                    onChange={handleContentChange}
                    style={{
                        width: "100%",
                        height: "500px",
                        padding: "10px",
                        border: "none",
                        borderBottom: "1px solid #e0e0e0",
                        outline: "none",
                        resize: "none",
                        fontSize: "16px",
                        backgroundColor: "white",
                        boxSizing: "border-box",
                    }}
                />

                {contentError && (
                    <p
                        style={{
                            color: "red",
                            fontSize: "0.875em",
                            marginTop: "5px",
                        }}
                    >
                        {contentError}
                    </p>
                )}
                <p
                    style={{
                        position: "absolute",
                        bottom: "5px",
                        right: "10px",
                        fontSize: "0.875em",
                        color: "gray",
                    }}
                >
                    {content.length}/1000
                </p>

            </div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "30px",
                    paddingBottom: "10px",
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            width: "100px",
                            height: "100px",
                            position: "relative",
                            marginRight: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <img
                            src={URL.createObjectURL(image)}
                            alt={`uploaded ${index}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "8px",
                                objectFit: "cover",
                            }}
                        />
                        <button
                            type="button"
                            style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                background: "#ccc",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                cursor: "pointer",
                                width: "20px",
                                height: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onClick={() => removeImage(index)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            <p
                style={{
                    color: "gray",
                    fontSize: "0.875em",
                    display: images.length === 0 ? "block" : "none",
                }}
            >
                이미지는 최대 5개까지 첨부할 수 있습니다.
            </p>
            {imageError && (
                <p
                    style={{
                        color: "red",
                        fontSize: "0.875em",
                        display: "block",
                    }}
                >
                    {imageError}
                </p>
            )}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                    cursor: "pointer",
                    borderBottom: "none",
                }}
            >
                <label
                    htmlFor="image-upload"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                >
                    <img
                        src="camera-icon-url"
                        alt="camera"
                        style={{
                            width: "24px",
                            height: "24px",
                            marginRight: "10px",
                        }}
                    />
                    이미지 첨부
                </label>
                <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                />
            </div>
        </form>
    );
}

export default BoardAdd;
