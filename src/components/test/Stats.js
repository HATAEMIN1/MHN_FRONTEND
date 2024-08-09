// import React, { useEffect, useState } from "react";
// import Header from "../../layouts/header/Header";
// import AdminNav from "../../layouts/nav/AdminNav";
// // import {
// //     PieChart,
// //     Pie,
// //     Cell,
// //     Tooltip,
// //     Legend,
// //     ResponsiveContainer,
// // } from "recharts";

// // const data = [
// //     { name: "A", value: 400 },
// //     { name: "B", value: 300 },
// //     { name: "C", value: 200 },
// //     { name: "D", value: 278 },
// //     { name: "E", value: 189 },
// // ];

// // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
// // // https://discordstatus.com/
// // function Stats() {
// //     return (
// //         <>
// //             <Header title="통계" />
// //             <div className="flex items-center justify-center h-[80vh]">
// //                 <div style={{ width: "100%", height: 500 }} className="border">
// //                     <ResponsiveContainer>
// //                         <PieChart>
// //                             <Pie
// //                                 data={data}
// //                                 cx="50%"
// //                                 cy="50%"
// //                                 labelLine={false}
// //                                 outerRadius={80}
// //                                 fill="#8884d8"
// //                                 dataKey="value"
// //                             >
// //                                 {data.map((entry, index) => (
// //                                     <Cell
// //                                         key={`cell-${index}`}
// //                                         fill={COLORS[index % COLORS.length]}
// //                                     />
// //                                 ))}
// //                             </Pie>
// //                             <Tooltip />
// //                             <Legend />
// //                         </PieChart>
// //                     </ResponsiveContainer>
// //                 </div>
// //             </div>
// //             <AdminNav />
// //         </>
// //     );
// // }
// // export default Stats;
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from "recharts";
// import axiosInstance from "../../utils/axios";

// function Stats() {
//     const [doctorList, setDoctorList] = useState(null);
//     const [memberList, setMemberList] = useState(null);
//     const [submemberList, setSubMemberList] = useState(null);
//     // const [isLoading, setIsLoading] = useState(true);
//     async function getAllDoctorList() {
//         try {
//             const res = await axiosInstance.get("/doctors/register/list");
//             console.log("수의사총데이터", res.data);
//             setDoctorList(res.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     async function getAllMemberList() {
//         try {
//             const res = await axiosInstance.get("/admin/members/list");
//             console.log("멤버총데이터", res.data);
//             setMemberList(res.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     async function getAllSubMemberList() {
//         try {
//             const res = await axiosInstance.get("/admin/submembers/list");
//             console.log("구독멤버총데이터", res.data);
//             setSubMemberList(res.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         getAllDoctorList();
//         getAllMemberList();
//         getAllSubMemberList();
//     }, []);
//     // useEffect(() => {
//     //     Promise.all([getAllDoctorList(), getAllMemberList()])
//     //         .then(() => setIsLoading(false))
//     //         .catch((error) => {
//     //             console.error("Error fetching data:", error);
//     //             setIsLoading(false);

//     //         });
//     // }, []);
//     // if (isLoading) {
//     //     return <div>Loading...</div>;
//     // }

//     const data = [
//         {
//             month: "6월",
//             totalUser:
//                 memberList?.filter(
//                     (m) => new Date(m.member.createdAt).getMonth() <= 5
//                 ).length ?? 0,
//             registerUser:
//                 memberList?.filter(
//                     (m) => new Date(m.member.createdAt).getMonth() === 5
//                 ).length ?? 0,
//             subUser:
//                 submemberList?.filter(
//                     (s) => new Date(s.createdAt).getMonth() === 5
//                 ).length ?? 0,
//             doctor:
//                 doctorList?.filter(
//                     (d) => new Date(d.createdAt).getMonth() === 5
//                 ).length ?? 0,
//         },
//         {
//             month: "7월",
//             totalUser:
//                 memberList?.filter(
//                     (m) => new Date(m.member.createdAt).getMonth() <= 6
//                 ).length ?? 0,
//             registerUser:
//                 memberList?.filter(
//                     (m) => new Date(m.member.createdAt).getMonth() === 6
//                 ).length ?? 0,
//             subUser:
//                 submemberList?.filter(
//                     (s) => new Date(s.createdAt).getMonth() === 6
//                 ).length ?? 0,
//             doctor:
//                 doctorList?.filter(
//                     (d) => new Date(d.createdAt).getMonth() === 6
//                 ).length ?? 0,
//         },
//         {
//             month: "8월",
//             totalUser:
//                 memberList?.filter(
//                     (m) => new Date(m.member.createdAt).getMonth() <= 7
//                 ).length ?? 0,
//             registerUser:
//                 memberList?.filter(
//                     (m) => new Date(m.member.createdAt).getMonth() === 7
//                 ).length ?? 0,
//             subUser:
//                 submemberList?.filter(
//                     (s) => new Date(s.createdAt).getMonth() === 7
//                 ).length ?? 0,
//             doctor:
//                 doctorList?.filter(
//                     (d) => new Date(d.createdAt).getMonth() === 7
//                 ).length ?? 0,
//         },
//     ];

