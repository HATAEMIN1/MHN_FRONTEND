import React, { useEffect, useState } from "react";
import { getCookie, removeCookie, setCookie } from "../../utils/cookieUtil";
import { useDispatch } from "react-redux";
import { updateUserStatus } from "../../store/userSlice";
export const SubscriptionComponent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const eventSource = new EventSource(
            `${process.env.REACT_APP_SPRING_SERVER}/subscribe-status`
        );

        eventSource.onmessage = (event) => {
            console.log(event.data);
            const data = JSON.parse(event.data);
            const newStatus = data.status;
            const updatedUserId = data.userId;
            console.log(newStatus);
            console.log(updatedUserId);
            const currentUser = getCookie("member");
            console.log(currentUser);

            // 현재 사용자의 ID와 업데이트된 사용자의 ID가 일치할 때만 쿠키를 갱신합니다.
            if (currentUser.id === updatedUserId) {
                currentUser.memberTypeList = currentUser.memberTypeList.filter(
                    (type) => type !== newStatus
                );
                removeCookie("member");
                setCookie("member", JSON.stringify(currentUser));
                dispatch(updateUserStatus({ newStatus }));
                console.log("쿠키가 갱신되었습니다.");
            }
        };

        return () => {
            eventSource.close();
        };
    }, []);
};
