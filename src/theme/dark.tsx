import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
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
                    background: "#030c0c",
                    fontWeight: 500,
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
