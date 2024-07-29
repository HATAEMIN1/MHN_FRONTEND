import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        userId: null,
        username: "",
        receiverId: null,
        receivername: "",
        connected: false,
        message: "",
    });
    // useEffect(() => {
    //     // console.log("userData:",userData);
    // }, [userData]);

    const connect = () => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };
    const registerUser = () => {
        connect();
    };
    const onError = (error) => {
        console.log("Error:", error);
    };
    const onConnected = () => {
        console.log("connected to chat...");
        setUserData({ ...userData, connected: true });
        stompClient.subscribe(
            "/user" + userData.userId + "/private" + onPrivateMessage
        );
        userJoin();
    };
    const userJoin = () => {
        let chatMessage = {
            senderId: userData.userId,
            senderName: userData.username,
            status: "JOIN",
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    };
    const onPrivateMessage = (data) => {
        console.log("data sent to onPrivateMessage:", data);
        let parsedData = JSON.parse(data.body);
        let newPrivateChats = privateChats.get(parsedData.senderId);
        if (newPrivateChats) {
            newPrivateChats.push(parsedData);
            setPrivateChats(new Map(newPrivateChats));
        } else {
            newPrivateChats = [];
            newPrivateChats.push(parsedData);
            privateChats.set(parsedData.senderId, newPrivateChats);
            setPrivateChats(new Map(privateChats));
        }
    };

    return (
        <div>
            <h1>ChatRoom</h1>
            <button type="button" onClick={registerUser}>
                connect
            </button>
        </div>
    );
};

export default ChatRoom;
