import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";

export const QuestionWrapper = styled(Stack)`
    border-bottom: 1px solid #00000024;
    padding: 0.75rem 1rem;
    position: relative;
    gap: 0.5rem;
    cursor: default;
    .action-btn {
        display: none;
    }
    &:hover {
        .action-btn {
            border: 1px solid #3a7451;
            border-radius: 4px;
            width: 22px;
            height: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;

export const QuestionContent = styled(Box)`
    border-radius: 2px;
    ::first-letter {
        text-transform: uppercase;
    }
`;

export const ChoiceWrapper = styled(Box)`
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
`;

export const NumberWrapper = styled.div`
    border-radius: 50px;
    width: 24px;
    height: 24px;
    min-width: 24px;
    justify-content: center;
    background-color: green;
    display: flex;
    align-items: center;
`;

export const ChoiceContent = styled(Box)`
    ::first-letter {
        text-transform: uppercase;
    }
`;
