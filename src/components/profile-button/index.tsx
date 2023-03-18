import { SmallButton } from "@/components";
import { ACC_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/config/const";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearSession } from "@/redux/slice/authen.slice";
import styled from "@emotion/styled";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledMenu = styled(Menu)`
    .MuiMenu-paper {
        min-width: 10rem;
        border-radius: 2px;
        margin-top: 2px;
    }
    .MuiMenu-list {
        padding: 0;
    }
`;

const StyledMenuItem = styled(MenuItem)`
    font-size: 13px;
`;

const ProfileButton = () => {
    const { isAuthen, user } = useAppSelector((state) => state.authen);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const open = Boolean(anchor);

    const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    };

    const onMenuClose = () => {
        setAnchor(null);
    };

    const login = () => {
        navigate("/login");
    };

    const onLogout = () => {
        localStorage.removeItem(ACC_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        dispatch(clearSession());
        onMenuClose();
        navigate("/");
    };

    if (!isAuthen) {
        return <SmallButton onClick={login}>Login</SmallButton>;
    }

    return (
        <div>
            <SmallButton
                onClick={onMenuClick}
                variant="text"
                startIcon={<Avatar sx={{ width: 16, height: 16 }}></Avatar>}
                endIcon={<KeyboardArrowDown />}
            >
                {user?.name}
            </SmallButton>
            <StyledMenu open={open} onClose={onMenuClose} anchorEl={anchor}>
                <StyledMenuItem>View Profile</StyledMenuItem>
                <StyledMenuItem>Account Detail</StyledMenuItem>
                <StyledMenuItem onClick={onLogout}>Logout</StyledMenuItem>
            </StyledMenu>
        </div>
    );
};

export default ProfileButton;
