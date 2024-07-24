// import React from "react";
// import Header from "../../layouts/header/Header";
// import AdminNav from "../../layouts/nav/AdminNav";

// function Approval() {
//     const hospitals = [
//         {
//             id: 1,
//             name: "코드랩 동물병원",
//             email: "aaa@naver.com",
//         },
//         {
//             id: 2,
//             name: "이노24시 동물병원",
//             email: "bbb@naver.com",
//         },
//         {
//             id: 3,
//             name: "n동물의료센터",
//             email: "ccc@naver.com",
//         },
//         {
//             id: 4,
//             name: "아이이 동물병원",
//             email: "ddd@naver.com",
//         },
//         {
//             id: 5,
//             name: "가나다라 동물병원",
//             email: "eee@naver.com",
//         },
//         {
//             id: 6,
//             name: "가디24시 동물병원",
//             email: "fff@naver.com",
//         },
//         {
//             id: 7,
//             name: "동동 동물병원",
//             email: "ggg@naver.com",
//         },
//     ];
//     return (
//         <>
//             <Header title="가입승인" />
//             {hospitals.map((hospital) => (
//                 <form key={hospital.id}>
//                     {/* list s  */}
//                     <div className="w-full flex justify-between py-2 mb-4 border-b border-gray-100">
//                         {/* name,email s */}
//                         <div>
//                             <p className="subtitle3 text-primary-300">
//                                 {hospital.name}
//                             </p>
//                             <p className="body2 text-sub-100">
//                                 {hospital.email}
//                             </p>
//                         </div>
//                         {/* name,email e */}

//                         {/* btn s  */}
//                         <button
//                             className="cursor-pointer"
//                             onClick={() => alert("승인완료")}
//                         >
//                             <span className="body2 text-primary-200">승인</span>
//                         </button>
//                         {/* btn e  */}
//                     </div>
//                     {/* list e  */}
//                 </form>
//             ))}
//             <AdminNav />
//         </>
//     );
// }

// export default Approval;

import React from "react";
import Header from "../../layouts/header/Header";
import AdminNav from "../../layouts/nav/AdminNav";

function Approval() {
    const hospitals = [
        {
            id: 1,
            name: "코드랩 동물병원",
            email: "aaa@naver.com",
        },
        {
            id: 2,
            name: "이노24시 동물병원",
            email: "bbb@naver.com",
        },
        {
            id: 3,
            name: "n동물의료센터",
            email: "ccc@naver.com",
        },
        {
            id: 4,
            name: "아이이 동물병원",
            email: "ddd@naver.com",
        },
        {
            id: 5,
            name: "가나다라 동물병원",
            email: "eee@naver.com",
        },
        {
            id: 6,
            name: "가디24시 동물병원",
            email: "fff@naver.com",
        },
        {
            id: 7,
            name: "동동 동물병원",
            email: "ggg@naver.com",
        },
    ];
    return (
        <>
            <Header title="가입승인" />
            {/* {hospitals.map((hospital) => ( */}
            {/* <form key={hospital.id}> */}
            <table>
                <thead className="w-full">
                    <tr className="bg-gray-100 border border-gray-200">
                        <th className="border border-gray-200 px-3 py-1">
                            상태
                        </th>
                        <th lassName="border border-gray-200 px-3 py-1">
                            이름
                        </th>
                        <th lassName="border border-gray-200 px-3 py-1">
                            이메일
                        </th>
                        <th lassName="border border-gray-200 px-3 py-1">
                            요청날짜
                        </th>
                        <th lassName="border border-gray-200 px-3 py-1">11</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border border-gray-200">
                        <td className="px-3 py-1">요청</td>
                        <td className="px-3 py-1">동물병원</td>
                        <td className="px-3 py-1">aaa.naver.com</td>
                        <td className="px-3 py-1">2024.07.20</td>
                        <td className="px-3 py-1">수락</td>
                    </tr>
                </tbody>
            </table>

            <div>
                <p>동물병원</p>
                <p>aaa.naver.com</p>
                <p>2022.07.20</p>
                <p>수락</p>
            </div>
            {/* </form> */}
            {/* ))} */}
            <AdminNav />
        </>
    );
}

export default Approval;
