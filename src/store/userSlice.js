import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../utils/cookieUtil";
import { loginDoctor, loginUser, kakaoLogin } from "./thunkFunction"; // kakaoLogin 추가

const initState = {
    id: "",
    email: "",
    memberTypeList: [],
    name: "", // 이름 필드 추가
    tel: "", // 전화번호 필드 추가
};

const loadMemberCookie = () => {
    return getCookie("member");
};

const userSlice = createSlice({
    name: "userSlice",
    initialState: loadMemberCookie() || initState,
    reducers: {
        updateUserStatus: (state, action) => {
            state.memberTypeList = state.memberTypeList.filter(
                (type) => type !== action.payload.newStatus
            );
        },
        // 새로운 리듀서 추가: 이름 업데이트
        updateUserName: (state, action) => {
            state.name = action.payload;
            // 쿠키 업데이트
            const updatedMember = {
                ...loadMemberCookie(),
                name: action.payload,
            };
            setCookie("member", JSON.stringify(updatedMember));
        },
        // 새로운 리듀서 추가: 전화번호 업데이트
        updateUserTel: (state, action) => {
            state.tel = action.payload;
            // 쿠키 업데이트
            const updatedMember = {
                ...loadMemberCookie(),
                tel: action.payload,
            };
            setCookie("member", JSON.stringify(updatedMember));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                const payload = action.payload;
                if (payload.error) {
                    return payload.error;
                }
                setCookie("member", JSON.stringify(payload));
                console.log("fulfilled");
                return { ...state, ...payload };
            })
            .addCase(loginUser.pending, (state, action) => {
                console.log("pending");
                return state;
            })
            .addCase(loginUser.rejected, (state, action) => {
                removeCookie("member");
                const error = action.error;
                if (error) {
                    return error;
                }
                return state;
            })
            .addCase(loginDoctor.fulfilled, (state, action) => {
                const payload = action.payload;
                if (payload.error) {
                    return payload.error;
                }
                setCookie("member", JSON.stringify(payload));
                console.log("fulfilled");
                return { ...state, ...payload };
            })
            .addCase(loginDoctor.pending, (state, action) => {
                console.log("pending");
            })
            .addCase(loginDoctor.rejected, (state, action) => {
                removeCookie("member");
                const error = action.error;
                if (error) {
                    return error;
                }
            })
            .addCase(kakaoLogin.fulfilled, (state, action) => {
                // kakaoLogin 추가
                const payload = action.payload;
                if (payload.error) {
                    return payload.error;
                }
                setCookie("member", JSON.stringify(payload));
                console.log("kakaoLogin fulfilled");
                return { ...state, ...payload };
            })
            .addCase(kakaoLogin.pending, (state, action) => {
                console.log("kakaoLogin pending");
                return state;
            })
            .addCase(kakaoLogin.rejected, (state, action) => {
                removeCookie("member");
                const error = action.error;
                if (error) {
                    return error;
                }
                return state;
            });
    },
});
export default userSlice.reducer;
export const { updateUserStatus, updateUserName, updateUserTel } =
    userSlice.actions;
