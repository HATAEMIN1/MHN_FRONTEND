import { Route, Routes, useLocation } from "react-router-dom";
import "./assets/css/tStyle.scss";
import "./assets/css/style.scss";
import { Suspense, useEffect, useState } from "react";
import Test from "./components/test/Test";
import AdminTest from "./components/test/AdminTest";
import Approval from "./components/test/Approval";
import Report from "./components/test/Report";
import Stats from "./components/test/Stats";
import { useDispatch, useSelector } from "react-redux";
import { setChatRooms } from "./store/chatRoomSlice";
import axiosInstance from "./utils/axios";
import { lazy } from "react";
import KakaoRedirectPage from "./pages/kakaoPage/KakaoRedirectPage";

const Intro = lazy(() => import("./pages/mainPage/Intro"));
const UserLogin = lazy(() => import("./pages/loginPage/UserLogin"));
const DoctorLogin = lazy(() => import("./pages/loginPage/DoctorLogin"));
const UserRegister = lazy(() => import("./pages/registerPage/UserRegister"));
const DoctorRegister = lazy(
    () => import("./pages/registerPage/DoctorRegister")
);
const DoctorRegisterPending = lazy(
    () => import("./pages/registerPage/DoctorRegisterPending")
);
const Main = lazy(() => import("./pages/mainPage/Main"));
const ChatRoom = lazy(() => import("./components/chat/ChatRoom"));
const ChattingList = lazy(() => import("./pages/chattingPage/ChattingList"));
const ChattingView = lazy(() => import("./pages/chattingPage/ChattingView"));
const ChattingAdd = lazy(() => import("./pages/chattingPage/ChattingAdd"));
const DChattingReqList = lazy(
    () => import("./pages/chattingPage/DChattingReqList")
);
const BoardList = lazy(() => import("./pages/boardPage/BoardList"));
const BoardView = lazy(() => import("./pages/boardPage/BoardView"));
const BoardSearchList = lazy(() => import("./pages/boardPage/BoardSearchList"));
const BoardAdd = lazy(() => import("./pages/boardPage/BoardAdd"));
const HospitalMap = lazy(() => import("./pages/hospitalPage/HospitalMap"));
const HospitalSearch = lazy(
    () => import("./pages/hospitalPage/HospitalSearch")
);
const HospitalView = lazy(() => import("./pages/hospitalPage/HospitalView"));
const HospitalReview = lazy(
    () => import("./pages/hospitalPage/HospitalReview")
);
const ChartList = lazy(() => import("./pages/chartPage/ChartList"));
const ChartAdd = lazy(() => import("./pages/chartPage/ChartAdd"));
const ChartView = lazy(() => import("./pages/chartPage/ChartView"));
const Account = lazy(() => import("./pages/accountPage/Account"));
const AccountEdit = lazy(() => import("./pages/accountPage/AccountEdit"));
const AccountChatting = lazy(
    () => import("./pages/accountPage/AccountChatting")
);
const AccountHospital = lazy(
    () => import("./pages/accountPage/AccountHospital")
);
const AccountBoard = lazy(() => import("./pages/accountPage/AccountBoard"));
const AccountPetList = lazy(() => import("./pages/accountPage/AccountPetList"));
const AccountPetAdd = lazy(() => import("./pages/accountPage/AccountPetAdd"));
const Promotion = lazy(() => import("./pages/subscriptionPage/Promotion"));
const Payment = lazy(() => import("./pages/subscriptionPage/Payment"));
const SubscriptionManage = lazy(
    () => import("./pages/subscriptionPage/SubscriptionManage")
);
const Appointment = lazy(() => import("./pages/hospitalPage/Appointment"));
const AppointmentApproval = lazy(
    () => import("./pages/hospitalPage/AppointmentApproval")
);

const Loading = () => (
    <div className="flex justify-center items-center h-full">
        <img src="/assets/loading.gif" alt="Loading" />
    </div>
);

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
                            className={`h-full overflow-y-auto bg-white ${isMainPage ? "" : "px-[16px]"} pt-[65px] pb-[85px] no-scrollbar`}
                        >
                            <Suspense fallback={<Loading />}>
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
                                    <Route
                                        path="/chat"
                                        element={<ChatRoom />}
                                    />
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
                                            <BoardAdd
                                                onAddPost={handleAddPost}
                                            />
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
                                    {/* 진료예약 */}
                                    <Route
                                        path="/hospitals/appointment/:hpId"
                                        element={<Appointment />}
                                    />
                                    <Route
                                        path="/doctors/appointment/:hpId"
                                        element={<AppointmentApproval />}
                                    />

                                    {/*진료기록*/}
                                    <Route
                                        path="/charts"
                                        element={<ChartList />}
                                    />
                                    <Route
                                        path="/charts/new"
                                        element={<ChartAdd />}
                                    />
                                    <Route
                                        path="/charts/:chartId"
                                        element={<ChartView />}
                                    />
                                    {/*마이페이지*/}
                                    <Route
                                        path="/account"
                                        element={<Account />}
                                    />
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

                                    <Route
                                        path="/admin"
                                        element={<AdminTest />}
                                    />
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
                                    <Route
                                        path="/member/kakao"
                                        element={<KakaoRedirectPage />}
                                    />
                                </Routes>
                            </Suspense>
                            {/* Account관련 경로들 싹 빠진듯 --> 내일 확인해야함 */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
