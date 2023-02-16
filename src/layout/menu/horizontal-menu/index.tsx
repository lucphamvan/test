import { Flex, ProfileButton } from "@/components";
import { ROUTE } from "@/config/route";
import { MEDIA_QUERY } from "@/utils/mediaQuery";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const HorizontalMenuBox = styled(Flex)`
    display: none;
    ${MEDIA_QUERY.md} {
        gap: 2rem;
        display: flex;
    }
    ${MEDIA_QUERY.lg} {
        gap: 4rem;
    }
`;

const MenuItem = styled(NavLink)`
    text-decoration: none;
    font-weight: 700;
    color: #aeb8b3;
    font-size: 15px;
    position: relative;
    display: flex;
    align-items: center;
    font-family: "Permanent Marker", cursive;
    box-sizing: content-box;

    // style for active & hover item
    &.active,
    &:hover {
        font-weight: 700;
        color: #151816;
        text-shadow: 0 0 3px #e0ebe4, 0 0 5px #c8ddd0, 0 0 11px #d9e7de, 0 0 17px #87c59f, 0 0 25px #357e51;
    }

    // vertical break-line
    &::after {
        content: "";
        width: 1px;
        height: 1rem;
        background: #97a5a0;
        position: absolute;
        right: -1.5rem;
        bottom: 3px;
    }
    // hide vertical break-line for last item
    &.item-end {
        &::after {
            content: none;
        }
    }
`;

const HorizontalMenu = () => {
    return (
        <HorizontalMenuBox>
            <Flex gap="3rem">
                <MenuItem to={"/" + ROUTE.QUIZ} end>
                    QUIZ
                </MenuItem>
                <MenuItem to={"/" + ROUTE.QUESTION} end>
                    QUESTION
                </MenuItem>
                <MenuItem to="/join-contest" end className="item-end">
                    CALENDAR
                </MenuItem>
            </Flex>
            <ProfileButton />
        </HorizontalMenuBox>
    );
};

export default HorizontalMenu;
