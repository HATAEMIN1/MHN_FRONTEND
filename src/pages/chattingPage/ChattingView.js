import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import "./chattingview.css";

const WS_ENDPOINT = "http://localhost:8080/ws"; // Update with your WebSocket endpoint
const CHAT_SEND_MESSAGE_URL = "/app/chat.sendMessage";
const CHAT_JOIN_ROOM_URL = "/app/chat.joinRoom";

function ChattingView() {
    const { senderId, recipientId } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isChatExpired, setIsChatExpired] = useState(false);
    const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
    const [hasPreviousMessages, setHasPreviousMessages] = useState(false);
    const chatBodyRef = useRef(null);
    const stompClientRef = useRef(null); // Reference to the STOMP client

    // Create an Axios instance with a custom base URL
    const api = axios.create({
        baseURL: 'http://localhost:8080', // Set the base URL for API requests
    });

    useEffect(() => {
        const fetchChatRoomId = async () => {
            try {
                const response = await api.get(`/api/chat/room/${senderId}/${recipientId}`);
                const chatRoomId = response.data;
                console.log("fetched chat room id:", chatRoomId);
                if (chatRoomId) {
                    fetchMessages(chatRoomId);
                }
            } catch (error) {
                console.error("Error fetching chat room ID", error);
            }
        };

        const fetchMessages = async (chatRoomId) => {
            try {
                const response = await api.get(`/api/chat/messages/${chatRoomId}`);
                console.log("fetched messages:", response.data);
                setMessages(response.data);
                setHasPreviousMessages(response.data.length > 0);
                if (response.data.length > 0) {
                    setIsChatExpired(true); // If there are previous messages, the chat isn't expired
                } else {
                    setIsChatExpired(false); // No previous messages means chat can be active
                }
            } catch (error) {
                console.error("Error fetching messages", error);
            }
        };

        fetchChatRoomId();
    }, [senderId, recipientId]);

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

        adjustChatBodyHeight();
        window.addEventListener("resize", adjustChatBodyHeight);
        return () => window.removeEventListener("resize", adjustChatBodyHeight);
    }, []);

    useEffect(() => {
        if (!hasPreviousMessages && !isChatExpired) {
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
        }
    }, [hasPreviousMessages, isChatExpired]);

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

            stompClient.subscribe(`/user/${senderId}/private`, (message) => {
                if (message.body) {
                    const chatMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            id: chatMessage.id,
                            senderId: chatMessage.senderId,
                            recipientId: chatMessage.recipientId,
                            content: chatMessage.content,
                            timestamp: new Date(chatMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            type: "received",
                        },
                    ]);
                }
            });

            console.log("Subscribed to:", `/user/${senderId}/private`);

            const joinRoomRequest = {
                senderId,
                recipientId
            };
            stompClientRef.current.send(CHAT_JOIN_ROOM_URL, {}, JSON.stringify(joinRoomRequest));

            console.log("Joined room successfully");

        }, (error) => {
            console.error("WebSocket connection error:", error);
        });

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect(() => {
                    console.log("Disconnected from WebSocket");
                });
            }
        };
    }, [senderId, recipientId]);

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
            id: messages.length + 1,
            senderId,
            recipientId,
            content: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        if (stompClientRef.current) {
            stompClientRef.current.send(CHAT_SEND_MESSAGE_URL, {}, JSON.stringify(newMessage));
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
                {!hasPreviousMessages && !isChatExpired && (
                    <div className="system-message">
                        5분 이상 메시지가 없으면 채팅이 종료됩니다. ({formatTime(countdown)})
                    </div>
                )}
                {hasPreviousMessages && messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.senderId === parseInt(senderId) ? "sent" : "received"}`}>
                        {msg.senderId !== parseInt(senderId) && (
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
                {!hasPreviousMessages && isChatExpired && (
                    <div className="system-message">
                        채팅이 종료되었습니다.
                    </div>
                )}
            </div>
            {!hasPreviousMessages && !isChatExpired && (
                <div className="chat-footer">
                    <input
                        type="text"
                        placeholder="메시지 입력..."
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
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
