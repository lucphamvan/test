import ThemeProvider from "context/theme-context";
import { useEffect } from "react";
import Router from "router";

function App() {
    useEffect(() => {
        // dispatch(checkAuthentication)
    }, []);

    return (
        <ThemeProvider>
            <Router />
        </ThemeProvider>
    );
}

export default App;
