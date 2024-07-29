import React from "react";

function ButtonClear({ ...props }) {
    return (
        <>
            {props.text2 ? (
                <div className="flex justify-center gap-[4px] ">
                    <button
                        className="border-2 rounded-[4px] px-[16px] text-#333 text-center items-center w-[140px] h-[36px] body2"
                        onClick={props.handleClick}
                    >
                        {props.text1}
                    </button>
                    <button
                        className="border-2 rounded-[4px] px-[16px] text-#333 text-center items-center w-[140px] h-[36px] body2"
                        onClick={props.handleClick2}
                    >
                        {props.text2}
                    </button>
                </div>
            ) : (
                <div className="flex justify-center">
                    <button
                        className="border-2 rounded-[4px] px-[16px] text-#333 text-center items-center w-[140px] h-[36px]"
                        onClick={props.handleClick}
                    >
                        {props.text1}
                    </button>
                </div>
            )}
        </>
    );
}

export default ButtonClear;
