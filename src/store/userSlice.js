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
                console.log("fulfilled");
                const payload = action.payload;
                if (!payload.error) {
                    setCookie("member", JSON.stringify(payload));
                }
            })
            .addCase(loginUser.pending, (state, action) => {
                console.log("pending");
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("reject");
                removeCookie("member");
            });
    },
});
export default userSlice.reducer;
