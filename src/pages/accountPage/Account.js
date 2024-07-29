import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import ButtonBlack from "../../components/button/ButtonBlack";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";

function Account() {
    const userId = useSelector((state) => state.userSlice.id);
    const [profile, setProfile] = useState({
        nickName: "",
        email: "",
        profileImageUrl: "/assets/images/default_profile.png",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get(`/members/edit`, {
                    params: { id: userId },
                });
                const { nickName, email, profileImageUrl } = response.data;
                setProfile({
                    nickName,
                    email,
                    profileImageUrl:
                        profileImageUrl || "/assets/images/default_profile.png",
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError(error);
                setLoading(false);
            }
        };

        if (userId) {
            fetchProfile();
        }
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Header title="마이페이지" />
            <div className="border-b mb-[20px] h-[120px] py-[16px]">
                <div className="flex justify-between">
                    <div className="flex items-center gap-[8px]">
                        <img
                            src={`http://localhost:8080${profile.profileImageUrl}`}
                            className="w-[56px] h-[56px] rounded-[50px]"
                            alt="Profile"
                        />
                        <div>
                            <p className="body1 text-primary-300">
                                {profile.nickName}
                            </p>
                            <p className="body2 text-sub-100">
                                {profile.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex">
                        <img
                            src="/assets/images/authIcon.svg"
                            className="w-[20px] h-[20px]"
                        />
                        <p className="body2 text-primary-300">D-24</p>
                    </div>
                </div>
                <div className="ml-[56px] mb-[18px]">
                    <Link to="/account/edit">
                        <ButtonBlack text1="프로필 수정" />
                    </Link>
                </div>
            </div>
            {/* 마이페이지 메뉴 시작 */}
            <ul>
                <Link to="/subscription">
                    <li className="w-full flex justify-between py-[16px]">
                        <p>구독 관리 페이지</p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
                <Link to="/account/chatting">
                    <li className="w-full flex justify-between py-[16px]">
                        <p>1:1 채팅내역</p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
                <Link to="/account/hospitals">
                    <li className="w-full flex justify-between py-[16px]">
                        <p>즐겨찾기 한 병원</p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
                <Link to="/account/boards">
                    <li className="w-full flex justify-between py-[16px]">
                        <p>내가 쓴 글 목록</p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
                <Link to="/account/pets">
                    <li className="w-full flex justify-between py-[16px]">
                        <p>펫 리스트</p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
            </ul>
            <NavBar />
        </>
    );
}

export default Account;
