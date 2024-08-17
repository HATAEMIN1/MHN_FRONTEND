import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import NavBar from "../../layouts/nav/NavBar";
import Header from "../../layouts/header/Header";
import { updateUserName, updateUserTel } from "../../store/userSlice";

function AccountEdit() {
    const userId = useSelector((state) => state.userSlice.id);
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [name, setName] = useState("");
    const [profileImageUrl, setProfileImageUrl] = useState(
        "/assets/images/default_profile.png"
    );
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});
    const profileImageUrl2 = useSelector(
        (state) => state.userSlice.profileImageUrl
    );
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const response = await axiosInstance.get(`/members/edit`, {
                    params: { id: userId },
                });
                const { email, nickName, profileImageUrl, tel, name } =
                    response.data;

                setEmail(email);
                setNickName(nickName || "");
                const absoluteProfileImageUrl = profileImageUrl
                    ? `${process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL}${profileImageUrl}`
                    : `${process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL}` +
                      profileImageUrl2;
                setProfileImageUrl(absoluteProfileImageUrl);
                setTel(tel || "");
                setName(name || "");

                console.log(
                    "Fetched profileImageUrl: ",
                    absoluteProfileImageUrl
                ); // 절대 경로로 로그 출력
            } catch (error) {
                console.error("Error fetching member info:", error);
            }
        };

        fetchMemberInfo();
    }, [userId]);

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

    const validateTel = (tel) => {
        const telPattern = /^\d{11}$/;
        if (!telPattern.test(tel)) {
            return "휴대폰 번호는 숫자 11자리여야 합니다.";
        }
        return null;
    };

    const validateName = (name) => {
        if (name.length < 2 || name.length > 5) {
            return "이름은 2글자 이상 5글자 이하로 입력해주세요.";
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

    const handleTelChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 11) {
            setTel(value);
            if (errors.tel) {
                setErrors((prevErrors) => ({ ...prevErrors, tel: null }));
            }
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (errors.name) {
            setErrors((prevErrors) => ({ ...prevErrors, name: null }));
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
            const response = await axiosInstance.post(
                `/users/profile-image`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const absoluteProfileImageUrl = `http://localhost:8080${response.data}`;
            setProfileImageUrl(absoluteProfileImageUrl); // 업데이트된 이미지 URL 절대 경로로 설정
            alert("프로필 이미지가 성공적으로 업데이트되었습니다.");
        } catch (error) {
            console.error("Error updating profile image:", error);
            alert("프로필 이미지 업데이트 중 오류가 발생했습니다.");
        }
    };

    const updateName = async () => {
        const nameError = validateName(name);
        if (nameError) {
            setErrors({ name: nameError });
            return;
        }

        try {
            const params = new URLSearchParams();
            params.append("memberId", userId);
            params.append("name", name);
            const response = await axiosInstance.put(`/updateName`, params);
            dispatch(updateUserName(name));
            alert("이름이 성공적으로 업데이트되었습니다.");
        } catch (error) {
            console.error("Error updating name:", error);
            alert("이름 업데이트 중 오류가 발생했습니다.");
        }
    };

    const updateTel = async () => {
        const telError = validateTel(tel);
        if (telError) {
            setErrors({ tel: telError });
            return;
        }

        try {
            const params = new URLSearchParams();
            params.append("memberId", userId);
            params.append("tel", tel);
            const response = await axiosInstance.put(`/updateTel`, params);
            dispatch(updateUserTel(tel));
            alert("휴대폰 번호가 성공적으로 업데이트되었습니다.");
        } catch (error) {
            console.error("Error updating tel:", error);
            alert("휴대폰 번호 업데이트 중 오류가 발생했습니다.");
        }
    };

    return (
        <>
            <form>
                <Header title="회원정보 수정" />
                <div className="h-full flex flex-col items-center justify-evenly">
                    <div className="py-[30px]">
                        <div className="relative">
                            <img
                                src={profileImageUrl}
                                className="w-24 h-24 rounded-full"
                                alt="Profile"
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
                                    alt="Edit"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col w-full max-w-md border border-gray-200 rounded-lg px-5 py-4 gap-3 justify-center text-primary-300">
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
                                    alt="Edit"
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
                                value={email}
                                readOnly
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
                                    alt="Edit"
                                />
                            </div>
                            {errors.password && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.password}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col justify-between border-b border-gray-500 py-3 gap-2">
                            <div className="flex items-center justify-between gap-2">
                                <span className="subtitle1">이름</span>
                                <input
                                    placeholder="등록하기"
                                    className={`body2 flex-grow text-sub-100 text-right focus:outline-none ${errors.name ? "text-red-500" : ""}`}
                                    value={name}
                                    onChange={handleNameChange}
                                />
                                <img
                                    src="/assets/images/editIcon.svg"
                                    className="cursor-pointer w-4 h-4"
                                    onClick={updateName}
                                    alt="Edit"
                                />
                            </div>
                            {errors.name && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col justify-between border-b border-gray-500 py-3 gap-2">
                            <div className="flex items-center justify-between gap-2">
                                <span className="subtitle1">휴대폰</span>
                                <input
                                    placeholder="인증하기"
                                    className={`body2 flex-grow text-sub-100 text-right focus:outline-none ${errors.tel ? "text-red-500" : ""}`}
                                    value={tel}
                                    onChange={handleTelChange}
                                />
                                <img
                                    src="/assets/images/editIcon.svg"
                                    className="cursor-pointer w-4 h-4"
                                    onClick={updateTel}
                                    alt="Edit"
                                />
                            </div>
                            {errors.tel && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.tel}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <NavBar />
            </form>
        </>
    );
}

export default AccountEdit;
