import React, { useState, useEffect, useRef } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import "./chattingview.css";

function ChattingView() {
    const [messages, setMessages] = useState([
        {
            text: "얘가 고기만 먹고 사료를 안 먹는데 어떻게 해야돼여???",
            timestamp: "13:23",
            type: "received",
        },
        {
            text: "안녕하세요. 코드랩 동물병원입니다.",
            timestamp: "13:23",
            type: "sent",
        },
        {
            text: "어떻게 하나요?????????",
            timestamp: "13:23",
            type: "received",
        },
        {
            text: "더 이상 질문이 없으시면 잠시 후 채팅이 종료됩니다.",
            timestamp: "13:23",
            type: "sent",
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isChatExpired, setIsChatExpired] = useState(false);
    const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
    const chatBodyRef = useRef(null);

    useEffect(() => {
        // Function to adjust the height of the chat body
        const adjustChatBodyHeight = () => {
            if (chatBodyRef.current) {
                const headerHeight = 60; // Adjust based on your header height
                const footerHeight =
                    document.querySelector(".chat-footer").offsetHeight;
                const newHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;
                chatBodyRef.current.style.height = newHeight;
            }
        };

        adjustChatBodyHeight();
        window.addEventListener("resize", adjustChatBodyHeight); // Adjust on window resize

        return () => window.removeEventListener("resize", adjustChatBodyHeight);
    }, []);

    useEffect(() => {
        const startTime = Date.now();
        const timer = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            const remainingTime = 300 - elapsedTime;
            if (remainingTime <= 0) {
                setIsChatExpired(true);
                setCountdown(0);
                clearInterval(timer);
            } else {
                setCountdown(remainingTime);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Scroll to the bottom when a new message is added
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() === "") return;

        const newMessage = {
            text: inputValue,
            timestamp: new Date().toLocaleTimeString().slice(0, 5),
            type: "sent",
        };

        setMessages([...messages, newMessage]);
        setInputValue("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent the default newline behavior
            handleSendMessage();
        }
    };

    return (
        <>
            <Header title="1:1 채팅" />
            <div className="chat-body" ref={chatBodyRef}>
                <div className="system-message">
                    {isChatExpired
                        ? "채팅이 종료되었습니다."
                        : `5분 이상 메시지가 없으면 채팅이 종료됩니다. (${formatTime(countdown)})`}
                </div>
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.type}`}>
                        {msg.type === "received" && (
                            <img
                                src="/assets/images/petDogIcon.svg"
                                alt="Profile"
                                className="profile-image"
                            />
                        )}
                        <div className="message-content">
                            <p>{msg.text}</p>
                            <span className="timestamp">{msg.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>
            {!isChatExpired && (
                <div className="chat-footer">
                    <input
                        type="text"
                        placeholder="메시지 입력..."
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown} // Add this line
                    />
                    <button className="send-button" onClick={handleSendMessage}>
                        ↑
                    </button>
                </div>
            )}
            <NavBar />
        </>
    );
}

export default ChattingView;
