import styled from "@emotion/styled";
import { Alert, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export const Flex = styled(Box)`
    align-items: center;
    display: flex;
`;

export const TooltipBody = styled(Box)`
    font-size: 11px;
    font-weight: 400;
    border-radius: 4px;
`;

export const SmallButton = styled(Button)`
    color: #e2f3ea;
    font-weight: 400;
    background-color: rgba(100, 100, 100, 0.5);
    padding: 0.1rem 0.75rem;
    border-radius: 2px;
    font-size: 13px;
    text-transform: capitalize;
    &:hover {
        background-color: rgba(100, 100, 100, 0.5);
    }
`;

export const BreadcumbLink = styled(NavLink)`
    color: ${(props) => (props.color ? props.color : "inherit")};
    font-size: 1.125rem;
    font-weight: 500;
    font-family: "Oswald", sans-serif;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const FullSizeAlert = styled(Alert)`
    padding: 0;
    .MuiAlert-message {
        width: 100%;
        padding: 4px;
    }
`;

export const Card = styled(Box)`
    box-shadow: 0px 8px 18px -6px rgb(24 39 75 / 12%), 0px 12px 42px -4px rgb(24 39 75 / 12%);
    border-radius: 6px;
`;
