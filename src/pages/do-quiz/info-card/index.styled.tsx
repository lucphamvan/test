import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledInfoCard = styled(Box)`
    .heading {
        font-size: 2rem;
        font-weight: 500;
        font-family: "Permanent Marker", cursive;
        color: #086d40;
    }

    .message {
        color: #086d40;
        font-size: 1.5rem;
    }

    padding: 1rem;
    border-radius: 6px;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;

    max-width: 600px;
    min-width: 320px;
    margin: 2rem auto;
    box-shadow: 0px 8px 18px -6px #0a8f569e, 0px 12px 42px -4px #185c376b;
    background-color: #2a975722;
`;
