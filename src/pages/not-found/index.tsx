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
    background: #14693f linear-gradient(75deg, #051b14, #0c3628 55%);
`;

const Title = styled(Typography)`
    color: #28312b;
    font-family: "Permanent Marker", cursive;
    text-shadow: 0 0 3px #e0ebe4, 0 0 5px #c8ddd0, 0 0 11px #d9e7de, 0 0 17px #87c59f, 0 0 25px #357e51;
`;

const NotFoundPage: React.FC = () => {
    return (
        <Container>
            <Title variant="h2" color="white">
                404 NOT FOUND
            </Title>
            <Title variant="h5" fontWeight={500} color="textSecondary">
                The requested page could not be found.
            </Title>
        </Container>
    );
};

export default NotFoundPage;
