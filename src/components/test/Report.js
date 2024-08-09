import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import AdminNav from "../../layouts/nav/AdminNav";
import axiosInstance from "../../utils/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Report() {
    const loginState = useSelector((state) => state.userSlice);

    const [reportedBoardList, setReportedBoardList] = useState(null);

    async function getAllBoardReportList() {
        try {
            const res = await axiosInstance.get("/admin/boardreports/list");
            console.log(res.data);
            setReportedBoardList(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBoardReportList();
    }, []);
    return (
        <>
            {loginState &&
            loginState.memberTypeList &&
            loginState.memberTypeList[0] === "ADMIN" ? (
                <>
                    <Header title="신고관리" />
                    {reportedBoardList &&
                        // 정렬 로직 추가 start
                        [...reportedBoardList].map((reportedBoard) => (
                            <div className="border border-gray-600 rounded-md p-4 mt-8 hover:border-blue-200 hover:shadow-md transition duration-500">
                                <div className="flex justify-between body2 text-sub-200">
                                    {/* 병원 정보 시작 */}
                                    <div className="flex flex-col gap-2 mb-2 w-3/4">
                                        <div className="flex gap-[8px]">
                                            <p className="body2 text-sub-100 ">
                                                게시글Id{" "}
                                                <span className="body3 text-gray-300 ml-1">
                                                    {reportedBoard.freeBoard.id}
                                                </span>
                                            </p>
                                            <p className="body3 text-gray-300 ml-1">
                                                |
                                            </p>
                                            <p className="body2 text-sub-100 ">
                                                글작성자Id{" "}
                                                <span className="body3 text-gray-300 ml-1">
                                                    {
                                                        reportedBoard.freeBoard
                                                            .member.id
                                                    }
                                                </span>
                                            </p>
                                        </div>

                                        <p className="body2 text-primary-300">
                                            글 제목{" "}
                                            <span className="body2 text-sub-100 ml-1">
                                                {reportedBoard.freeBoard.title}
                                            </span>
                                        </p>
                                        <p className="body2 text-primary-300">
                                            글 내용{" "}
                                            <span className="body3 text-gray-300 ml-1">
                                                {
                                                    reportedBoard.freeBoard
                                                        .content
                                                }
                                            </span>
                                        </p>
                                        <div className="border-t border-dashed border-gray-700 flex justify-between pt-3">
                                            <p className="body2 text-primary-300">
                                                글 작성일자{" "}
                                                <span className="body3 text-gray-300 ml-1">
                                                    {
                                                        reportedBoard.freeBoard
                                                            .createDate
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* 버튼 시작 */}
                                    <button
                                        className="mini py-[6px] px-[14px] rounded-md  bg-primary-300 text-primary-400 hover:bg-sub-200"
                                        onClick={() => alert("버튼눌림")}
                                    >
                                        게시글 삭제하기
                                    </button>
                                    {/* 버튼 종료  */}
                                </div>
                            </div>
                        ))}
                    <AdminNav />
                </>
            ) : (
                <>
                    <p>잘못된접근입니다</p>
                    <Link to="/users/login">
                        <button>로그인 페이지로</button>
                    </Link>
                </>
            )}

            {/* <AdminNav /> */}
        </>
    );
}

export default Report;
