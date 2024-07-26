import React, { useState } from "react";
import Header from "../../layouts/header/Header";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axios";
import ButtonBlack from "../../components/button/ButtonBlack";
import Identity from "./Identity";

function UserRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
        clearErrors,
    } = useForm();
    const [emailValidMessage, setEmailValidMessage] = useState("");
    const [nicknameValidMessage, setNicknameValidMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post("/users/register", {
                email: data.email,
                password: data.password,
                nickName: data.nickName,
            });
            if (response.status === 200) {
                alert("회원가입 성공!");
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response && error.response.status === 409) {
                const errorMessage = error.response.data;
                if (errorMessage.includes("이메일")) {
                    setError("email", {
                        type: "manual",
                        message: errorMessage,
                    });
                } else if (errorMessage.includes("닉네임")) {
                    setError("nickName", {
                        type: "manual",
                        message: errorMessage,
                    });
                }
            } else {
                alert("회원가입 중 오류가 발생했습니다.");
            }
        }
    };

    const checkEmailExists = async (e) => {
        e.preventDefault();
        const email = getValues("email");
        setEmailValidMessage(""); // Reset message
        clearErrors("email"); // Clear previous errors
        if (!email) {
            setError("email", {
                type: "manual",
                message: "이메일을 입력하세요.",
            });
            return;
        }
        try {
            const response = await axiosInstance.get("/users/check-email", {
                params: { email },
            });
            if (response.data) {
                setError("email", {
                    type: "manual",
                    message: "이미 존재하는 이메일입니다.",
                });
            } else {
                setEmailValidMessage("사용 가능한 이메일입니다.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("email", {
                type: "manual",
                message: "이메일 확인 중 오류가 발생했습니다.",
            });
        }
    };

    const checkNicknameExists = async (e) => {
        e.preventDefault();
        const nickName = getValues("nickName");
        setNicknameValidMessage(""); // Reset message
        clearErrors("nickName"); // Clear previous errors
        if (!nickName) {
            setError("nickName", {
                type: "manual",
                message: "닉네임을 입력하세요.",
            });
            return;
        }
        try {
            const response = await axiosInstance.get("/users/check-nickname", {
                params: { nickName },
            });
            if (response.data) {
                setError("nickName", {
                    type: "manual",
                    message: "이미 존재하는 닉네임입니다.",
                });
            } else {
                setNicknameValidMessage("사용 가능한 닉네임입니다.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("nickName", {
                type: "manual",
                message: "닉네임 확인 중 오류가 발생했습니다.",
            });
        }
    };

    return (
        <>
            <Header title="회원가입"></Header>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 px-4">
                <div className="flex justify-between items-center border-b py-4">
                    <input
                        type="text"
                        placeholder="이메일 입력"
                        {...register("email", {
                            required: "이메일은 필수 입력입니다.",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "유효한 이메일 주소를 입력하세요.",
                            },
                        })}
                        className="w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                    <ButtonBlack
                        text1="전송"
                        type="button"
                        handleClick={checkEmailExists}
                    />
                </div>
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                    </p>
                )}
                {emailValidMessage && (
                    <p className="text-green-500 text-sm mt-1">
                        {emailValidMessage}
                    </p>
                )}

                <div className="flex justify-between items-center border-b py-4">
                    <input
                        type="text"
                        placeholder="인증번호"
                        {...register("verificationCode", {
                            required: "인증번호는 필수 입력입니다.",
                        })}
                        className="w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                    <ButtonBlack
                        text1="확인"
                        type="button"
                        handleClick={() => {}}
                    />
                </div>
                {errors.verificationCode && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.verificationCode.message}
                    </p>
                )}

                <div className="flex justify-between items-center border-b py-4">
                    <input
                        type="password"
                        placeholder="비밀번호"
                        {...register("password", {
                            required: "비밀번호는 필수 입력입니다.",
                            minLength: {
                                value: 8,
                                message:
                                    "비밀번호는 최소 8자 이상이어야 합니다.",
                            },
                            maxLength: {
                                value: 15,
                                message:
                                    "비밀번호는 최대 15자 이하이어야 합니다.",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/i,
                                message:
                                    "비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.",
                            },
                        })}
                        className="w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}

                <div className="flex justify-between items-center border-b py-4">
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        {...register("passwordConfirm", {
                            required: "비밀번호 확인은 필수 입력입니다.",
                            validate: (value) =>
                                value === getValues("password") ||
                                "비밀번호가 일치하지 않습니다.",
                        })}
                        className="w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                </div>
                {errors.passwordConfirm && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.passwordConfirm.message}
                    </p>
                )}

                <div className="flex justify-between items-center border-b py-4">
                    <input
                        type="text"
                        placeholder="닉네임 입력"
                        {...register("nickName", {
                            required: "닉네임은 필수 입력입니다.",
                            minLength: {
                                value: 2,
                                message: "닉네임은 최소 2자 이상이어야 합니다.",
                            },
                            maxLength: {
                                value: 8,
                                message: "닉네임은 최대 8자 이하이어야 합니다.",
                            },
                        })}
                        className="w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                    <ButtonBlack
                        text1="중복확인"
                        type="button"
                        handleClick={checkNicknameExists}
                    />
                </div>
                {errors.nickName && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.nickName.message}
                    </p>
                )}
                {nicknameValidMessage && (
                    <p className="text-green-500 text-sm mt-1">
                        {nicknameValidMessage}
                    </p>
                )}
                <Identity />
                <ButtonBlack
                    text1="회원가입"
                    width="100%"
                    height="45px"
                    type="submit"
                />
            </form>
        </>
    );
}

export default UserRegister;
