import React, { useState } from "react";

function ImageUploader({ onImageChange }) {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.substr(0, 5) === "image") {
            setImage(URL.createObjectURL(file));
            onImageChange(file); // 부모 컴포넌트에 파일 전달
        } else {
            setImage(null);
            onImageChange(null);
        }
    };

    return (
        <div className="flex flex-col items-center my-10">
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
            <label className="cursor-pointer bg-primary-300 text-primary-400 flex items-center justify-center rounded py-2 px-8">
                <span className="mini">
                    {image ? "사진 선택하기 " : "사진 선택하기"}
                </span>
                <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                />
            </label>
        </div>
    );
}

export default ImageUploader;
