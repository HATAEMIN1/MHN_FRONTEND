import { Route, Routes } from "react-router-dom";
import "./assets/css/tStyle.scss";
import "./assets/css/style.scss";
import UserRegister from "./pages/userPage/registerPage/UserRegister";
import UserLogin from "./pages/userPage/userLoginPage/UserLogin";
import DoctorRegister from "./pages/doctorPage/doctorRegisterPage/DoctorRegister";
import DoctorLogin from "./pages/doctorPage/doctorLoginPage/DoctorLogin";
import UserMain from "./pages/userPage/userMainPage/UserMain";
import BoardList from "./pages/boardPage/BoardList";
import BoardView from "./pages/boardPage/BoardView";
import BoardAdd from "./pages/boardPage/BoardAdd";
import ChatList from "./pages/chattingPage/ChatList";
import ChatView from "./pages/chattingPage/ChatView";
import ChatAdd from "./pages/chattingPage/ChatAdd";
import HospitalList from "./pages/hospitalPage/HospitalList";
import HospitalView from "./pages/hospitalPage/HospitalView";
import HospitalReview from "./pages/hospitalPage/HospitalReview";
import HospitalMap from "./pages/hospitalPage/HospitalMap";
import AccountChartList from "./pages/chartPage/AccountChartList";
import AccountChartView from "./pages/chartPage/AccountChartView";
import DoctorChartView from "./pages/chartPage/DoctorChartView";
import DoctorChartAdd from "./pages/chartPage/DoctorChartAdd";
import DChatReqList from "./pages/chattingPage/DChatReqList";
import DChatAdd from "./pages/chattingPage/DChatAdd";
import DChatView from "./pages/chattingPage/DChatView";
import DChatViewList from "./pages/chattingPage/DChatViewList";
import DoctorChartList from "./pages/chartPage/DoctorChartList";
import DoctorBoardAdd from "./pages/doctorBoardPage/DoctorBoardAdd";
import DoctorBoardList from "./pages/doctorBoardPage/DoctorBoardList";
import DoctorBoardView from "./pages/doctorBoardPage/DoctorBoardView";

function App() {
    return (
        <>
            <div className="sm:bg-red-200 w-[100%] h-[100vh] flex justify-center items-center">
                <div className="bg-gray-600 w-[100%] h-[100%] sm:w-[576px] sm:h-screen relative flex flex-col ">
                    <div className="flex-grow overflow-hidden">
                        <div className="h-full overflow-y-auto bg-white pr-4 px-[16px] py-[65px]">
                            <Routes>
                                <Route
                                    path="/user/register"
                                    element={<UserRegister />}
                                />
                                <Route
                                    path="/user/login"
                                    element={<UserLogin />}
                                />
                                <Route
                                    path="/user/main"
                                    element={<UserMain />}
                                />
                                <Route
                                    path="/chart/:userId"
                                    element={<AccountChartList />}
                                />
                                <Route
                                    path="/chart/:userId/:chartId"
                                    element={<AccountChartView />}
                                />
                                <Route path="/board" element={<BoardList />} />
                                <Route
                                    path="/board/:bdId"
                                    element={<BoardView />}
                                />
                                <Route
                                    path="/board/new"
                                    element={<BoardAdd />}
                                />
                                <Route path="/chat" element={<ChatList />} />
                                <Route
                                    path="/chat/:chatId"
                                    element={<ChatView />}
                                />
                                <Route path="/chat/new" element={<ChatAdd />} />
                                <Route
                                    path="/hospital/map"
                                    element={<HospitalMap />}
                                />
                                <Route
                                    path="/hospital/search"
                                    element={<HospitalList />}
                                />
                                <Route
                                    path="/hospital/:hpId"
                                    element={<HospitalView />}
                                />
                                <Route
                                    path="/hospital/review"
                                    element={<HospitalReview />}
                                />
                                <Route
                                    path="/doctor/register"
                                    element={<DoctorRegister />}
                                />
                                <Route
                                    path="/doctor/login"
                                    element={<DoctorLogin />}
                                />
                                <Route
                                    path="/doctor/chart/:dctId/:chartId"
                                    element={<DoctorChartView />}
                                />
                                <Route
                                    path="/doctor/chart/new"
                                    element={<DoctorChartAdd />}
                                />
                                <Route
                                    path="/doctor/chart/:dctId"
                                    element={<DoctorChartList />}
                                />
                                <Route
                                    path="/doctor/chat"
                                    element={<DChatReqList />}
                                />
                                <Route
                                    path="/doctor/chat/new"
                                    element={<DChatAdd />}
                                />
                                <Route
                                    path="/doctor/chat/:dctId"
                                    element={<DChatViewList />}
                                />
                                <Route
                                    path="/doctor/chat/:dctId/:chatId"
                                    element={<DChatView />}
                                />
                                <Route
                                    path="/doctor/board/new"
                                    element={<DoctorBoardAdd />}
                                />
                                <Route
                                    path="/doctor/board"
                                    element={<DoctorBoardList />}
                                />
                                <Route
                                    path="/doctor/board/:dbdId"
                                    element={<DoctorBoardView />}
                                />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
