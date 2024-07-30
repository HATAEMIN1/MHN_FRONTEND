import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../utils/cookieUtil";

export const SubscriptionComponent = () => {
    useEffect(() => {
        const eventSource = new EventSource(
            `${process.env.REACT_APP_SPRING_SERVER}/subscribe-status`
        );
        console.log(eventSource);
        eventSource.onmessage = (event) => {
            console.log(event.data);
            const newStatus = JSON.parse(event.data).status;
            // 쿠키 업데이트
            const member = getCookie("member");
            member.memberTypeList = member.memberTypeList.filter(
                (type) => type === newStatus
            );
            console.log(member);
            setCookie("member", JSON.stringify(member));
            console.log("쿠키바뀜");
        };
        return () => {
            eventSource.close();
        };
    }, []);
};
