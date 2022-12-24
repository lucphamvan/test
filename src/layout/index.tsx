import styled from "@emotion/styled";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Layout = () => {
    return (
        <Container>
            <Header />
            <Content />
            <Footer />
        </Container>
    );
};

export default Layout;
