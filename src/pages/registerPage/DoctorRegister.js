import React from "react";
import Header from "../../layouts/header/Header";
import ButtonBlack from "../../components/button/ButtonBlack";
import { useForm } from "react-hook-form";

function DoctorRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);
    return (
        <>
            <Header title="수의사 회원가입"></Header>
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
                            max: 15,
                            min: 8,
                            maxLength: 15,
                            pattern:
                                /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/i,
                        })}
                        className="w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                </div>
                <div className="mb-[16px]">
                    <p className="text-center text-gray-300">
                        수의사님들의 회원가입은 별도의 인증절차를 거치고
                        있습니다.
                    </p>
                    <p className="text-center  text-gray-300">
                        번거로우시더라도 안내에 따라 가입 요청 절차를
                        마쳐주시면,
                    </p>
                    <p className="text-center  text-gray-300">
                        빠른시일 내에 가입 승인 해드릴 수 있도록 노력하겠습니다.
                    </p>
                </div>
                <ButtonBlack
                    text1="회원가입 요청하기"
                    width="100%"
                    height="45px"
                    // 들어가야할 함수 -> 폼제출 + 모달오픈
                    // 모달 안내문구 -
                ></ButtonBlack>
            </form>
        </>
    );
}

export default DoctorRegister;
