import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React from "react";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    background: #692814 linear-gradient(75deg, #1b0c05, #55261a 65%);
`;

const Title = styled(Typography)`
    color: #28312b;
    font-family: "Permanent Marker", cursive;
    text-shadow: 0 0 3px #ebe8e0, 0 0 5px #ddd5c8, 0 0 11px #e7dfd9, 0 0 17px #c5aa87, 0 0 25px #7e4435;
`;

const ErrorPage: React.FC = () => {
    return (
        <Container>
            <Title variant="h2" color="white">
                500 INTERNAL ERROR
            </Title>
            <Title variant="h5" fontWeight={500} color="textSecondary">
                There's an error on this page
            </Title>
        </Container>
    );
};

export default ErrorPage;
