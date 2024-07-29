import React, { useState, useEffect, useRef } from "react";
import Header from "../../layouts/header/Header";
import "./chattingview.css";
// import { v4 as uuidv4 } from "uuid";
import NavBar from "../../layouts/nav/NavBar";
import axiosInstance from "../../utils/axios";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";

const WS_ENDPOINT = "http://localhost:8080/ws"; // Update with your WebSocket endpoint
const CHAT_SEND_MESSAGES_URL = "/app/chat.sendMessages";
/* 
public class ChatMessageDTO { <- we'll send this to chat_send_messages_url
    @Id
    private String chatRoomId;
    @Builder.Default
    List<ChatMessage> messages = new ArrayList<>();
}
public class ChatMessage { <- list of this goes inside chatMessageDTO as messages
    @Id
    private Long id; 
    private String chatRoomId;
    private Long senderId;
    private Long recipientId;
    private String content;
    @Builder.Default
    private Instant createdAt = Instant.now();
}
*/
const CHAT_JOIN_ROOM_URL = "/app/chat.joinRoom";

// const initialMessages = [
//     {
//         id: 1,
//         senderId: 10,
//         content: "얘가 고기만 먹고 사료를 안 먹는데 어떻게 해야돼여???",
//         timestamp: "오후 13:23",
//         type: "received",
//     },
//     {
//         id: 2,
//         senderId: 10,
//         content: "모르겠어요 ㅠㅜㅜㅜㅜㅠ",
//         timestamp: "오후 13:24",
//         type: "received",
//     },
//     {
//         id: 3,
//         senderId: 10,
//         content: "어떻게 하나요?????????",
//         timestamp: "오후 13:26",
//         type: "received",
//     },
// ];

