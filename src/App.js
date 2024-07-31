import { Route, Routes, useLocation } from "react-router-dom";
import "./assets/css/tStyle.scss";
import "./assets/css/style.scss";
import UserRegister from "./pages/registerPage/UserRegister";
import UserLogin from "./pages/loginPage/UserLogin";
import DoctorRegister from "./pages/registerPage/DoctorRegister";
import DoctorLogin from "./pages/loginPage/DoctorLogin";
import BoardList from "./pages/boardPage/BoardList";
import BoardView from "./pages/boardPage/BoardView";
import BoardAdd from "./pages/boardPage/BoardAdd";
import ChattingList from "./pages/chattingPage/ChattingList";
import ChattingView from "./pages/chattingPage/ChattingView";
import ChattingAdd from "./pages/chattingPage/ChattingAdd";
import HospitalSearch from "./pages/hospitalPage/HospitalSearch";
import HospitalView from "./pages/hospitalPage/HospitalView";
import HospitalReview from "./pages/hospitalPage/HospitalReview";
import HospitalMap from "./pages/hospitalPage/HospitalMap";
import ChartList from "./pages/chartPage/ChartList";
import ChartView from "./pages/chartPage/ChartView";
import ChartAdd from "./pages/chartPage/ChartAdd";
import DChattingReqList from "./pages/chattingPage/DChattingReqList";
import ChatRoom from "./components/chat/ChatRoom";
import { useEffect, useState } from "react";
import Account from "./pages/accountPage/Account";
import Intro from "./pages/mainPage/Intro";
import Main from "./pages/mainPage/Main";
import AccountEdit from "./pages/accountPage/AccountEdit";
import AccountChatting from "./pages/accountPage/AccountChatting";
import AccountHospital from "./pages/accountPage/AccountHospital";
import AccountBoard from "./pages/accountPage/AccountBoard";
import AccountPetList from "./pages/accountPage/AccountPetList";
import AccountPetAdd from "./pages/accountPage/AccountPetAdd";
import Promotion from "./pages/subscriptionPage/Promotion";
import Payment from "./pages/subscriptionPage/Payment";
import SubscriptionManage from "./pages/subscriptionPage/SubscriptionManage";
import Test from "./components/test/Test";

import AdminTest from "./components/test/AdminTest";
import Approval from "./components/test/Approval";
import Report from "./components/test/Report";
import Stats from "./components/test/Stats";
import BoardSearchList from "./pages/boardPage/BoardSearchList";
import { useDispatch, useSelector } from "react-redux";
import { setChatRooms } from "./store/chatRoomSlice";
import axiosInstance from "./utils/axios";
import DoctorRegisterPending from "./pages/registerPage/DoctorRegisterPending";

