import React from "react";
import { Link } from "react-router-dom";

function ChattingListForm() {
    const participants = [{
        senderId: 1,
        recipientId: 2,
        title: "코드랩아카데미병원1",
        address: "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층",
        like: 333,
    },
    {
        senderId: 2,
        recipientId: 3,
        title: "코드랩아카데미병원2",
        address: "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 19층",
        like: 10,
    },
    {
        senderId: 4,
        recipientId: 1,
        title: "코드랩아카데미병원3",
        address: "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 18층",
        like: 88,
    }];
    return (
        <>
            {participants.map((pair, idx) => {
                return (
                    <Link key={`${pair.senderId}-${pair.recipientId}-${idx}`}
                    to={`/chatboards/${pair.senderId}/${pair.recipientId}`} className="w-full block">
                        <div className="flex justify-between items-center my-[16px]">
                            <div className="flex flex-grow gap-[8px]">
                                <div className="w-[80px] flex-shrink-0 ">
                                    <img
                                        src="/assets/logoColor.png"
                                        className="block w-full rounded-[4px]"
                                    />
                                </div>
                                <div>
                                    <div className="py-[4px] subtitle3 text-primary-300">
                                        {pair.title}
                                    </div>
                                    <div className="body2 text-sub-100">
                                        {pair.address}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center flex-shrink-0 gap-[4px]">
                                <div>
                                    <img src="/assets/images/likeIcon_color.svg" />
                                </div>
                                <div>{pair.like}</div>
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
