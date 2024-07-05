import React, { useState } from "react";
import Header from "../../layouts/header/Header";
import Searchbar from "../../components/Searchbar";
import ModalManager from "../../components/ModalManager";
import ButtonBlack from "../../components/ButtonBlack";

function BoardAdd() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [images, setImages] = useState([]);
    const [imageError, setImageError] = useState("");

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

    const containerStyle = {
        position: "relative",
        marginBottom: "20px",
        borderBottom: "1px solid #e0e0e0",
        paddingBottom: "10px",
    };

    const charCounterStyle = {
        position: "absolute",
        bottom: "5px",
        right: "10px",
        fontSize: "0.875em",
        color: "gray",
    };

    const errorStyle = {
        color: "red",
        fontSize: "0.875em",
        marginTop: "5px",
    };

    const imageContainerStyle = {
        display: "flex",
        flexWrap: "wrap",
        marginTop: "30px",
        paddingBottom: "10px",
    };

    const imageStyle = {
        width: "100px",
        height: "100px",
        objectFit: "cover",
        marginRight: "10px",
        marginBottom: "10px",
        position: "relative",
    };

    const removeButtonStyle = {
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
    };

    const cameraButtonStyle = {
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
        cursor: "pointer",
    };

    const messageStyle = {
        color: "gray",
        fontSize: "0.875em",
        display: images.length === 0 ? "block" : "none",
    };

    const inputStyle = {
        color: "black",
        backgroundColor: "white",
        padding: "10px",
        width: "100%",
        border: "none",
        borderBottom: "1px solid #e0e0e0", // 연한 회색 하단 경계선
        outline: "none",
        fontSize: "16px",
        boxSizing: "border-box",
    };

    const textareaStyle = {
        width: "100%",
        height: "500px",
        padding: "10px",
        border: "none",
        borderBottom: "1px solid #e0e0e0", // 연한 회색 하단 경계선
        outline: "none",
        resize: "none",
        fontSize: "16px",
        backgroundColor: "white",
        boxSizing: "border-box",
    };

    return (
        <div
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
            <ModalManager modalContent={<div>등록완료</div>}>
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
            <div style={{ ...containerStyle, borderBottom: "none" }}>
                <input
                    type="text"
                    placeholder="제목쓰기"
                    value={title}
                    onChange={handleTitleChange}
                    style={inputStyle}
                />
                {titleError && <p style={errorStyle}>{titleError}</p>}
            </div>
            <div style={{ ...containerStyle, borderBottom: "none" }}>
                <textarea
                    placeholder="내용쓰기"
                    value={content}
                    onChange={handleContentChange}
                    style={textareaStyle}
                />
                {contentError && <p style={errorStyle}>{contentError}</p>}
                <p style={charCounterStyle}>{content.length}/1000}</p>
            </div>

            <div style={imageContainerStyle}>
                {images.map((image, index) => (
                    <div key={index} style={imageStyle}>
                        <img
                            src={URL.createObjectURL(image)}
                            alt={`uploaded ${index}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "8px",
                            }}
                        />
                        <button
                            style={removeButtonStyle}
                            onClick={() => removeImage(index)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            <p style={messageStyle}>
                이미지는 최대 5개까지 첨부할 수 있습니다.
            </p>
            {imageError && (
                <p style={{ ...messageStyle, color: "red", display: "block" }}>
                    {imageError}
                </p>
            )}
            <div style={{ ...cameraButtonStyle, borderBottom: "none" }}>
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
        </div>
    );
}

export default BoardAdd;
