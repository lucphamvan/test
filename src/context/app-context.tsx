import { Notification } from "@/components";
import { useNotification } from "@/hook/useNotification";
import { useTheme } from "@/hook/useTheme";
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
    const { isShowNotify, hideNotify, notifyMessage, notifyType, notify } = useNotification();
    const { mode, theme, toggleTheme } = useTheme();

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
                        showNotify={isShowNotify}
                    />
                </MUIThemeProvider>
            </LocalizationProvider>
        </AppContext.Provider>
    );
};

export default AppProvider;
