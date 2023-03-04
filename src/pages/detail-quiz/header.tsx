import { Flex } from "@/components";
import styled from "@emotion/styled";
import { Dashboard, QuestionAnswerRounded, Settings } from "@mui/icons-material";
import { Box, Breadcrumbs } from "@mui/material";

const activeColor = "#117a55";

const Menu = styled(Breadcrumbs)`
    font-size: 1.125rem;
    font-weight: 600;
    font-family: "Oswald", sans-serif;
`;

const MenuItem = styled(Flex)`
    gap: 0.5rem;
    cursor: pointer;
    &:hover {
        color: activeColor;
    }
`;

interface HeaderProps {
    tabIndex: number;
    setTabIndex: (index: number) => void;
}

const Header = ({ tabIndex, setTabIndex }: HeaderProps) => {
    return (
        <Menu>
            <MenuItem sx={{ color: tabIndex === 0 ? activeColor : "inherit" }} onClick={() => setTabIndex(0)}>
                <Settings fontSize="small" />
                <Box>Setting</Box>
            </MenuItem>
            <MenuItem sx={{ color: tabIndex === 1 ? activeColor : "inherit" }} onClick={() => setTabIndex(1)}>
                <QuestionAnswerRounded fontSize="small" />
                <Box>Questions</Box>
            </MenuItem>
            <MenuItem sx={{ color: tabIndex === 2 ? activeColor : "inherit" }} onClick={() => setTabIndex(2)}>
                <Dashboard fontSize="small" />
                <Box>Results</Box>
            </MenuItem>
        </Menu>
    );
};
export default Header;
