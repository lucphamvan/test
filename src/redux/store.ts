import { configureStore } from "@reduxjs/toolkit";
import { setupAxiosInterceptor } from "@/config/http";
import authenReducer from "@/redux/slice/authen.slice";

export const store = configureStore({
    reducer: {
        authen: authenReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupAxiosInterceptor(store);
