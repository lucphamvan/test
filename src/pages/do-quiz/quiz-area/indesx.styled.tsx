import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ContentBox = styled(Box)`
    font-weight: 500;
    &::first-letter {
        text-transform: uppercase;
    }
`;

export const TimeLeftText = styled(Box)`
    font-weight: 700;
    font-family: Oswald, sans-serif;
    font-size: 1.25rem;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
    color: #235f41;
`;
