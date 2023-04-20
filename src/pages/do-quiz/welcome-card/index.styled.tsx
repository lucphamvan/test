import { Card, Heading } from "@/components";
import styled from "@emotion/styled";

export const StyledInfoCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 4px;
    margin: 2rem auto;
`;

export const StyledHeading = styled(Heading)`
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a553c;
    text-align: center;
    text-transform: uppercase;
`;
