import styled from "@emotion/styled";
import { List, ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { MenuItem } from "../config";

const Link = styled(NavLink)`
    font-size: 1.2rem;
    font-weight: 700;

    font-family: "Permanent Marker", cursive;
    color: #aeb8b3 !important;

    &.active {
        font-weight: 700;
        color: #151816 !important;
        text-shadow: 0 0 3px #e0ebe4, 0 0 5px #c8ddd0, 0 0 11px #d9e7de, 0 0 17px #87c59f, 0 0 25px #357e51;
    }
`;

interface MenuProps {
    menu: MenuItem[];
    onClose: () => void;
}

const Menu = (props: MenuProps) => {
    const { menu, onClose } = props;
    return (
        <List>
            {menu.map((item) => (
                <ListItemButton key={item.text} component={Link} to={item.link} onClick={onClose}>
                    {item.text}
                </ListItemButton>
            ))}
        </List>
    );
};
export default Menu;
