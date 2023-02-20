import { Flex } from "@/components";
import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";

export const QuestionWrapper = styled(Stack)`
    border: 1px solid #00000024;
    border-radius: 4px;
    padding: 0.75rem 1rem;
    position: relative;
    gap: 0.5rem;
    .action-btn {
        display: none;
    }
    &:hover {
        .action-btn {
            border: 1px solid #00000034;
            border-radius: 4px;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;

export const QuestionContent = styled(Box)`
    border-radius: 2px;
    padding-left: 0.5rem;
    ::first-letter {
        text-transform: uppercase;
    }
`;

export const ChoiceWrapper = styled(Box)<any>`
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    /* background-color: ${(props) => (props.correct ? "#00000010" : "initial")}; */
`;

export const NumberWrapper = styled(Flex)`
    border-radius: 50%;
    width: 24px;
    height: 24px;
    justify-content: center;
`;

export const ChoiceContent = styled(Box)`
    ::first-letter {
        text-transform: uppercase;
    }
`;
