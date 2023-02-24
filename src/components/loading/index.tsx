import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

const Box = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: greenyellow; */
    position: fixed;
    top: 0;
    left: 0;
`;

export const Loading = () => {
    return (
        <Box>
            <CircularProgress color="success" />
        </Box>
    );
};
