import { Route, Routes } from "react-router-dom";
import UserRegister from "./pages/userPage/registerPage/UserRegister";
import UserLogin from "./pages/userPage/userLoginPage/UserLogin";
import DoctorRegister from "./pages/doctorPage/doctorRegisterPage/DoctorRegister";
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
import DChatList from "./pages/chattingPage/DChatList";
import DChatAdd from "./pages/chattingPage/DChatAdd";
import DChatView from "./pages/chattingPage/DChatView";
import DChatViewList from "./pages/chattingPage/DChatViewList";

function App() {
    return (
        <>
            <Routes>
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/user/main" element={<UserMain />} />

                <Route path="/chart/:userId" element={<AccountChartList />} />
                <Route
                    path="/chart/:userId/:chartId"
                    element={<AccountChartView />}
                />

                <Route path="/chat" element={<ChatList />} />
                <Route path="/chat/:chatId" element={<ChatView />} />
                <Route path="/chat/new" element={<ChatAdd />} />

                <Route path="/board" element={<BoardList />} />
                <Route path="/board/:bdId" element={<BoardView />} />
                <Route path="/board/new" element={<BoardAdd />} />

                <Route path="/chat" element={<ChatList />} />
                <Route path="/chat/:chatId" element={<ChatView />} />
                <Route path="/chat/new" element={<ChatAdd />} />

                <Route path="/hospital/map" element={<HospitalMap />} />
                <Route path="/hospital/search" element={<HospitalList />} />
                <Route path="/hospital/:hpId" element={<HospitalView />} />
                <Route path="/hospital/review" element={<HospitalReview />} />

                <Route path="/doctor/register" element={<DoctorRegister />} />
                <Route path="/doctor/login" element={<DoctorRegister />} />
                <Route
                    path="/doctor/chart/:dctId"
                    element={<DoctorChartView />}
                />
                <Route path="/doctor/chart/new" element={<DoctorChartAdd />} />

                <Route path="/doctor/chat" element={<DChatList />} />
                <Route path="/doctor/chat/new" element={<DChatAdd />} />
                <Route path="/doctor/chat/:dctId" element={<DChatViewList />} />
                <Route
                    path="/doctor/chat/:dctId/:chatId"
                    element={<DChatView />}
                />
            </Routes>
        </>
    );
}

export default App;
