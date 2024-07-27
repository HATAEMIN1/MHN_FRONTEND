import React from "react";
import Header from "../../layouts/header/Header";
import ButtonBlack from "../../components/button/ButtonBlack";
import { useForm } from "react-hook-form";
import SearchModalManager from "../../components/modal/SearchModalManager";

function DoctorRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm(
        { mode: "onChange" } // 실시간 유효성 검사 활성화
    );
    const password = watch("password"); // 비밀번호 필드를 감시합니다.
    const onSubmit = (data) => {
        console.log(data);
        // 여기에 데이터를 DB에 제출하는 로직을 추가할 수 있습니다.
    };

    console.log(errors);

    const handleModalOpen = () => {
        console.log("모달 버튼 클릭됨");
    };

    const handleButtonClick = (e) => {
        e.preventDefault(); // 기본 동작 방지
        // 여기에 각 버튼에 대한 로직을 추가할 수 있습니다.
        console.log("버튼 클릭됨");
    };

    return (
        <>
            <Header title="수의사 회원가입"></Header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center border-b mt-16 mb-8">
                    <input
                        type="text"
                        placeholder="이메일 입력"
                        // {...register("Email", {
                        //     required: true,
                        //     pattern: /^\S+@\S+$/i,
                        // })}
                        className="w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                    <ButtonBlack
                        text1="전송"
                        onClick={handleButtonClick}
                    ></ButtonBlack>
                </div>
                <div className="flex justify-between items-center border-b mb-8">
                    <input
                        type="text"
                        placeholder="인증번호"
                        // {...register("Email", {
                        //     required: true,
                        //     pattern: /^\S+@\S+$/i,
                        // })}
                        className=" w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                    <ButtonBlack
                        text1="확인"
                        onClick={handleButtonClick}
                    ></ButtonBlack>
                </div>
                <div className="flex justify-between items-center border-b mb-8">
                    <input
                        type="password"
                        placeholder="비밀번호"
                        {...register("password", {
                            required: "비밀번호를 입력해주세요.",
                            minLength: {
                                value: 8,
                                message:
                                    "비밀번호는 최소 8자 이상이어야 합니다.",
                            },
                            maxLength: {
                                value: 15,
                                message: "비밀번호는 최대 15자까지 가능합니다.",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/i,
                                message:
                                    "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
                            },
                        })}
                        className="w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                </div>
                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}

                <div className="flex justify-between items-center border-b mb-8">
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        {...register("passwordConfirm", {
                            required: "비밀번호 확인을 입력해주세요.",
                            validate: (value) =>
                                value === password ||
                                "비밀번호가 일치하지 않습니다.",
                        })}
                        className="w-full p-4 border-none focus:outline-none focus:ring-0"
                    />
                </div>
                {errors.passwordConfirm && (
                    <p className="text-red-500">
                        {errors.passwordConfirm.message}
                    </p>
                )}
                <div className="flex justify-between items-center border-b mb-8">
                    <input
                        type="text"
                        placeholder="재직중인 동물병원 이름 - 닉네임 대신 사용됩니다."
                        className=" w-full p-4 border-none focus:outline-none focus:ring-0 in"
                        disabled={true}
                    />
                    {/* 찾기 버튼을 누르면 카카오  */}
                    {/* 지도에서 병원 이름으로 검색합니다. */}
                    {/* 이름과 일치되는 병원리스트가 먼저 출력되고, 클릭하면 해당 병원의 정보중 - 이름이 올라옵니다. */}
                    {/* 해당 병원의 아이디값을 디비로 전송합니다. */}

                    <SearchModalManager
                        type="button"
                        modalOpen={
                            <div
                                onClick={handleModalOpen}
                                style={{ cursor: "pointer" }}
                            >
                                <ButtonBlack
                                    text1="찾기"
                                    onClick={handleButtonClick}
                                ></ButtonBlack>
                            </div>
                        }
                        onOpenModal={handleModalOpen}
                    />
                </div>

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

                <ButtonBlack
                    type="submit"
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
