import React from "react";

function HospitalListFormForDoctor({ ...props }) {
    const getRandomImageNumber = () => Math.floor(Math.random() * 17) + 1;
    return (
        <>
            {props.hospitalList &&
                props.hospitalList.map((item) => {
                    return (
                        <div className="mb-[20px]">
                            {/* <Link to={`/hospitals/${item.id}`}> */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center py-[10px] gap-[8px]">
                                    <div className="w-[65px] h-[65px] flex-shrink-0">
                                        {/* <img src="여기에 나중에 프롭스해온 병원정보값을 이미지로 출력할 예정입니다." /> */}
                                        <img
                                            src={`/assets/images/hospitalImage${getRandomImageNumber()}.svg`}
                                            className="rounded-[4px] block w-full"
                                        />
                                    </div>
                                    <div>
                                        <p className="subtitle1">{item.name}</p>
                                        <p className="body2">{item.address}</p>
                                        <div className="flex gap-[4px]">
                                            <p className="mini text-gray-300">
                                                {item.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <p>선택</p>
                                </div>
                            </div>
                            {/* </Link> */}
                        </div>
                    );
                })}
        </>
    );
}

export default HospitalListFormForDoctor;
