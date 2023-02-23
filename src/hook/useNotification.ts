import { NotifyType } from "@/types/general";
import { useCallback, useState } from "react";

export const useNotification = () => {
    const [notifyMessage, setNotifyMessage] = useState("");
    const [notifyType, setNotifyType] = useState<NotifyType>();
    const [isShowNotify, setIsShowNotify] = useState(false);

    // state to handle global notify
    const notify = useCallback((message: string, type: NotifyType) => {
        setNotifyMessage(message);
        setNotifyType(type);
        setIsShowNotify(true);
    }, []);

    const hideNotify = () => setIsShowNotify(false);

    return { notifyMessage, notifyType, isShowNotify, notify, hideNotify };
};
