import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../utils/cookieUtil";
import { loginUser } from "./thunkFunction";

const initState = {
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
                console.log(action.payload);
                console.log("스테이트는");
                console.log(state);
                const payload = action.payload;
                if (payload.error) {
                    return payload.error;
                }
                setCookie("member", JSON.stringify(payload));
                console.log("fulfilled");
            })
            .addCase(loginUser.pending, (state, action) => {
                console.log("pending");
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log(action);
                const error = action.error;
                console.log(error);
                if (error) {
                    return error;
                }
                removeCookie("member");
            });
    },
});
export default userSlice.reducer;
