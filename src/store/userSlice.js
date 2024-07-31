import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../utils/cookieUtil";
import { loginDoctor, loginUser } from "./thunkFunction";

const initState = {
    id: "",
    email: "",
    memberTypeList: [],
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
            });
    },
});
export default userSlice.reducer;
export const { updateUserStatus } = userSlice.actions;
