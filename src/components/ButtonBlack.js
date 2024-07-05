import React from "react";

function ButtonBlack({ ...props }) {
    return (
        <>
            {props.width ? (
                <>
                    <button
                        className="bg-primary-300 rounded-[4px] px-[16px] text-white text-center"
                        style={{ width: props.width, height: props.height }}
                        onClick={props.handleClick}
                    >
                        {props.text1}
                    </button>
                </>
            ) : (
                <>
                    <div className="flex justify-center">
                        <button

                         

                            className="bg-primary-300 rounded-[4px] px-[16px] py-[4px] text-white text-center"

                            onClick={props.handleClick}
                        >
                            {props.text1}
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default ButtonBlack;
