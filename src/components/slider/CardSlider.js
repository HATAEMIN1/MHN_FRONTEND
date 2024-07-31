import React from "react";

function CardSlider({ ...props }) {
    return (
        <>
            <div className="bg-white w-[300px] rounded-[4px] px-4 py-3">
                <div className="w-[270px] h-[160px] mb-2 rounded-[4px] overflow-hidden">
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
                    <p className="body2 text-primary-300">{props.title}</p>
                    <div className="flex">
                        <img src={props.imgRoute} />
                        {props.ratingAVG ? (
                            <p className="subtitle1 text-sub-100">
                                {props.ratingAVG}
                            </p>
                        ) : (
                            0
                        )}
                        {/* <p>{props.ratingAVG}</p> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardSlider;
