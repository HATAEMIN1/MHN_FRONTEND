import React, { useState, useRef } from "react";

function ImageUploader() {
    const [imageUrl, setImageUrl] = useState("");
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="relative my-14">
            <img
                src={imageUrl || ""}
                className="w-24 h-24 rounded-full border"
                alt="Uploaded image"
            />
            <button
                className="bg-primary-300 w-8 h-8 rounded-full flex items-center justify-center absolute bottom-[-5px] right-[-10px]"
                onClick={handleCameraClick}
            >
                <img
                    src="/assets/images/camera_W.svg"
                    className="w-5 h-5"
                    alt="Camera icon"
                />
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
            />
        </div>
    );
}

export default ImageUploader;
