import { Flex } from "@/components";
import { User } from "@/types/user";
import styled from "@emotion/styled";
import { Logout } from "@mui/icons-material";
import { Avatar as MuiAvatar, Stack } from "@mui/material";

const Name = styled.div`
    font-size: 1.4rem;
    font-weight: 700;
    font-family: "Permanent Marker", cursive;
`;

const Email = styled.div`
    font-weight: 400;
    font-family: "Permanent Marker", cursive;
`;

const ProfileBox = styled(Flex)`
    padding: 1rem;
    gap: 1rem;
    width: 100%;
    color: #aeb8b3 !important;
`;

const Avatar = styled(MuiAvatar)`
    width: 50px;
    height: 50px;
    cursor: pointer;
`;

const InfoBox = styled(Stack)`
    width: 100%;
`;

interface ProfileProps {
    user: User;
    onLogout: () => void;
}

const Profile = (props: ProfileProps) => {
    const { name, email } = props.user;

    // return avatar and name
    return (
        <ProfileBox>
            <Avatar />
            <InfoBox>
                <Flex justifyContent="space-between">
                    <Name>{name}</Name>
                    <Logout fontSize="small" cursor="pointer" htmlColor="#aeb8b3" onClick={props.onLogout} />
                </Flex>
                <Email>{email}</Email>
            </InfoBox>
        </ProfileBox>
    );
};
export default Profile;
