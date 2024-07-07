import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
    const location = useLocation();
    const navMenu = [
        {
            title: "홈",
            route: "/",
            grayIcon: "home_gray",
            blackIcon: "home_black",
        },
        {
            title: "진료기록",
            route: "/chart/:userId",
            grayIcon: "medicalHistory_gray",
            blackIcon: "medicalHistory_black",
        },
        {
            title: "병원찾기",
            route: "/hospital/map",
            grayIcon: "search_gray",
            blackIcon: "search_black",
        },

        {
            title: "게시판",
            route: "/board",
            grayIcon: "board_gray",
            blackIcon: "board_black",
        },
        {
            title: "마이페이지",
            route: "/account",
            grayIcon: "account_gray",
            blackIcon: "account_black",
        },
    ];
    return (
        <div className="bg-white bottom-0 z-50 fixed w-[100%] left-0 right-0 absolute h-[65px] px-[16px] border-t flex">
            <ul className="flex justify-around items-center w-full">
                {navMenu.map((item, idx) => {
                    const isActive = location.pathname === item.route;
                    console.log(location.pathname);

                    return (
                        <Link to={item.route} key={idx}>
                            <li className="text-center mini">
                                <img
                                    src={`/assets/images/${isActive ? item.blackIcon : item.grayIcon}.svg`}
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

export default NavBar;
