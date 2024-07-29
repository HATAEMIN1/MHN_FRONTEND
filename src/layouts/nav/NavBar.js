import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalManager from "../../components/modal/ModalManager";
import ButtonClear from "../../components/button/ButtonClear";

function NavBar() {
    const navigate = useNavigate();
    const loginState = useSelector((state) => {
        return state.userSlice;
    });
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
            route: "/charts",
            grayIcon: "medicalHistory_gray",
            blackIcon: "medicalHistory_black",
        },
        {
            title: "병원찾기",
            route: "/hospitals/map",
            grayIcon: "search_gray",
            blackIcon: "search_black",
        },

        {
            title: "게시판",
            route: "/chatboards",
            route2: "/boards",
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
    const navMenu2 = [
        {
            title: "홈",
            route: "/",
            grayIcon: "home_gray",
            blackIcon: "home_black",
        },
        {
            title: "진료기록",
            route: "/users/login",
            grayIcon: "medicalHistory_gray",
            blackIcon: "medicalHistory_black",
        },
        {
            title: "병원찾기",
            route: "/hospitals/map",
            grayIcon: "search_gray",
            blackIcon: "search_black",
        },

        {
            title: "게시판",
            route: "/chatboards",
            route2: "/boards",
            grayIcon: "board_gray",
            blackIcon: "board_black",
        },
        {
            title: "마이페이지",
            route: "/users/login",
            grayIcon: "account_gray",
            blackIcon: "account_black",
        },
    ];
    return (
        <div
            className="bg-white bottom-0 fixed w-[100%] left-0 right-0 absolute h-[65px] px-[16px] border-t flex"
            style={{ zIndex: 98 }}
        >
            {loginState.email ? (
                <ul className="flex justify-around items-center w-full">
                    {navMenu.map((item, idx) => {
                        const isActive = location.pathname === item.route;
                        const isActive2 = location.pathname === item.route2;
                        // console.log(location.pathname);
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
            ) : (
                <ul className="flex justify-around items-center w-full">
                    {navMenu2.map((item, idx) => {
                        const isActive = location.pathname === item.route;
                        const isActive2 = location.pathname === item.route2;
                        // console.log(location.pathname);
                        return item.route == "/users/login" ? (
                            <ModalManager
                                modalContent={({ closeModal }) => (
                                    <div>
                                        <p className="mb-[8px]">
                                            로그인 유저만 이용 가능합니다.
                                        </p>

                                        <ButtonClear
                                            text1="로그인페이지로"
                                            text2="원래페이지로"
                                            handleClick={(e) => {
                                                navigate("/users/login");
                                                closeModal();
                                            }}
                                            handleClick2={(e) => {
                                                closeModal();
                                            }}
                                        />
                                    </div>
                                )}
                            >
                                {({ openModal }) => (
                                    <div onClick={openModal}>
                                        <li className="text-center mini">
                                            <img
                                                src={`/assets/images/${isActive ? item.blackIcon : isActive2 ? item.blackIcon : item.grayIcon}.svg`}
                                                className="m-auto"
                                            />
                                            {item.title}
                                        </li>
                                    </div>
                                )}
                            </ModalManager>
                        ) : (
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
            )}
        </div>
    );
}

export default NavBar;
