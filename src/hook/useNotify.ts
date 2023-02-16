import { AppContext } from "@/context/app-context";
import { useContext } from "react";

export const useNotify = () => {
    const { notify } = useContext(AppContext);
    return notify;
};