function ChattingAdd() {
    const [senderId, setSenderId] = useState(null);
    const [recipientId, setRecipientId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isChatExpired, setIsChatExpired] = useState(false);
    const [countdown, setCountdown] = useState(30); // 5 minutes in seconds = 300
    // const [simulatedMessages, setSimulatedMessages] = useState([]);
    const chatBodyRef = useRef(null);
    const stompClientRef = useRef(null); // Reference to the STOMP client
    const [chatRoomId, setChatRoomId] = useState("");
    const userId = useSelector((state) => state.userSlice.id);

    useEffect(() => {
        setSenderId(userId);
        setRecipientId(Math.floor(Math.random() * 500));
    }, []);

    // works
    useEffect(() => {
        const fetchChatRoomId = async () => {
            if (senderId == null || recipientId == null) return;
            try {
                const response = await axiosInstance.get(
                    `/chat/room/${senderId}/${recipientId}`
                );
                const chatRoomId = response.data;
                // console.log("fetched chat room id in chattingAdd:", chatRoomId);
                setChatRoomId(chatRoomId);
            } catch (error) {
                console.error("Error fetching chat room ID", error);
            }
        };

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

        fetchChatRoomId();
        adjustChatBodyHeight();
        window.addEventListener("resize", adjustChatBodyHeight);
        return () => window.removeEventListener("resize", adjustChatBodyHeight);
    }, [senderId, recipientId]);

    const fetchChatRoomDTO = async () => {
        // console.log("chatRoomId:", chatRoomId);
        if (chatRoomId === "") {
            return;
        }
        try {
            const response = await axiosInstance.get(`chat/room/${chatRoomId}`);
            const chatRoomDTO = response.data;
            const chatRoom = chatRoomDTO.chatRoom;
            chatRoom.title =
                "코드랩아카데미병원" + Math.floor(Math.random() * 500);
            chatRoom.likes = Math.floor(Math.random() * 500);
            chatRoom.address =
                "서울 금천구 가산디지털2로 144 현대테라타워 가산DK " +
                Math.floor(Math.random() * 20) +
                "층";
            // console.log("chatroom:", chatRoom);

            const postResponse = await axiosInstance.post(
                "chat/room",
                chatRoom,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // console.log("Saved new chat room:", postResponse.data);
        } catch (error) {
            console.error(
                "Error getting chatRoomDTO of chatRoomId 11_12_cf26ec75-5944-4ee3-8687-cf3cfcdecfca",
                error
            );
        }
    };
    useEffect(() => {
        fetchChatRoomDTO();
    }, [chatRoomId]);

    // works
    useEffect(() => {
        const startTime = Date.now();
        const timer = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            const remainingTime = 30 - elapsedTime; // 300
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

    // works
    useEffect(() => {
        const connect = () => {
            // connect to stompClient
            const socket = new SockJS(WS_ENDPOINT);
            const stompClient = Stomp.over(socket);

            stompClient.connect(
                {},
                () => {
                    console.log("Connected to WebSocket");
                    stompClientRef.current = stompClient;

                    // subscribe to user's private channel
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
                                        createdAt: new Date(
                                            chatMessage.createdAt
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
                    setTimeout(connect, 5000); // Attempt to reconnect after 5 seconds
                }
            );
        };
        connect();
    }, []);

    // useEffect(() => {
    //     const simulateMessages = async () => {
    //         for (const [index, msg] of initialMessages.entries()) {
    //             if (
    //                 msg.type === "received" &&
    //                 !simulatedMessages.includes(msg.id)
    //             ) {
    //                 const delay = 10000 * index; // 10 seconds interval between messages
    //                 await new Promise((resolve) => setTimeout(resolve, delay));
    //                 setMessages((prevMessages) => [...prevMessages, msg]);
    //                 setSimulatedMessages((prev) => [...prev, msg.id]);
    //             }
    //         }
    //     };
    //     simulateMessages();
    // }, []);

    useEffect(() => {
        if (isChatExpired) {
            // Send all messages via WebSocket if chat has expired
            sendMessages();
        }
    }, [isChatExpired]);

    // Send messages via WebSocket
    const sendMessages = () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            const chatMessageDTO = {
                chatRoomId,
                messages: messages.map((msg) => ({
                    id: msg.id,
                    chatRoomId,
                    senderId: msg.senderId,
                    recipientId: msg.recipientId,
                    content: msg.content,
                    createdAt: msg.createdAt,
                })),
            };

            stompClientRef.current.send(
                CHAT_SEND_MESSAGES_URL,
                {},
                JSON.stringify(chatMessageDTO)
            );
            console.log("Messages sent to server:", chatMessageDTO);
            // if (stompClientRef.current) {
            //     stompClientRef.current.disconnect(() => {
            //         console.log("Disconnected from WebSocket");
            //     });
            // }
            // Set up a one-time listener for the response
            const subscription = stompClientRef.current.subscribe(
                `/user/${senderId}/private`,
                (message) => {
                    const response = JSON.parse(message.body);
                    if (response.chatRoomId) {
                        // console.log("Messages saved successfully:", response);
                        subscription.unsubscribe(); // Unsubscribe after receiving the response
                    } else {
                        console.error("Failed to save messages:", response);
                    }
                }
            );

            // Disconnect after a timeout if no response is received
            setTimeout(() => {
                if (subscription) {
                    subscription.unsubscribe();
                    console.log("No response received, unsubscribed");
                }
                if (stompClientRef.current) {
                    stompClientRef.current.disconnect(() => {
                        console.log("Disconnected from WebSocket");
                    });
                }
            }, 5000); // 5 second timeout
        } else {
            console.error("STOMP client is not connected");
        }
    };

    // works
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    // works
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
            createdAt: new Date().toISOString(),
            // toLocaleTimeString([], {
            //     hour: "2-digit",
            //     minute: "2-digit",
            // }),
            type: "sent", // then how to know when once received message and how to simulate this...
        };

        // Update local state with the new message
        setMessages((prevMessages) => [
            ...prevMessages,
            newMessage,
            // {
            //     ...newMessage,
            //     timestamp: new Date().toLocaleTimeString([], {
            //         hour: "2-digit",
            //         minute: "2-digit",
            //     }),
            //     type: "sent",
            // },
        ]);

        setInputValue("");
        // if (stompClientRef.current) {
        //     stompClientRef.current.send(
        //         CHAT_SEND_MESSAGE_URL,
        //         {},
        //         JSON.stringify(newMessage)
        //     );
        //     setInputValue("");
        // }
    };

    // works
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
                {!isChatExpired ? (
                    <div className="system-message">
                        30초 이상 메시지가 없으면 채팅이 종료됩니다.(
                        {formatTime(countdown)})
                    </div>
                ) : (
                    <div className="system-message">채팅이 종료되었습니다.</div>
                )}
                {messages.map((msg) => (
                    <div
                        key={`chattingAdd-${msg.id}`}
                        className={`message ${msg.senderId === senderId ? "sent" : "received"}`}
                    >
                        {msg.senderId !== senderId && (
                            <img
                                src="/assets/images/petDogIcon.svg"
                                alt="Profile"
                                className="profile-image"
                            />
                        )}
                        <div className="message-content">
                            <p>{msg.content}</p>
                            <span className="timestamp">
                                {new Date(msg.createdAt).toLocaleTimeString(
                                    [],
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        timeZone: "UTC",
                                    }
                                )}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {!isChatExpired && (
                <div className="chat-footer">
                    <input
                        type="text"
                        placeholder="Enter message..."
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

export default ChattingAdd;
