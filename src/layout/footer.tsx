import styled from "@emotion/styled";
import { Container } from "@mui/material";

const FooterContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #020803;
    height: 40px;
    color: #c5c5c5;
    text-align: center;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <Container maxWidth="lg">2022 Kun.Ltd.. Copyright</Container>
        </FooterContainer>
    );
};

export default Footer;