function App() {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
    // const chatrooms = useSelector((state) => state.chatRoomSlice.chatRooms);

    const fetchChatrooms = async () => {
        try {
            const response = await axiosInstance.get("/chatrooms");
            dispatch(setChatRooms(response.data));
        } catch (error) {
            console.error("Error fetching chatrooms:", error);
        }
    };

    useEffect(() => {
        fetchChatrooms();
    }, []); //chatrooms

    const handleAddPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    const isMainPage = location.pathname === "/";
    return (
        <>
            <div className="sm:bg-gray-50 w-[100%] h-[100vh] flex justify-center items-center">
                <div className="bg-gray-600 w-[100%] h-[100%] sm:w-[576px]  sm:h-screen relative flex flex-col overflow-hidden border">
                    <div className="flex-grow overflow-hidden">
                        <div
                            className={`h-full overflow-y-auto bg-white ${isMainPage ? "" : "px-[16px]"} py-[85px] no-scrollbar`}
                        >
                            <Routes>
                                <Route
                                    path="/intro"
                                    element={<Intro />}
                                ></Route>
                                <Route
                                    path="/users/login"
                                    element={<UserLogin />}
                                />
                                <Route
                                    path="/doctors/login"
                                    element={<DoctorLogin />}
                                />
                                <Route
                                    path="/users/register"
                                    element={<UserRegister />}
                                />
                                <Route
                                    path="/doctors/register"
                                    element={<DoctorRegister />}
                                />
                                <Route
                                    path="/doctors/register/pending"
                                    element={<DoctorRegisterPending />}
                                />

                                <Route
                                    path="/"
                                    element={
                                        <div className="px-0">
                                            <Main />
                                        </div>
                                    }
                                />
                                {/*채팅*/}
                                <Route path="/chat" element={<ChatRoom />} />
                                <Route
                                    path="/chatboards"
                                    element={<ChattingList />}
                                />
                                <Route path="/" element={<Main />} />
                                <Route
                                    path="/chatboards/:senderId/:recipientId"
                                    element={<ChattingView />}
                                />
                                <Route
                                    path="/chatboards/new"
                                    element={<ChattingAdd />}
                                />
                                <Route
                                    path="/doctors/chatting"
                                    element={<DChattingReqList />}
                                />
                                {/*자유게시판*/}
                                <Route
                                    path="/boards"
                                    element={<BoardList posts={posts} />}
                                />
                                <Route
                                    path="/boards/:bdId"
                                    element={<BoardView posts={posts} />}
                                />
                                <Route
                                    path="/boards/search"
                                    element={<BoardSearchList />}
                                />
                                <Route
                                    path="/boards/new"
                                    element={
                                        <BoardAdd onAddPost={handleAddPost} />
                                    }
                                />
                                {/*병원*/}
                                <Route
                                    path="/hospitals/map"
                                    element={<HospitalMap />}
                                />
                                <Route
                                    path="/hospitals/search"
                                    element={<HospitalSearch />}
                                />
                                <Route
                                    path="/hospitals/:hpId"
                                    element={<HospitalView />}
                                />
                                <Route
                                    path="/hospitals/review/:hpId"
                                    element={<HospitalReview />}
                                />
                                {/*진료기록*/}
                                <Route path="/charts" element={<ChartList />} />
                                <Route
                                    path="/charts/new"
                                    element={<ChartAdd />}
                                />
                                <Route
                                    path="/charts/:chartId"
                                    element={<ChartView />}
                                />
                                {/*마이페이지*/}
                                <Route path="/account" element={<Account />} />
                                <Route
                                    path="/account/edit"
                                    element={<AccountEdit />}
                                />
                                <Route
                                    path="/account/chatting"
                                    element={<AccountChatting />}
                                />
                                <Route
                                    path="/account/hospitals"
                                    element={<AccountHospital />}
                                />
                                <Route
                                    path="/account/boards"
                                    element={<AccountBoard />}
                                />
                                <Route
                                    path="/account/pets"
                                    element={<AccountPetList />}
                                />
                                <Route
                                    path="/account/pets/new"
                                    element={<AccountPetAdd />}
                                />
                                {/*구독*/}
                                <Route
                                    path="/subscription"
                                    element={
                                        <div className="h-full w-full overflow-visible">
                                            <Promotion />
                                        </div>
                                    }
                                />
                                <Route
                                    path="/subscription/payment"
                                    element={<Payment />}
                                />
                                <Route
                                    path="/subscription/:userId"
                                    element={<SubscriptionManage />}
                                />
                                {/*테스트*/}
                                <Route path="/test" element={<Test />} />

                                <Route path="/admin" element={<AdminTest />} />
                                <Route
                                    path="/admin/approval"
                                    element={<Approval />}
                                />
                                <Route
                                    path="/admin/report"
                                    element={<Report />}
                                />
                                <Route
                                    path="/admin/stats"
                                    element={<Stats />}
                                />
                            </Routes>
                            {/* Account관련 경로들 싹 빠진듯 --> 내일 확인해야함 */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
