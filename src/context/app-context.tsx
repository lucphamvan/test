import { Notification } from "@/components";
import { darkTheme, lightTheme } from "@/theme";
import { NotifyType, ThemeMode } from "@/types/general";
import { CssBaseline, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterMoment } from "@mui/x-date-pickers-pro/AdapterMoment";
import { createContext, FC, useCallback, useMemo, useState } from "react";

export const AppContext = createContext({
    toggleTheme: () => {},
    mode: ThemeMode.dark,
    notify: (message: string, type: NotifyType) => {}
});

const AppProvider: FC<any> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(ThemeMode.light);

    const [notifyMessage, setNotifyMessage] = useState("");
    const [notifyType, setNotifyType] = useState<NotifyType>();
    const [showNotify, setShowNotify] = useState(false);

    // state to handle global notify
    const notify = useCallback((message: string, type: NotifyType) => {
        setNotifyMessage(message);
        setNotifyType(type);
        setShowNotify(true);
    }, []);

    const hideNotify = () => setShowNotify(false);

    const toggleTheme = () => {
        setMode((mode) => {
            if (mode === ThemeMode.dark) {
                return ThemeMode.light;
            } else {
                return ThemeMode.dark;
            }
        });
        document.body.classList.add(mode);
    };

    const theme = useMemo(() => {
        if (mode === ThemeMode.dark) {
            return darkTheme;
        } else {
            return lightTheme;
        }
    }, [mode]);

    return (
        <AppContext.Provider value={{ mode, toggleTheme, notify }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <MUIThemeProvider theme={theme}>
                    <CssBaseline />

                    {children}

                    {/* this use for notification all app */}
                    <Notification
                        hideNotify={hideNotify}
                        notifyMessage={notifyMessage}
                        notifyType={notifyType}
                        showNotify={showNotify}
                    />
                </MUIThemeProvider>
            </LocalizationProvider>
        </AppContext.Provider>
    );
};

export default AppProvider;
