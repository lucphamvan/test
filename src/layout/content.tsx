import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Content = () => {
    return (
        <Container maxWidth="lg" sx={{ flexGrow: 1, paddingY: "1rem", display: "flex", flexDirection: "column" }}>
            <Outlet />
        </Container>
    );
};

export default Content;
