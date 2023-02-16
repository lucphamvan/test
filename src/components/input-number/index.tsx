import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type Props = {
    value: number;
    setValue: Function;
    min: number;
    max: number;
} & TextFieldProps;

const InputNumber = ({ value, setValue, min, max, ...props }: Props) => {
    const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value < min) {
            setValue(min);
            return;
        }
        if (value > max) {
            setValue(max);
            return;
        }
        setValue(value);
    };

    return (
        <TextField
            size="small"
            type="number"
            value={value}
            onChange={handleOnchange}
            inputProps={{ min, max }}
            {...props}
        />
    );
};

export default InputNumber;
