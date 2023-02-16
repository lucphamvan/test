import { Avatar as MuiAvatar, AvatarProps } from "@mui/material";

// create a function that returns a random color from string
const stringToColor = (string: string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
};

// create a function that returns first letter of first word and last word in string
const getInitials = (name: string) => {
    const splitName = name.split(" ");
    if (splitName.length > 1) {
        return `${splitName[0][0]}${splitName[splitName.length - 1][0]}`;
    }
    return splitName[0][0];
};

// create a new component that extends the MuiAvatar component include name property
interface Props extends AvatarProps {
    name: string;
}

export const Avatar = (props: Props) => {
    const { name, ...rest } = props;
    const bgColor = stringToColor(name);
    return (
        <MuiAvatar {...rest} sx={{ backgroundColor: bgColor, width: 30, height: 30 }}>
            {getInitials(name)}
        </MuiAvatar>
    );
};
