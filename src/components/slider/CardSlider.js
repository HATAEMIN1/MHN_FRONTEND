import React from "react";

function CardSlider({ ...props }) {
    return (
        <>
            <div className="bg-white w-[300px] py-[8px] rounded-[8px] border px-[16px]">
                <img src="/assets/slideImage/test1.png" className="mb-[4px]" />
                <div className="flex justify-between">
                    <p>title</p>
                    <div className="flex">
                        <img src={props.imgRoute} />
                        <p>count</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardSlider;
