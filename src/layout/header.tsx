import styled from "@emotion/styled";
import { Container, Stack } from "@mui/material";
import { Log } from "components";

const HeaderContainer = styled.div`
    height: 40px;
    background-color: #1ba94c;
    background: #14693f linear-gradient(90deg, #051b14, #1a5531 15%, #1a553e 35%, #051b14 50%);
    display: flex;
    align-items: center;
`;

const Logo = styled.h3`
    color: #fff;
    font-size: 18px;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Container maxWidth="xl">
                <Stack direction="row" spacing="1rem" alignItems="center" justifyContent="space-between">
                    <Logo>QUIZZ APP</Logo>
                    <Log />
                </Stack>
            </Container>
        </HeaderContainer>
    );
};
export default Header;
