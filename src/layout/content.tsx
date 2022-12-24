import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Content = () => {
    return (
        <Container maxWidth="xl" sx={{ flexGrow: 1, paddingY: "1rem" }}>
            <Outlet />
        </Container>
    );
};

export default Content;
