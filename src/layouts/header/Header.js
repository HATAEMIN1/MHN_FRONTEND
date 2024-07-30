import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonBlack from "../../components/button/ButtonBlack";
import ModalManager from "../../components/modal/ModalManager";
import ButtonClear from "../../components/button/ButtonClear";

function Header({ ...props }) {
    const text1 = props.text1;
    const navigate = useNavigate();
    return (
        <>
            <div className="bg-white top-0 z-50 w-[100%]  top-0 left-0 right-0 absolute h-[65px] px-[16px] flex items-center justify-between border-b">
                <div className="h-[100%] flex items-center">
                    <img
                        src="/assets/images/backIcon.svg"
                        alt=""
                        className="w-[30px] h-[30px] cursor-pointer"
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                </div>
                <div className="text-[20px] title text-primary-300">
                    {props.title}
                </div>
                {props.button ? (
                    <ButtonBlack
                        text1={props.button}
                        handleClick={props.handleClick}
                    />
                ) : props.write ? (
                    props.write === "users/login" ? (
                        <ModalManager
                            modalContent={({ closeModal }) => (
                                <div>
                                    <p className="mb-[8px]">
                                        로그인 하시겠습니까?
                                    </p>

                                    <ButtonClear
                                        text1="네"
                                        text2="아니요"
                                        handleClick={(e) => {
                                            closeModal();
                                            navigate("/users/login");
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
                                    <img
                                        src="/assets/images/editIcon.svg"
                                        className="w-[24px] h-[24px]"
                                    />
                                </div>
                            )}
                        </ModalManager>
                    ) : (
                        <Link to={`/${props.write}`}>
                            <img
                                src="/assets/images/editIcon.svg"
                                className="w-[24px] h-[24px]"
                            />
                        </Link>
                    )
                ) : (
                    <div className="h-[100%] flex items-center">
                        <img
                            src="/assets/images/backIcon.svg"
                            alt=""
                            className="w-[30px] h-[30px] invisible"
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default Header;
