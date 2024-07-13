import React from "react";
import Header from "../../layouts/header/Header";
import { useForm } from "react-hook-form";
import ButtonBlack from "../../components/button/ButtonBlack";

function UserRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

    return (
        <>

            <Header title="회원가입"></Header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center border-b mt-16 mb-8">
                    <input
                        type="text"
                        placeholder="이메일 입력"
                        {...register("Email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                        })}
                        className="w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                    <ButtonBlack text1="전송"></ButtonBlack>
                </div>
                <div className="flex justify-between items-center border-b mb-8">
                    <input
                        type="text"
                        placeholder="인증번호"
                        {...register("Email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                        })}
                        className=" w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                    <ButtonBlack text1="확인"></ButtonBlack>
                </div>
                <div className="flex justify-between items-center border-b mb-8">
                    <input
                        type="password"
                        placeholder="비밀번호"
                        {...register("Password", {
                            required: true,
                            max: 15,
                            min: 8,
                            maxLength: 15,
                            pattern:
                                /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/i,
                        })}
                        className="w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                </div>
                <div className="flex justify-between items-center border-b mb-8">
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        {...register("Password", {
                            required: true,
                            max: 15,
                            min: 8,
                            maxLength: 15,
                            pattern:
                                /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/i,
                        })}
                        className="w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                </div>
                <div className="flex justify-between items-center border-b mb-16">
                    <input
                        type="text"
                        placeholder="닉네임 입력"
                        {...register("NickName", {
                            required: true,
                            max: 8,
                            min: 2,
                            maxLength: 8,
                        })}
                        className="w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                    <ButtonBlack text1="중복확인"></ButtonBlack>
                </div>

                <ButtonBlack
                    text1="회원가입"
                    width="100%"
                    height="45px"
                ></ButtonBlack>
            </form>
        </>
    );
}

export default UserRegister;
