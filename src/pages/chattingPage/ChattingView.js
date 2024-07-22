import React, { useState, useEffect, useRef } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import "./chattingview.css";

const WS_ENDPOINT = "http://localhost:8080/ws"; // Update with your WebSocket endpoint
// const CHAT_PRIVATE_TOPIC = "/user/private";
const CHAT_SEND_MESSAGE_URL = "/app/chat.sendMessage";
const CHAT_JOIN_ROOM_URL = "/app/chat.joinRoom";

function ChattingView() {
    const [currentUserId, setCurrentUserId] = useState(1);
    const [recipientId, setRecipientId] = useState(2); 
    const [messages, setMessages] = useState([
        {   
            id: 1,
            senderId: currentUserId,
            recipientId: recipientId,
            content: "얘가 고기만 먹고 사료를 안 먹는데 어떻게 해야돼여???",
            timestamp: "오후 13:23",
            type: "received",
        },
        {   
            id: 2,
            senderId: currentUserId,
            recipientId: recipientId,
            content: "안녕하세요. 코드랩 동물병원입니다.",
            timestamp: "오후 13:25",
            type: "sent",
        },
        {   
            id: 3,
            senderId: currentUserId,
            recipientId: recipientId,
            content: "어떻게 하나요?????????",
            timestamp: "오후 13:26",
            type: "received",
        },
        {   
            id: 4,
            senderId: currentUserId,
            recipientId: recipientId,
            content: "더 이상 질문이 없으시면 잠시 후 채팅이 종료됩니다.",
            timestamp: "오후 13:27",
            type: "sent",
        },
    ]);
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
            stompClient.subscribe(`/user/${currentUserId}/private`, (message) => {
                if (message.body) {
                    const chatMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {   
                            id: chatMessage.id,
                            senderId: chatMessage.currentUserId,
                            recipientId: chatMessage.recipientId,
                            content: chatMessage.content,
                            timestamp: new Date(chatMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            type: "received",
                        },
                    ]);
                }
            });

            console.log("Successfully subscribed to:", `/user/${currentUserId}/private`);

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
            id: messages.length+1,
            senderId: currentUserId,
            recipientId: recipientId,
            content: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        if (stompClientRef.current) {
            stompClientRef.current.send(CHAT_SEND_MESSAGE_URL, {}, JSON.stringify(newMessage));
            setMessages([...messages, {
                ...newMessage,
                type: "sent",
            }]);
            console.log("updated messages:", messages);
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
                            <p>{msg.content}</p>
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
