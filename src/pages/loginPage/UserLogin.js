import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../layouts/header/Header";
import ButtonBlack from "../../components/button/ButtonBlack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/thunkFunction";
import { getKakaoLoginLink } from "../kakaoPage/kakaoApi";

function UserLogin() {
    const navigate = useNavigate();
    const link = getKakaoLoginLink();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: "onSubmit" });
    const [loginError, setLoginError] = useState(""); // 로그인 에러 메시지 상태 추가
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const resultAction = await dispatch(loginUser(data));
            if (loginUser.fulfilled.match(resultAction)) {
                if (resultAction.payload.error) {
                    setLoginError("이메일이나 비밀번호가 일치하지 않습니다.");
                } else {
                    reset();
                    navigate("/");
                }
            } else if (loginUser.rejected.match(resultAction)) {
                setLoginError(
                    "로그인 중 오류가 발생했습니다. 다시 시도해 주세요."
                );
            }
        } catch (err) {
            setLoginError("로그인 중 예기치 못한 오류가 발생했습니다.");
        }
    };

    return (
        <>
            <div className="bg-white top-0 z-50 w-[100%]  top-0 left-0 right-0 absolute h-[65px] px-[16px] flex items-center justify-between">
                <div className="h-[100%] flex items-center">
                    <img
                        src="/assets/images/backIcon.svg"
                        alt=""
                        className="w-[30px] h-[30px] cursor-pointer"
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </div>
                {/*<div className="text-[20px] title text-primary-300">*/}
                {/*    구독내역*/}
                {/*</div>*/}
                {/*<div className="h-[100%] flex items-center">*/}
                {/*    <img*/}
                {/*        src="/assets/images/backIcon.svg"*/}
                {/*        alt=""*/}
                {/*        className="w-[30px] h-[30px] invisible"*/}
                {/*    />*/}
                {/*</div>*/}
                {/* 테스트 아이콘36 / 헤더폰트 20px / */}
            </div>
            <div className="w-[210px] mx-auto h-[152px] mb-16">
                <img src="/assets/logoWhite.png" className="w-full" />
            </div>
            {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
            <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit(onSubmit)();
                    }
                }}
            >
                <input
                    type="text"
                    placeholder="email"
                    {...register("Email", {
                        required: {
                            value: true,
                            message: "이메일을 입력 해주세요.",
                        },
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "이메일 형식이 맞지 않습니다.",
                        },
                    })}
                    className="border-b w-full p-4 mb-2 focus:outline-none focus:ring-0"
                />
                {errors.Email && (
                    <div className="text-red-500 text-xs w-full  p-4 ">
                        {errors.Email.message}
                    </div>
                )}
                <input
                    type="password"
                    placeholder="password"
                    {...register("Password", {
                        max: 15,
                        min: 8,
                        maxLength: 15,
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/i,
                            message: "비밀번호가 맞지 않습니다.",
                        },
                    })}
                    className="border-b w-full p-4 mb-2 focus:outline-none focus:ring-0"
                />
                {errors.Password && (
                    <div className="text-red-500 text-xs w-full p-4">
                        {errors.Password.message}
                    </div>
                )}
                {loginError && (
                    <p className="text-red-500 text-xs w-full p-4">
                        {loginError}
                    </p>
                )}
                <div className="p-2"></div>
                <ButtonBlack
                    text1="로그인"
                    width="100%"
                    height="45px"
                    type="submit"
                ></ButtonBlack>
                <div className="mb-8"></div>
                <div className="flex items-center justify-between max-w-lg mx-auto my-8 gap-4">
                    <hr className="w-full" />
                    <span className="px-3 text-gray-200 body2">or</span>
                    <hr className="w-full" />
                </div>
                <div className="flex justify-center items-center w-full gap-10">
                    <div>
                        <img
                            src="/assets/images/logo_google.svg"
                            className="w-full block"
                        />
                    </div>
                    <div>
                        <img
                            src="/assets/images/logo_naver.svg"
                            className="w-full block"
                        />
                    </div>
                    <div>
                        <Link to={link}>
                            <img
                                src="/assets/images/logo_kakao.svg"
                                className="w-full block"
                            />
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center items-center p-4 mini text-sub-100">
                    <Link to="/users/register" className="">
                        이메일로 가입하기
                    </Link>
                </div>
            </form>
        </>
    );
}

export default UserLogin;
