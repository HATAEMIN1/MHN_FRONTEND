import React from "react";

function CardSlider({ ...props }) {
    return (
        <>
            <div className="bg-white w-[300px] py-[8px] rounded-[4px] border px-[16px]">
                <div className="w-[270px] h-[160px] mb-[4px] rounded-[4px] overflow-hidden">
                    <img
                        // src="/assets/slideImage/test1.png"
                        src={
                            props.randomImageNumber
                                ? `/assets/images/hospitalImage${props.randomImageNumber}.svg`
                                : "/assets/slideImage/test1.png"
                        }
                        className="w-full h-full object-cover rounded-[4px]"
                    />
                </div>
                <div className="flex justify-between">
                    <p>{props.title}</p>
                    <div className="flex">
                        <img src={props.imgRoute} />
                        {props.ratingAVG ? <p>{props.ratingAVG}</p> : 0}
                        {/* <p>{props.ratingAVG}</p> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardSlider;
