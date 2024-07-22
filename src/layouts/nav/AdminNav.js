import React from "react";
import { Link, useLocation } from "react-router-dom";

function AdminNav() {
    const location = useLocation();
    const navMenu = [
        {
            title: "가입승인",
            route: "/admin/approval",
            grayIcon: "approvalIcon_gray",
            blackIcon: "approvalIcon_black",
        },
        {
            title: "신고관리",
            route: "/admin/report",
            grayIcon: "policeIcon_gray",
            blackIcon: "policeIcon_black",
        },
        {
            title: "통계",
            route: "/admin/stats",
            grayIcon: "graphIcon_gray",
            blackIcon: "graphIcon_black",
        },
    ];
    return (
        <div
            className="bg-white bottom-0 fixed w-[100%] left-0 right-0 absolute h-[65px] px-[16px] border-t flex"
            style={{ zIndex: 98 }}
        >
            <ul className="flex justify-around items-center w-full">
                {navMenu.map((item, idx) => {
                    const isActive = location.pathname === item.route;
                    const isActive2 = location.pathname === item.route2;
                    console.log(location.pathname);

                    return (
                        <Link to={item.route} key={idx}>
                            <li className="text-center mini">
                                <img
                                    src={`/assets/images/${isActive ? item.blackIcon : isActive2 ? item.blackIcon : item.grayIcon}.svg`}
                                    className="m-auto"
                                />
                                {item.title}
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}

export default AdminNav;
