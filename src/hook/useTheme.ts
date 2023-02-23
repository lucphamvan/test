import { darkTheme, lightTheme } from "@/theme";
import { ThemeMode } from "@/types/general";
import { useMemo, useState } from "react";

export const useTheme = () => {
    const [mode, setMode] = useState<ThemeMode>(ThemeMode.light);

    const theme = useMemo(() => {
        if (mode === ThemeMode.dark) {
            return darkTheme;
        } else {
            return lightTheme;
        }
    }, [mode]);

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

    return { mode, toggleTheme, theme };
};
