import { useEffect, useState } from "react";

const useCountdown = (time: Date) => {
    const [timeLeft, setTimeLeft] = useState(time.valueOf() - Date.now());

    useEffect(() => {
        if (timeLeft === 0) {
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft((pre) => pre - 1000);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const day = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hour = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minute = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const second = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { day, hour, minute, second, timeLeft };
};

export default useCountdown;
