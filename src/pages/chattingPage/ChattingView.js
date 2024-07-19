import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import "./chattingview.css";

function ChattingView() {
    return (
        <>
            <Header title="1:1 채팅" />
            <div className="chat-body">
                <div className="system-message">5분 이상 메시지가 없으면 채팅이 종료됩니다.</div>
                <div className="message received">
                    <img src="/assets/images/petDogIcon.svg" alt="Profile" className="profile-image" />
                    <div className="message-content">
                        <p>얘가 고기만 먹고 사료를 안 먹는데 어떻게 해야돼여???</p>
                        <span className="timestamp">13:23</span>
                    </div>
                </div>
                <div className="message sent">
                    <div className="message-content">
                        <p>안녕하세요. 코드랩 동물병원입니다.</p>
                        <span className="timestamp">13:23</span>
                    </div>
                </div>
                <div className="message received">
                    <img src="/assets/images/petDogIcon.svg" alt="Profile" className="profile-image" />
                    <div className="message-content">
                        <p>어떻게 하나요?????????</p>
                        <span className="timestamp">13:23</span>
                    </div>
                </div>
                <div className="message sent">
                    <div className="message-content">
                        <p>더 이상 질문이 없으시면 잠시 후 채팅이 종료됩니다.</p>
                        <span className="timestamp">13:23</span>
                    </div>
                </div>
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="메시지 입력..." />
                <button className="send-button">↑</button>
            </div>
            <NavBar />
        </>
    );
}

export default ChattingView;
