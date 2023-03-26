import styled from "@emotion/styled";
import Content from "./content";
import UnauthHeader from "./unauth-header";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const AuthLayout = () => {
    return (
        <Container>
            <UnauthHeader />
            <Content />
        </Container>
    );
};

export default AuthLayout;
