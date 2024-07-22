import React from "react";
import { Link } from "react-router-dom";

function HospitalListForm({ ...props }) {
    return (
        <>
            {props.hospitalList &&
                props.hospitalList.map((item) => {
                    return (
                        <div className="mb-[20px]">
                            <Link to={`/hospitals/${item.id}`}>
                                <div className="flex items-center py-[10px] gap-[8px]">
                                    <div>
                                        {/* <img src="여기에 나중에 프롭스해온 병원정보값을 이미지로 출력할 예정입니다." /> */}
                                        <img
                                            src="/assets/logoColor.png"
                                            className="rounded-[4px] w-[65px] h-[65px]"
                                        />
                                    </div>
                                    <div>
                                        <p className="subtitle1">{item.name}</p>
                                        <p className="body2">{item.address}</p>
                                        <div className="flex gap-[4px]">
                                            <p className="mini text-gray-300">
                                                {/* {item.latitude} |{item.longitude} | */}
                                                {item.distance} |
                                            </p>
                                            <p className="mini text-gray-300">
                                                {item.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
        </>
    );
}

export default HospitalListForm;
