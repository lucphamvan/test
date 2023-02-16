import { Flex, SmallButton } from "@/components";
import { useDisclosure } from "@/hook/useDisclosure";
import useMediaQuery from "@/hook/useMediaQuery";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearSession } from "@/redux/slice/authen.slice";
import { logOut } from "@/services/authen.service";
import { MEDIA_QUERY, MEDIA_QUERY_STRING } from "@/utils/mediaQuery";
import styled from "@emotion/styled";
import { Avatar, Drawer, Stack } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { menu } from "../config";
import Menu from "./menu";
import Profile from "./profile";

const VerticalMenuBox = styled(Flex)`
    display: flex;
    ${MEDIA_QUERY.md} {
        display: none;
    }
    position: relative;
`;

const DrawerBox = styled(Stack)`
    width: 75vw;
    background: #14693f linear-gradient(75deg, #051b14, #0c3628 55%);
    height: 100%;
`;

const VerticalMenu = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthen, user } = useAppSelector((state) => state.authen);
    const { isOpen, onToggle, onClose } = useDisclosure();

    const isLargerMd = useMediaQuery(MEDIA_QUERY_STRING.md);

    const onLogin = () => {
        navigate("/login");
    };

    const onLogout = () => {
        logOut();
        dispatch(clearSession());
    };

    if (isLargerMd) return null;

    if (!isAuthen) {
        return <SmallButton onClick={onLogin}>Login</SmallButton>;
    }

    return (
        <VerticalMenuBox>
            <Avatar onClick={onToggle} sx={{ width: 30, height: 30, cursor: "pointer" }} />
            <Drawer anchor="left" open={isOpen} onClose={onClose}>
                <DrawerBox>
                    <Profile user={user!} onLogout={onLogout} />
                    <Menu menu={menu} onClose={onClose} />
                </DrawerBox>
            </Drawer>
        </VerticalMenuBox>
    );
};

export default VerticalMenu;
