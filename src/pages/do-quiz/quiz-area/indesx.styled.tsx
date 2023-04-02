import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ContentBox = styled(Box)`
    font-weight: bold;
    &::first-letter {
        text-transform: uppercase;
    }
`;
