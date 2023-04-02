import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledErrorCard = styled(Box)`
    .heading {
        font-size: 2rem;
        font-weight: 500;
        font-family: "Permanent Marker", cursive;
        color: #5a605e;
    }

    .message {
        color: #5a605e;
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
    box-shadow: 0px 8px 18px -6px rgba(255, 0, 0, 0.22), 0px 12px 42px -4px rgba(255, 0, 0, 0.16);
    background-color: rgb(255 0 0 / 6%);
`;
