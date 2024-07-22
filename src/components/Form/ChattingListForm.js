import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function ChattingListForm() {
    const [chatrooms, setChatrooms] = useState([]);

    const api = axios.create({
        baseURL: 'http://localhost:8080', 
    });

    useEffect(() => {
        // Fetch chatrooms from the backend
        api.get('/api/chatrooms')
            .then(response => {
                setChatrooms(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the chatrooms!", error);
            });
    }, []);

    
    return (
        <>
            {chatrooms.map((chatroom, idx) => {
                return (
                    <Link key={`${chatroom.senderId}-${chatroom.recipientId}-${idx}`}
                    to={`/chatboards/${chatroom.senderId}/${chatroom.recipientId}`} className="w-full block">
                        <div className="flex justify-between items-center my-[16px]">
                            <div className="flex flex-grow gap-[8px]">
                                <div className="w-[80px] flex-shrink-0 ">
                                    <img
                                        src="/assets/logoColor.png"
                                        className="block w-full rounded-[4px]"
                                    />
                                </div>
                                <div>
                                    <div className="py-[4px] subtitle3 text-primary-300">
                                        {chatroom.title}
                                    </div>
                                    <div className="body2 text-sub-100">
                                        {chatroom.address}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center flex-shrink-0 gap-[4px]">
                                <div>
                                    <img src="/assets/images/likeIcon_color.svg" />
                                </div>
                                <div>{chatroom.likes}</div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </>
    );
}

export default ChattingListForm;
