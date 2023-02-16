import { getUserInfo } from "@/services/authen.service";
import { User } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthenState {
    isAuthen: boolean;
    user: User | null;
    fetching: boolean;
}

const initState: AuthenState = {
    isAuthen: false,
    user: null,
    fetching: true
};

// First, create the thunk
export const fetchUserInfo = createAsyncThunk("users/info", async () => {
    const user = await getUserInfo();
    return user;
});

const authenSlice = createSlice({
    name: "authen",
    initialState: initState,
    reducers: {
        clearSession: (state) => {
            state.isAuthen = false;
            state.user = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.fetching = true;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.fetching = false;
                state.isAuthen = true;
                state.user = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state) => {
                state.isAuthen = false;
                state.fetching = false;
                state.user = null;
            });
    }
});

export const { clearSession } = authenSlice.actions;
export default authenSlice.reducer;
