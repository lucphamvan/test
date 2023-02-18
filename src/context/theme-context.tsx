import { darkTheme, lightTheme } from "@/theme";
import { CssBaseline, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { createContext, FC, useEffect, useMemo, useState } from "react";

export enum THEME_MODE {
    dark = "dark",
    light = "light"
}
export const ThemeContext = createContext({
    toggleTheme: () => {},
    mode: THEME_MODE.dark
});

const ThemeProvider: FC<any> = ({ children }) => {
    const [mode, setMode] = useState<THEME_MODE>(THEME_MODE.light);

    useEffect(() => {});
    const toggleTheme = () => {
        setMode((mode) => {
            if (mode === THEME_MODE.dark) {
                return THEME_MODE.light;
            } else {
                return THEME_MODE.dark;
            }
        });
        document.body.classList.add(mode);
    };

    const theme = useMemo(() => {
        if (mode === THEME_MODE.dark) {
            return darkTheme;
        } else {
            return lightTheme;
        }
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
