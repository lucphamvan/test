import moment, { Moment } from "moment";
import { useMemo, useState } from "react";

export const useDate = (startTime: number, endTime: number) => {
    const [startDate, setStartDate] = useState<Moment | null>(moment(startTime));
    const [endDate, setEndDate] = useState<Moment | null>(moment(endTime));

    const startDateErr = useMemo(() => {
        if (startDate === null) {
            return "'Start date' is required";
        }
        return "";
    }, [startDate]);

    const endDateErr = useMemo(() => {
        if (endDate === null) {
            return "'End date' is required";
        }

        if (startDate && endDate && endDate.isBefore(startDate)) {
            return "'End date' must be after 'Start date'";
        }
        return "";
    }, [endDate, startDate]);

    const onStartDateChange = (date: Moment | null) => {
        if (date?.isValid()) {
            setStartDate(date);
        }
    };

    const onEndDateChange = (date: Moment | null) => {
        if (date?.isValid()) {
            setEndDate(date);
        }
    };

    return {
        startDate,
        endDate,
        onStartDateChange,
        onEndDateChange,
        startDateErr,
        endDateErr
    };
};
