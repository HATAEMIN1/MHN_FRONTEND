import React from "react";
import { Link } from "react-router-dom";

function Intro(props) {
    return (
        <>
            <div className="pt-[60px]">
                <div className="w-[210px] mx-auto h-[152px] mb-[80px] ">
                    <img src="/assets/logoWhite.png" className="w-full block" />
                </div>
                <Link to="/users/login">
                    <button
                        className="bg-primary-300 rounded-[8px] px-[16px] text-white text-center whitespace-nowrap mx-auto mb-[30px] title"
                        style={{ width: "100%", height: "45px" }}
                        onClick={props.handleClick}
                    >
                        보호자
                    </button>
                </Link>
                <p className="text-center w-full mb-[30px] body1">or</p>
                <Link to="/doctors/login">
                    <button
                        className="border-[2px] border-primary-300 rounded-[8px] px-[16px] text-center whitespace-nowrap mx-auto title"
                        style={{ width: "100%", height: "45px" }}
                        onClick={props.handleClick}
                    >
                        수의사
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Intro;
