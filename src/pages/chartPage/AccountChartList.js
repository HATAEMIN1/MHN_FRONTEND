import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";

function AccountChartList() {
    return (
        <>
            <Header />
            <div className=" mt-10  ">
                <div className="mb-8 flex gap-4 flex-wrap sm:justify-start justify-center px-5">
                    <div className="cardWrap">
                        <div className="w-[230px] ">
                            <img
                                src="/assets/logoColor.png"
                                className="w-[100%] h-[100%] rounded-[4px]"
                            />
                        </div>
                        <div className="p-2">
                            <h3>말티즈 구토</h3>
                            <p>3일 전</p>
                        </div>
                    </div>
                    <div className="cardWrap">
                        <div className="w-[230px] ">
                            <img
                                src="/assets/logoColor.png"
                                className="w-[100%] h-[100%]"
                            />
                        </div>
                        <div className="p-2">
                            <h3>말티즈 구토</h3>
                            <p>3일 전</p>
                        </div>
                    </div>
                    <div className="cardWrap">
                        <div className="w-[230px] ">
                            <img
                                src="/assets/logoColor.png"
                                className="w-[100%] h-[100%]"
                            />
                        </div>
                        <div className="p-2">
                            <h3>말티즈 구토</h3>
                            <p>3일 전</p>
                        </div>
                    </div>
                    <div className="cardWrap">
                        <div className="w-[230px] ">
                            <img
                                src="/assets/logoColor.png"
                                className="w-[100%] h-[100%]"
                            />
                        </div>
                        <div className="p-2">
                            <h3>말티즈 구토</h3>
                            <p>3일 전</p>
                        </div>
                    </div>
                    <div className="cardWrap">
                        <div className="w-[230px] ">
                            <img
                                src="/assets/logoColor.png"
                                className="w-[100%] h-[100%]"
                            />
                        </div>
                        <div className="p-2">
                            <h3>말티즈 구토</h3>
                            <p>3일 전</p>
                        </div>
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    );
}

export default AccountChartList;
