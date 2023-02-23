import { AppContext } from "@/context/app-context";
import { useContext } from "react";

export const useAppContext = () => {
    const { notify, mode, toggleTheme } = useContext(AppContext);
    return { notify, mode, toggleTheme };
};
