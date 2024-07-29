import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const loginUser = createAsyncThunk(
    "loginUser",
    async (body, thunkAPI) => {
        try {
            const res = await axiosInstance.post("/member/login", null, {
                params: {
                    username: body.Email,
                    password: body.Password,
                },
            });
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                error.response.data || error.message
            );
        }
    }
);

export const loginDoctor = createAsyncThunk(
    "loginDoctor",
    async (body, thunkAPI) => {
        try {
            const body1 = { email: body.Email, password: body.Password };

            const res = await axiosInstance.post("/doctor/login", body1);
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);
