import React from "react";
import { Link } from "react-router-dom";

function Header({ ...props }) {
    return (
        <>
            {/* <div className="bg-slate-400">{props.title}</div> */}
            <div className="bg-slate-400 top-0 z-50 w-[100%]  top-0 left-0 right-0 absolute h-[65px] px-[16px] flex items-center justify-between">
                <Link to="/user/main">
                    <div className="h-[100%] flex items-center">
                        <img
                            src="/assets/images/backIcon.svg"
                            alt=""
                            className="w-[30px] h-[30px] "
                        />
                    </div>
                </Link>
                <div>{props.title}</div>
                {props.button ? (
                    <button>{props.button}</button>
                ) : (
                    <div className="h-[100%] flex items-center">
                        <img
                            src="/assets/images/backIcon.svg"
                            alt=""
                            className="w-[30px] h-[30px] invisible"
                        />
                    </div>
                )}
                {/* 테스트 아이콘36 / 헤더폰트 20px / */}
            </div>
        </>
    );
}

export default Header;
