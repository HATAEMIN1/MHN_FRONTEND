import React from "react";
import Header from "../../layouts/header/Header";
import ButtonBlack from "../../components/button/ButtonBlack";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function DoctorLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);
    return (
        <>
            <Header></Header>
            <div className="w-[210px] mx-auto h-[152px] mb-16">
                <img src="/assets/logoWhite.png" className="w-full" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Email"
                    {...register("Email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                    })}
                    className="border-b w-full p-4 mb-8 focus:outline-none focus:ring-0"
                />
                <input
                    type="password"
                    placeholder="Password"
                    {...register("Password", {
                        max: 15,
                        min: 8,
                        maxLength: 15,
                        pattern:
                            /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/i,
                    })}
                    className="border-b w-full p-4 mb-8 focus:outline-none focus:ring-0"
                />

                {/*<input type="submit" />*/}
                <ButtonBlack
                    text1="수의사로 로그인"
                    width="100%"
                    height="45px"
                ></ButtonBlack>
                <div className="mb-8"></div>
                <div className="flex items-center justify-between max-w-lg mx-auto my-8 gap-4">
                    <hr className="w-full " />
                    <span className="px-3 ">or</span>
                    <hr className="w-full " />
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
                        <img
                            src="/assets/images/logo_kakao.svg"
                            className="w-full block"
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center p-4">
                    <Link to="/users/register" className="">
                        이메일로 가입하기
                    </Link>
                </div>
            </form>
        </>
    );
}

export default DoctorLogin;
