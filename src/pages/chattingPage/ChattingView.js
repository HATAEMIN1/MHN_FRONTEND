import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import "./chattingview.css";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../../utils/axios";

const WS_ENDPOINT = "http://localhost:8080/ws"; // Update with your WebSocket endpoint
const CHAT_SEND_MESSAGE_URL = "/app/chat.sendMessage";
const CHAT_JOIN_ROOM_URL = "/app/chat.joinRoom";

function ChattingView() {
    const { senderId, recipientId } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [hasPreviousMessages, setHasPreviousMessages] = useState(false);
    const chatBodyRef = useRef(null);
    const stompClientRef = useRef(null); // Reference to the STOMP client

    useEffect(() => {
        const fetchChatRoomId = async () => {
            try {
                const response = await axiosInstance.get(
                    `/chat/room/${senderId}/${recipientId}`
                );
                const chatRoomId = response.data;
                // console.log("fetched chat room id:", chatRoomId);
                if (chatRoomId) {
                    fetchMessages(chatRoomId);
                }
            } catch (error) {
                console.error("Error fetching chat room ID", error);
            }
        };

        const fetchMessages = async (chatRoomId) => {
            try {
                const response = await axiosInstance.get(
                    `/chat/messages/${chatRoomId}`
                );
                // console.log("fetched messages:", response.data);
                setMessages(response.data);
                setHasPreviousMessages(response.data.length > 0);
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
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const socket = new SockJS(WS_ENDPOINT);
        const stompClient = Stomp.over(socket);

        stompClient.connect(
            {},
            () => {
                console.log("Connected to WebSocket");
                stompClientRef.current = stompClient;

                stompClient.subscribe(
                    `/user/${senderId}/private`,
                    (message) => {
                        if (message.body) {
                            const chatMessage = JSON.parse(message.body);
                            setMessages((prevMessages) => [
                                ...prevMessages,
                                {
                                    id: chatMessage.id,
                                    senderId: chatMessage.senderId,
                                    recipientId: chatMessage.recipientId,
                                    content: chatMessage.content,
                                    timestamp: new Date(
                                        chatMessage.timestamp
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }),
                                    type: "received",
                                },
                            ]);
                        }
                    }
                );

                console.log("Subscribed to:", `/user/${senderId}/private`);

                const joinRoomRequest = {
                    senderId,
                    recipientId,
                };
                stompClientRef.current.send(
                    CHAT_JOIN_ROOM_URL,
                    {},
                    JSON.stringify(joinRoomRequest)
                );

                console.log("Joined room successfully");
            },
            (error) => {
                console.error("WebSocket connection error:", error);
            }
        );

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
            timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            type: "sent",
        };

        // Update local state with the new message
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if (stompClientRef.current) {
            stompClientRef.current.send(
                CHAT_SEND_MESSAGE_URL,
                {},
                JSON.stringify(newMessage)
            );
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
            <Header title="1:1 채팅 기록" />
            <div className="chat-body-view" ref={chatBodyRef}>
                <div className="system-message">종료된 채팅입니다.</div>
                {hasPreviousMessages &&
                    messages.map((msg) => (
                        <div
                            key={`${msg.id}-${uuidv4()}`}
                            className={`message ${msg.senderId === parseInt(senderId) ? "sent" : "received"}`}
                        >
                            {msg.senderId !== parseInt(senderId) && (
                                <img
                                    src="/assets/images/petDogIcon.svg"
                                    alt="Profile"
                                    className="profile-image"
                                />
                            )}
                            <div className="message-content">
                                <p>{msg.content}</p>
                                <span className="timestamp">
                                    {msg.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
            <NavBar />
        </>
    );
}

export default ChattingView;
