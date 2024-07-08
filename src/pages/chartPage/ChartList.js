import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import { Link } from "react-router-dom";

function ChartList() {
    const chartId = "1";
    return (
        <>
            <Header title="진료기록" write="charts/new" />
            <div className=" mt-10  ">
                <div className="mb-8 flex gap-4 flex-wrap  justify-between px-5">
                    <Link
                        to={`/charts/${chartId}`}
                        className="col-span-1 justify-self-start"
                    >
                        <div className="cardWrap">
                            <div className="w-[230px] ">
                                <img
                                    src="/assets/logoColor.png"
                                    className="w-[100%] h-[100%] rounded-[4px]"
                                />
                            </div>
                            <div className="p-2">
                                <h2>김츄츄</h2>
                                <p>말티즈 구토</p>
                                <p>3일 전</p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        to={`/charts/${chartId}`}
                        className="col-span-1 justify-self-start"
                    >
                        <div className="cardWrap">
                            <div className="w-[230px] ">
                                <img
                                    src="/assets/logoColor.png"
                                    className="w-[100%] h-[100%] rounded-[4px]"
                                />
                            </div>
                            <div className="p-2">
                                <h2>김츄츄</h2>
                                <p>말티즈 구토</p>
                                <p>3일 전</p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        to={`/charts/${chartId}`}
                        className="col-span-1 justify-self-start"
                    >
                        <div className="cardWrap">
                            <div className="w-[230px] ">
                                <img
                                    src="/assets/logoColor.png"
                                    className="w-[100%] h-[100%] rounded-[4px]"
                                />
                            </div>
                            <div className="p-2">
                                <h2>김츄츄</h2>
                                <p>말티즈 구토</p>
                                <p>3일 전</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <NavBar />
        </>
    );
}

export default ChartList;
