import React from "react";
import { Link } from "react-router-dom";

function ChattingListForm({ ...props }) {
    return (
        <>
            {props.hospitalList.map((item) => {
                return (
                    // <div className="mb-[20px] border-2">
                    <Link to="/hospitals/:hpId" className="w-full block">
                        <div className="flex justify-between items-center my-[16px]">
                            <div className="flex flex-grow gap-[8px]">
                                <div className="w-[80px] flex-shrink-0 ">
                                    <img
                                        src="/assets/logoColor.png"
                                        className="block w-full rounded-[4px]"
                                    />
                                </div>
                                <div>
                                    <div className="py-[4px]">{item.title}</div>
                                    <div>{item.content}</div>
                                </div>
                            </div>
                            <div className="flex items-center flex-shrink-0 gap-[4px]">
                                <div>
                                    <img src="/assets/images/likeIcon_color.svg" />
                                </div>
                                <div>{item.like}</div>
                            </div>
                        </div>
                    </Link>
                    // </div>
                );
            })}
        </>
    );
}

export default ChattingListForm;
