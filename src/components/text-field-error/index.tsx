import { Typography } from "@mui/material";

interface Props {
    errors: any;
    name: string;
}

const TextFieldError = ({ errors, name }: Props) => {
    return (
        <>
            {errors[name] && errors[name].message && (
                <Typography fontSize={12} mt="0.25rem" color="error" fontWeight="400">
                    {errors[name].message}
                </Typography>
            )}
        </>
    );
};

export default TextFieldError;
