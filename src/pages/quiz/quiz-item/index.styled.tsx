import { Card, Heading } from "@/components";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const QuizTitle = styled(Heading)`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #1a553c;
    &::after {
        content: "";
        display: block;
        width: 100%;
        height: 0.25rem;
        background-color: #1a553c;
    }
`;

export const QuizCard = styled(Card)`
    padding: 1rem;
    cursor: pointer;
    transition: all 0.09s;
    &:hover {
        transform: scale(1.05);
    }
`;

export const Badge = styled(Box)`
    padding: 0.25rem 0.75rem;
    border-radius: 2px;
    background-image: linear-gradient(315deg, #58ca75 0%, #2a8b5b 74%);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0.25rem;
    right: 0;
`;
