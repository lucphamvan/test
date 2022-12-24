import styled from "@emotion/styled";
import { Container } from "@mui/material";

const FooterContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #262626;
    height: 70px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <Container maxWidth="xl"></Container>
        </FooterContainer>
    );
};

export default Footer;
