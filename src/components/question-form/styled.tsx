import styled from "@emotion/styled";
import { Alert, Input as MuiInput, Stack } from "@mui/material";

export const Input = styled(MuiInput)`
    font-size: 14px;
    /* &:before {
        content: none;
    } */
`;

export const ChoiceBox = styled(Alert)`
    padding: 0;
    width: 100%;
    .MuiAlert-message {
        width: 100%;
        padding: 4px;
        padding-left: 1rem;
    }
`;

export const ChoiceWrapper = styled(Stack)`
    user-select: none;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-left: -2.5rem;
    margin-right: -2.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-bottom: 0.5rem;
    .drag-btn {
        cursor: pointer;
        visibility: hidden;
    }
    .delete-btn {
        cursor: pointer;
        visibility: hidden;
    }
    :hover .drag-btn {
        visibility: visible;
    }
    :hover .delete-btn {
        visibility: visible;
    }
`;
