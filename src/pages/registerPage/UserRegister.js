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
            <Header></Header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center border ">
                    <input
                        type="text"
                        placeholder="이메일 입력"
                        {...register("Email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                        })}
                        className=" w-full stretch p-4 mb-8"
                    />
                    <ButtonBlack text1="전송" />
                </div>
                <input
                    type="text"
                    placeholder="인증번호"
                    {...register("Email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                    })}
                    className="border-b w-full p-4 mb-8"
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    {...register("Password", {
                        max: 15,
                        min: 8,
                        maxLength: 15,
                        pattern:
                            /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/i,
                    })}
                    className="border-b w-full p-4 mb-8"
                />
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
                    className="border-b w-full p-4 mb-8"
                />
                <input
                    type="text"
                    placeholder="닉네임 입력"
                    {...register("NickName", {
                        required: true,
                        max: 8,
                        min: 2,
                        maxLength: 8,
                    })}
                    className="border-b w-full p-4 mb-8"
                />

                <input type="submit" />
            </form>
        </>
    );
}

export default UserRegister;
