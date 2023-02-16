import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        primary: {
            light: "#48825c",
            main: "#1a5532",
            dark: "#002b0b",
            contrastText: "#eef7f7"
        }
    },
    typography: {
        fontFamily: `'Roboto', sans-serif`
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: "#f9ffff",
                    fontWeight: 400,
                    color: "#143127"
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontSize: 14,
                    borderRadius: 4,
                    fontFamily: `'Roboto Condensed', sans-serif`,
                    boxShadow: "none"
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    fontWeight: 400
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontWeight: 400,
                    fontSize: 13
                }
            }
        }
    }
});
