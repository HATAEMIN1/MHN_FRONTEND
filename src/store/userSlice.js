import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../utils/cookieUtil";
import { loginDoctor, loginUser } from "./thunkFunction";

const initState = {
    id: "",
    email: "",
};

const loadMemberCookie = () => {
    return getCookie("member");
};

const userSlice = createSlice({
    name: "userSlice",
    initialState: loadMemberCookie() || initState,
    reducers: {},
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
            })
            .addCase(loginUser.rejected, (state, action) => {
                removeCookie("member");
                const error = action.error;
                if (error) {
                    return error;
                }
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
