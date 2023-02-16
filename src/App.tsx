import AppProvider from "@/context/app-context";
import { useAppDispatch } from "@/redux/hook";
import { fetchUserInfo } from "@/redux/slice/authen.slice";
import Router from "@/router";
import { useEffect } from "react";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    return (
        <AppProvider>
            <Router />
        </AppProvider>
    );
}

export default App;
