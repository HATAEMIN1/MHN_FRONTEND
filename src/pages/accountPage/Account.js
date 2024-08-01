import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import ButtonBlack from "../../components/button/ButtonBlack";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";

function Account() {
    const userId = useSelector((state) => state.userSlice.id);
    const profileImageUrl2 = useSelector(
        (state) => state.userSlice.profileImageUrl
    );
    const [profile, setProfile] = useState({
        nickName: "",
        email: "",
        profileImageUrl: profileImageUrl2,
        nextBillingDate: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get(`/members/edit`, {
                    params: { id: userId },
                });
                const { nickName, email, profileImageUrl, nextBillingDate } =
                    response.data;
                // 현재 날짜와 nextBillingDate 비교
                const today = new Date();
                const billingDate = new Date(nextBillingDate);

                // 날짜 차이 계산 (밀리초 단위)
                const timeDiff = billingDate.getTime() - today.getTime();

                // 일수로 변환 (밀리초를 일로 변환하고 소수점 이하를 버림)
                const daysLeft = Math.max(
                    0,
                    Math.floor(timeDiff / (1000 * 3600 * 24))
                );
                setProfile({
                    nickName,
                    email,
                    profileImageUrl: profileImageUrl || profileImageUrl2,
                    nextBillingDate: daysLeft || 0,
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
            <div className="my-[60px] h-[120px] py-[16px]">
                <div className="flex justify-between">
                    <div className="flex items-center gap-[8px] ">
                        <img
                            src={`${process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL}${profile.profileImageUrl}`}
                            className="w-[80px] h-[80px] rounded-[50px]"
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
                        <p className="body2 text-primary-300">
                            D-{profile.nextBillingDate}
                        </p>
                    </div>
                </div>
                <div className="ml-[88px] mb-[30px]">
                    <Link to="/account/edit">
                        <ButtonBlack text1="프로필 수정" />
                    </Link>
                </div>
            </div>
            <hr className="mb-[16px]" />
            {/* 마이페이지 메뉴 시작 */}
            <ul>
                <Link to="/subscription">
                    <li className="w-full flex justify-between py-[24px]">
                        <p className="body2 text-primary-300">
                            구독 관리 페이지
                        </p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
                <Link to="/account/chatting">
                    <li className="w-full flex justify-between py-[24px]">
                        <p className="body2 text-primary-300">1:1 채팅내역</p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
                <Link to="/account/hospitals">
                    <li className="w-full flex justify-between py-[24px]">
                        <p className="body2 text-primary-300">
                            즐겨찾기 한 병원
                        </p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
                <Link to="/account/boards">
                    <li className="w-full flex justify-between py-[24px]">
                        <p className="body2 text-primary-300">
                            내가 쓴 글 목록
                        </p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
                <Link to="/account/pets">
                    <li className="w-full flex justify-between py-[24px]">
                        <p className="body2 text-primary-300">펫 리스트</p>
                        <img src="/assets/images/nextIcon.svg" />
                    </li>
                </Link>
            </ul>
            <NavBar />
        </>
    );
}

export default Account;
