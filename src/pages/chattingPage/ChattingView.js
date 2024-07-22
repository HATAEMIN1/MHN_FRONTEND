import React, { useState, useEffect, useRef } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import "./chattingview.css";

const WS_ENDPOINT = "http://localhost:8080/ws"; // Update with your WebSocket endpoint
const CHAT_PRIVATE_TOPIC = "/user/private";
const CHAT_SEND_MESSAGE_URL = "/app/chat.sendMessage";
const CHAT_JOIN_ROOM_URL = "/app/chat.joinRoom";

function ChattingView() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isChatExpired, setIsChatExpired] = useState(false);
    const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
    const chatBodyRef = useRef(null);
    const stompClientRef = useRef(null); // Reference to the STOMP client

    useEffect(() => {
        const adjustChatBodyHeight = () => {
            if (chatBodyRef.current) {
                const headerHeight = 60; // Adjust based on your header height
                const footer = document.querySelector(".chat-footer");
                
                if (footer) {
                    const footerHeight = footer.offsetHeight;
                    const newHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;
                    chatBodyRef.current.style.height = newHeight;
                } else {
                    console.warn("chat-footer element not found.");
                }
            }
        };
    
        // Call the function initially to set the correct height
        adjustChatBodyHeight();
    
        // Adjust height on window resize
        window.addEventListener("resize", adjustChatBodyHeight);
    
        // Clean up the event listener on component unmount
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
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const socket = new SockJS(WS_ENDPOINT);
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            console.log("Connected to WebSocket");
            stompClientRef.current = stompClient;

            // Subscribe to private messages
            stompClient.subscribe(CHAT_PRIVATE_TOPIC, (message) => {
                if (message.body) {
                    const chatMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            text: chatMessage.text,
                            timestamp: new Date(chatMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            type: "received",
                        },
                    ]);
                }
            });

            // Join room logic here
            // For example, you might need to send a request to join a room
        }, (error) => {
            console.error("WebSocket connection error: ", error);
        });

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect(() => {
                    console.log("Disconnected from WebSocket");
                });
            }
        };
    }, []);

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
            timestamp: new Date().toISOString(),
        };

        if (stompClientRef.current) {
            stompClientRef.current.send(CHAT_SEND_MESSAGE_URL, {}, JSON.stringify(newMessage));
            setMessages([...messages, {
                text: inputValue,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: "sent",
            }]);
            setInputValue("");
        }
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