//     // const data = [
//     //     {
//     //         month: "6월",
//     //         totalUser: memberList?.length ?? 0,
//     //         subUser: 1,
//     //         doctor: doctorList?.length ?? 0,
//     //     },
//     //     {
//     //         month: "7월",
//     //         totalUser: memberList?.length ?? 0,
//     //         subUser: 1,
//     //         doctor: doctorList?.length ?? 0,
//     //     },
//     //     {
//     //         month: "8월",
//     //         totalUser: memberList?.length ?? 0,
//     //         subUser: 1,
//     //         doctor: doctorList?.length ?? 0,
//     //     },
//     // ];

//     return (
//         <>
//             <Header title="통계" />
//             <div className="flex justify-center items-center">
//                 <ResponsiveContainer width="100%" height={400}>
//                     <BarChart
//                         data={data}
//                         margin={{
//                             top: 20,
//                             right: 30,
//                             left: 20,
//                             bottom: 5,
//                         }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="month" />
//                         <YAxis />
//                         <Tooltip
//                         // wrapperStyle={{
//                         //     backgroundColor: "#ffeeee",
//                         //     border: "1px solid #d6d6d6",
//                         // }}
//                         />
//                         <Legend />
//                         <Bar
//                             dataKey="totalUser"
//                             fill="#333"
//                             name="전체 유저 수"
//                         />
//                         <Bar
//                             dataKey="registerUser"
//                             fill="#2c83ba"
//                             name="신규 가입 유저"
//                         />
//                         <Bar
//                             dataKey="subUser"
//                             fill="#9fd1e3"
//                             name="구독 유저 수"
//                         />
//                         <Bar dataKey="doctor" fill="#1139E8" name="수의사" />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>

//             <AdminNav />
//         </>
//     );
// }
// export default Stats;
import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import AdminNav from "../../layouts/nav/AdminNav";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelList,
} from "recharts";
import axiosInstance from "../../utils/axios";

function Stats() {
    const [doctorList, setDoctorList] = useState(null);
    const [memberList, setMemberList] = useState(null);
    const [submemberList, setSubMemberList] = useState(null);

    async function getAllDoctorList() {
        try {
            const res = await axiosInstance.get("/doctors/register/list");
            console.log("수의사총데이터", res.data);
            setDoctorList(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getAllMemberList() {
        try {
            const res = await axiosInstance.get("/admin/members/list");
            console.log("멤버총데이터", res.data);
            setMemberList(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getAllSubMemberList() {
        try {
            const res = await axiosInstance.get("/admin/submembers/list");
            console.log("구독멤버총데이터", res.data);
            setSubMemberList(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllDoctorList();
        getAllMemberList();
        getAllSubMemberList();
    }, []);

    const data = [
        {
            month: "6월",
            totalUser:
                memberList?.filter(
                    (m) => new Date(m.member.createdAt).getMonth() <= 5
                ).length ?? 0,
            registerUser:
                memberList?.filter(
                    (m) => new Date(m.member.createdAt).getMonth() === 5
                ).length ?? 0,
            subUser:
                submemberList?.filter(
                    (s) => new Date(s.createdAt).getMonth() === 5
                ).length ?? 0,
            doctor:
                doctorList?.filter(
                    (d) => new Date(d.createdAt).getMonth() === 5
                ).length ?? 0,
        },
        {
            month: "7월",
            totalUser:
                memberList?.filter(
                    (m) => new Date(m.member.createdAt).getMonth() <= 6
                ).length ?? 0,
            registerUser:
                memberList?.filter(
                    (m) => new Date(m.member.createdAt).getMonth() === 6
                ).length ?? 0,
            subUser:
                submemberList?.filter(
                    (s) => new Date(s.createdAt).getMonth() === 6
                ).length ?? 0,
            doctor:
                doctorList?.filter(
                    (d) => new Date(d.createdAt).getMonth() === 6
                ).length ?? 0,
        },
        {
            month: "8월",
            totalUser:
                memberList?.filter(
                    (m) => new Date(m.member.createdAt).getMonth() <= 7
                ).length ?? 0,
            registerUser:
                memberList?.filter(
                    (m) => new Date(m.member.createdAt).getMonth() === 7
                ).length ?? 0,
            subUser:
                submemberList?.filter(
                    (s) => new Date(s.createdAt).getMonth() === 7
                ).length ?? 0,
            doctor:
                doctorList?.filter(
                    (d) => new Date(d.createdAt).getMonth() === 7
                ).length ?? 0,
        },
    ];

    return (
        <>
            <Header title="통계" />
            <div className="flex justify-center items-center">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="totalUser"
                            fill="#333"
                            name="전체 유저 수"
                        >
                            <LabelList dataKey="totalUser" position="top" />
                        </Bar>
                        <Bar
                            dataKey="registerUser"
                            fill="#2c83ba"
                            name="신규 가입 유저"
                        >
                            <LabelList dataKey="registerUser" position="top" />
                        </Bar>
                        <Bar
                            dataKey="subUser"
                            fill="#9fd1e3"
                            name="구독 유저 수"
                        >
                            <LabelList dataKey="subUser" position="top" />
                        </Bar>
                        <Bar dataKey="doctor" fill="#1139E8" name="수의사">
                            <LabelList dataKey="doctor" position="top" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="text-center">
                최근 3개월동안의 데이터만 확인가능합니다.
            </p>
            <AdminNav />
        </>
    );
}

export default Stats;
