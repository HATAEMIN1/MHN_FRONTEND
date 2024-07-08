import React from "react";

function ButtonBlack({ ...props }) {
    return (
        <>
            {props.width ? (
                <>
                    <button
                        className="bg-primary-300 rounded-[4px] px-[16px] text-white text-center"
                        style={{ width: props.width, height: props.height }}
                        // 대부분 width="100%" height="45px"로 맞춰주시면 됩니다
                        onClick={props.handleClick}
                    >
                        {props.text1}
                    </button>
                </>
            ) : (
                <>
                    <button
                        className="bg-primary-300 rounded-[4px] px-[16px] py-[4px] text-white text-center"
                        onClick={props.handleClick}
                    >
                        {props.text1}
                    </button>
                </>
            )}
        </>
    );
}

export default ButtonBlack;
