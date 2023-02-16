import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

const Box = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Loading = () => {
    return (
        <Box>
            <CircularProgress color="success" />
        </Box>
    );
};
