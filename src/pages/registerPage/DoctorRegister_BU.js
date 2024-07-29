import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import ButtonBlack from "../../components/button/ButtonBlack";
import { useForm } from "react-hook-form";
import SearchModalManager from "../../components/modal/SearchModalManager";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import ModalManager from "../../components/modal/ModalManager";
import ButtonClear from "../../components/button/ButtonClear";

function DoctorRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
        clearErrors,
        trigger,
    } = useForm();
    const navigate = useNavigate();
    const [emailValidMessage, setEmailValidMessage] = useState("");
    const [nicknameValidMessage, setNicknameValidMessage] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
    const [selectedHospitalName, setSelectedHospitalName] = useState("");
    const [getHospitalId, setGetHospitalId] = useState("");

    const handleSearch = async () => {
        // if (getHospitalId) {
        try {
            const response = await axiosInstance.get(
                `/hospitals/view?id=${getHospitalId}`
            );
            console.log("33번줄", response.data);
            setSelectedHospitalName(response.data.name);
        } catch (error) {
            console.error("병원 정보를 가져오는 중 오류 발생:", error);
        }
        // }
    };

    useEffect(() => {
        handleSearch();
    }, [getHospitalId]);

    const onSubmit = async (data) => {
        if (!isEmailVerified) {
            setError("email", {
                type: "manual",
                message: "이메일 인증을 완료하세요.",
            });
            return;
        }
        try {
            const response = await axiosInstance.post("/doctors/register", {
                email: data.email,
                password: data.password,
                hospitalId: getHospitalId,
            });
            if (response.status === 200) {
                navigate("/doctors/register/pending");
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

    const sendVerificationEmail = async (e) => {
        e.preventDefault();
        const email = getValues("email");
        setEmailValidMessage("");
        clearErrors("email");
        if (!email) {
            setError("email", {
                type: "manual",
                message: "이메일을 입력하세요.",
            });
            return;
        }
        try {
            const response = await axiosInstance.post(
                "/doctors/sendemail",
                null,
                {
                    params: { email },
                }
            );
            if (response.status === 200) {
                setEmailValidMessage("인증 코드가 전송되었습니다.");
                setIsVerificationCodeSent(true);
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response && error.response.status === 409) {
                setError("email", {
                    type: "manual",
                    message: error.response.data,
                });
            } else {
                setError("email", {
                    type: "manual",
                    message: "인증 코드 전송 중 오류가 발생했습니다.",
                });
            }
        }
    };

    const verifyEmailCode = async (e) => {
        e.preventDefault();
        const email = getValues("email");
        const code = getValues("verificationCode");
        if (!email || !code) {
            setError("verificationCode", {
                type: "manual",
                message: "이메일과 인증번호를 입력하세요.",
            });
            return;
        }
        try {
            const response = await axiosInstance.post("/doctors/verify", null, {
                params: { email, code },
            });
            if (response.status === 200) {
                setIsEmailVerified(true);
                setEmailValidMessage("이메일 인증이 완료되었습니다.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("verificationCode", {
                type: "manual",
                message: "잘못된 인증 코드입니다.",
            });
        }
    };

    return (
        <>
            <Header title="수의사 회원가입"></Header>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 px-4">
                <div className="flex justify-between items-center border-b py-2">
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
                        disabled={isEmailVerified}
                    />
                    <ButtonBlack
                        text1={isVerificationCodeSent ? "재전송" : "전송"}
                        type="button"
                        handleClick={sendVerificationEmail}
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

                {isVerificationCodeSent && !isEmailVerified && (
                    <div className="flex justify-between items-center border-b py-2">
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
                            handleClick={verifyEmailCode}
                        />
                    </div>
                )}
                {errors.verificationCode && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.verificationCode.message}
                    </p>
                )}

                <div className="flex justify-between items-center border-b py-2">
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

                <div className="flex justify-between items-center border-b py-2">
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
                {/* 찾기 버튼을 누르면 카카오  */}
                {/* 지도에서 병원 이름으로 검색합니다. */}
                {/* 이름과 일치되는 병원리스트가 먼저 출력되고, 클릭하면 해당 병원의 정보중 - 이름이 올라옵니다. */}
                {/* 해당 병원의 아이디값을 디비로 전송합니다. */}

                <SearchModalManager
                    type="button"
                    modalOpen={
                        <div className="flex justify-between items-center border-b mb-8">
                            <input
                                type="text"
                                placeholder={
                                    selectedHospitalName
                                        ? `${selectedHospitalName}`
                                        : "재직중인 동물병원 이름 - 닉네임 대신 사용됩니다."
                                }
                                className=" w-full p-4 border-none focus:outline-none focus:ring-0 in"
                                // disabled={true}
                                readOnly
                            />
                            <div style={{ cursor: "pointer" }}>
                                <ButtonBlack text1="찾기"></ButtonBlack>
                            </div>
                        </div>
                    }
                    setGetHospitalId={setGetHospitalId}
                />

                <div className="mb-[20px]">
                    <p className="text-center text-gray-300">
                        수의사님들의 회원가입은{" "}
                        <span className="text-red-500 subtitle1">
                            별도의 인증절차
                        </span>
                        를 거치고 있습니다.
                    </p>
                    <p className="text-center  text-gray-300">
                        번거로우시더라도 안내에 따라 가입 요청 절차를
                        마쳐주시면,
                    </p>
                    <p className="text-center  text-gray-300">
                        빠른시일 내에 가입 승인 해드릴 수 있도록
                        노력하겠습니다🥰
                    </p>
                </div>
                {/* {getHospitalId} */}
                <ModalManager
                    modalContent={({ closeModal }) => (
                        <div>
                            <p className="mb-[8px]">회원가입요청을 보낼까요?</p>

                            <ButtonClear
                                text1="네"
                                text2="아니요"
                                handleClick={(e) => {
                                    // handleDeleteComment(
                                    //     item.id
                                    // );
                                    onSubmit();
                                    closeModal();
                                }}
                                handleClick2={(e) => {
                                    closeModal();
                                }}
                            />
                        </div>
                    )}
                >
                    {({ openModal }) => (
                        <div onClick={openModal}>
                            <ButtonBlack
                                type="submit"
                                text1="회원가입 요청하기"
                                width="100%"
                                height="45px"
                                // 들어가야할 함수 -> 폼제출 + 모달오픈
                                // 모달 안내문구 -
                            ></ButtonBlack>
                        </div>
                    )}
                </ModalManager>
            </form>
        </>
    );
}
export default DoctorRegister;
