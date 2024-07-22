import React from "react";

function CardSlider({ ...props }) {
    return (
        <>
            <div className="bg-white w-[300px] py-[8px] rounded-[4px] border px-[16px]">
                <img
                    src="/assets/slideImage/test1.png"
                    className="mb-[4px] rounded-[4px]"
                />
                <div className="flex justify-between">
                    <p>{props.title}</p>
                    <div className="flex">
                        <img src={props.imgRoute} />
                        <p>{props.bookmarkCount}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardSlider;
