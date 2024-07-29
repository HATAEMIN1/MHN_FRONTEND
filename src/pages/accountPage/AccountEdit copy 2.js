import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import NavBar from "../../layouts/nav/NavBar";
import Header from "../../layouts/header/Header";

function AccountEdit() {
    const userId = useSelector((state) => state.userSlice.id);
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});

    const validateNickName = (nickName) => {
        if (nickName.length < 2 || nickName.length > 8) {
            return "닉네임은 2글자 이상 8글자 이하로 입력해주세요.";
        }
        return null;
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[!@#$%^&*(),.?\":{}|<>]).{8,}$/;
        if (!passwordPattern.test(password)) {
            return "비밀번호는 특수문자가 포함된 8글자 이상이어야 합니다.";
        }
        return null;
    };

    const handleNickNameChange = (e) => {
        const value = e.target.value;
        setNickName(value);
        if (errors.nickName) {
            setErrors((prevErrors) => ({ ...prevErrors, nickName: null }));
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (errors.password) {
            setErrors((prevErrors) => ({ ...prevErrors, password: null }));
        }
    };

    const handleFileChange = async (e) => {
        if (e.target.files.length > 1) {
            alert("이미지는 한 개만 업로드할 수 있습니다.");
            e.target.value = null; // 선택한 파일을 초기화
        } else {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            await updateProfileImage(selectedFile); // 파일 선택 후 바로 업로드
        }
    };

    const checkNicknameExists = async (nickName) => {
        try {
            const response = await axiosInstance.get(`/users/check-nickname`, {
                params: { nickName },
            });
            return response.data;
        } catch (error) {
            console.error("Error checking nickname:", error);
            return false;
        }
    };

    const updateNickName = async () => {
        const nickNameError = validateNickName(nickName);
        if (nickNameError) {
            setErrors({ nickName: nickNameError });
            return;
        }

        const exists = await checkNicknameExists(nickName);
        if (exists) {
            setErrors({ nickName: "이미 존재하는 닉네임입니다." });
            return;
        }

        try {
            console.log("닉네임 업데이트 요청 데이터:", {
                id: userId,
                nickName,
            });
            const params = new URLSearchParams();
            params.append("id", userId);
            params.append("nickName", nickName);
            await axiosInstance.put(`/users/nickname`, params);
            alert("닉네임이 성공적으로 업데이트되었습니다.");
        } catch (error) {
            console.error("Error updating nickname:", error);
            alert("닉네임 업데이트 중 오류가 발생했습니다.");
        }
    };

    const updatePassword = async () => {
        const passwordError = validatePassword(password);
        if (passwordError) {
            setErrors({ password: passwordError });
            return;
        }
        try {
            console.log("비밀번호 업데이트 요청 데이터:", {
                id: userId,
                password,
            });
            const params = new URLSearchParams();
            params.append("id", userId);
            params.append("password", password);
            await axiosInstance.put(`/users/password`, params);
            alert("비밀번호가 성공적으로 업데이트되었습니다.");
        } catch (error) {
            console.error("Error updating password:", error);
            alert("비밀번호 업데이트 중 오류가 발생했습니다.");
        }
    };

    const updateProfileImage = async (file) => {
        if (!file) {
            alert("파일이 선택되지 않았습니다.");
            return;
        }
        const formData = new FormData();
        formData.append("id", userId);
        formData.append("file", file);

        try {
            console.log("프로필 이미지 업데이트 요청 데이터:", {
                id: userId,
                file,
            });
            await axiosInstance.post(`/users/profile-image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("프로필 이미지가 성공적으로 업데이트되었습니다.");
        } catch (error) {
            console.error("Error updating profile image:", error);
            alert("프로필 이미지 업데이트 중 오류가 발생했습니다.");
        }
    };

    return (
        <>
            <form>
                <Header title="회원정보 수정" />
                <div className="h-full flex flex-col items-center justify-evenly">
                    {/* img s */}
                    <div className="py-[30px]">
                        <div className="relative">
                            <img
                                src="/assets/images/dog44.png"
                                className="w-24 h-24 rounded-full"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                id="profile-image"
                            />
                            <label
                                htmlFor="profile-image"
                                className="bg-primary-300 w-8 h-8 rounded-full flex items-center justify-center absolute bottom-[-5px] right-[-10px] cursor-pointer"
                            >
                                <img
                                    src="/assets/images/camera_W.svg"
                                    className="w-5 h-5"
                                />
                            </label>
                        </div>
                    </div>
                    {/* input s */}
                    <div className="flex flex-col w-full max-w-md border border-gray-200 rounded-lg px-5 py-4 gap-3 justify-center text-primary-300">
                        <div className="flex justify-between border-b border-gray-500 py-3 gap-2 items-center">
                            <span className="subtitle1">회원번호</span>
                            <input
                                placeholder="회원번호**"
                                className="body2 flex-grow text-sub-100 text-right focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col justify-between border-b border-gray-500 py-3 gap-2">
                            <div className="flex items-center justify-between gap-2">
                                <span className="subtitle1">닉네임</span>
                                <input
                                    placeholder="닉네임**"
                                    className={`body2 flex-grow text-sub-100 text-right focus:outline-none ${errors.nickName ? "text-red-500" : ""}`}
                                    value={nickName}
                                    onChange={handleNickNameChange}
                                />
                                <img
                                    src="/assets/images/editIcon.svg"
                                    className="cursor-pointer w-4 h-4"
                                    onClick={updateNickName}
                                />
                            </div>
                            {errors.nickName && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.nickName}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between border-b border-gray-500 py-3 gap-2 items-center">
                            <span className="subtitle1">이메일</span>
                            <input
                                placeholder="이메일**"
                                className="body2 flex-grow text-sub-100 text-right focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col justify-between border-b border-gray-500 py-3 gap-2">
                            <div className="flex items-center justify-between gap-2">
                                <span className="subtitle1">비밀번호 변경</span>
                                <input
                                    type="password"
                                    placeholder="비밀번호**"
                                    className={`body2 flex-grow text-sub-100 text-right focus:outline-none ${errors.password ? "text-red-500" : ""}`}
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <img
                                    src="/assets/images/editIcon.svg"
                                    className="cursor-pointer w-4 h-4"
                                    onClick={updatePassword}
                                />
                            </div>
                            {errors.password && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.password}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between border-b border-gray-500 py-3 gap-2 items-center">
                            <span className="subtitle1">이름</span>
                            <div className="flex items-center gap-2">
                                <input
                                    placeholder="등록하기"
                                    className="body2 flex-grow text-sub-100 text-right focus:outline-none"
                                />
                                <img
                                    src="/assets/images/editIcon.svg"
                                    className="cursor-pointer w-4 h-4"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between border-b border-gray-500 py-3 gap-2 items-center">
                            <span className="subtitle1">휴대폰</span>
                            <div className="flex items-center gap-2">
                                <input
                                    placeholder="인증하기"
                                    className="body2 flex-grow text-sub-100 text-right focus:outline-none"
                                />
                                <img
                                    src="/assets/images/editIcon.svg"
                                    className="cursor-pointer w-4 h-4"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <NavBar />
            </form>
        </>
    );
}

export default AccountEdit;
