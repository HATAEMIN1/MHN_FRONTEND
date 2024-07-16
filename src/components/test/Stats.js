import React from "react";
import Header from "../../layouts/header/Header";
import AdminNav from "../../layouts/nav/AdminNav";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "A", value: 400 },
    { name: "B", value: 300 },
    { name: "C", value: 200 },
    { name: "D", value: 278 },
    { name: "E", value: 189 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
// https://discordstatus.com/
function Stats() {
    return (
        <>
            <Header title="통계" />
            <div className="flex items-center justify-center h-[80vh]">
                <div style={{ width: "100%", height: 500 }} className="border">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <AdminNav />
        </>
    );
}
export default Stats;
