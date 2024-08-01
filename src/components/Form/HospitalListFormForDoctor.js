import React, { useEffect, useState } from "react";

function HospitalListFormForDoctor({ ...props }) {
    const getRandomImageNumber = () => Math.floor(Math.random() * 17) + 1;
    const [selectedHospitalId, setSelectedHospitalId] = useState(null);

    const handleHospitalSelect = (id) => {
        console.log("서치모달 8번");
        setSelectedHospitalId(id);
        props.setGetHospitalId(id);
        props.onClose();
    };

    useEffect(() => {
        console.log("selectedHospitalId:", selectedHospitalId);
        props.setGetHospitalId(selectedHospitalId);
    }, [selectedHospitalId]);

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
                                        <p className="subtitle1 text-primary-300 ">
                                            {item.name}
                                        </p>
                                        <p className="body2 text-sub-100">
                                            {item.address}
                                        </p>
                                        <div className="flex gap-[4px]">
                                            <p className="mini text-gray-300">
                                                {item.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="flex-shrink-0 cursor-pointer"
                                    // onClick={() => {
                                    //     setSelectedHospitalId(item.id);
                                    //     console.log(
                                    //         "선택된 병원 아이디값은:",
                                    //         item.id
                                    //     );
                                    //     props.onClose(); // 여기에서 onClose 함수를 호출합니다
                                    // }}
                                    onClick={() =>
                                        handleHospitalSelect(item.id)
                                    }
                                >
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
