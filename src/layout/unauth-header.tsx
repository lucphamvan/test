import styled from "@emotion/styled";
import { Container } from "@mui/material";

import { Flex } from "@/components";
import { APP_NAME } from "@/config/const";
import { ROUTE } from "@/config/route";
import { useNavigate } from "react-router-dom";

// outer container with full width
const OuterContainer = styled.div`
    height: 48px;
    background-color: #1ba94c;
    background: #14693f linear-gradient(90deg, #051b14, #1a5531 15%, #1a553e 35%, #051b14 50%);
    display: flex;
    align-items: center;
`;

const Logo = styled.div`
    color: #28312b;
    font-size: 20px;
    cursor: pointer;
    font-weight: 600;
    font-family: "Permanent Marker", cursive;
    text-shadow: 0 0 3px #e0ebe4, 0 0 5px #c8ddd0, 0 0 11px #d9e7de, 0 0 17px #87c59f, 0 0 25px #357e51;
`;

const UnauthHeader = () => {
    const navigate = useNavigate();

    const goHomePage = () => {
        navigate(ROUTE.HOME);
    };

    return (
        <>
            <OuterContainer>
                <Container maxWidth="lg">
                    <Flex gap="1rem" justifyContent="space-between">
                        <Logo onClick={goHomePage}>{APP_NAME}</Logo>
                    </Flex>
                </Container>
            </OuterContainer>
        </>
    );
};
export default UnauthHeader;
