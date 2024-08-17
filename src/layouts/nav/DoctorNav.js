import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function DoctorNav() {
    const loginState = useSelector((state) => state.userSlice);
    console.log(loginState);
    const location = useLocation();
    const navMenu = [
        {
            title: "실시간채팅요청",
            route: "/doctors/chatting",
            grayIcon: "chattingIcon_clear",
            blackIcon: "chattingIcon_black",
        },
        {
            title: "예약관리페이지",
            route: `/doctors/appointment/${loginState.hospital.id}`,
            grayIcon: "appointmentIcon_clear",
            blackIcon: "appointmentIcon_black",
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
                    console.log(location.pathname);

                    return (
                        <Link to={item.route} key={idx}>
                            <li className="text-center mini">
                                <img
                                    src={`/assets/images/${isActive ? item.blackIcon : item.grayIcon}.svg`}
                                    className="m-auto mb-[4px]"
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

export default DoctorNav;
