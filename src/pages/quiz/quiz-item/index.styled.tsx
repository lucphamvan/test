import { Card, Heading } from "@/components";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const QuizTitle = styled(Heading)`
    font-size: 1.75rem;
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
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    background-color: #ca5871;
    background-image: linear-gradient(315deg, #ca5871 0%, #f4d03f 74%);
    color: #fff;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: capitalize;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
`;
