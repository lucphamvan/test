import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        primary: {
            light: "#99d066",
            main: "#689f38",
            dark: "#387002",
            contrastText: "#fff",
        },
    },
    typography: {
        fontFamily: `'Rajdhani', sans-serif`,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: "#F3F7F7",
                    fontWeight: 500,
                    color: "#282C34",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 700,
                    borderRadius: 4,
                },
            },
        },
    },
});
