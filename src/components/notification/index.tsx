import { NotifyType } from "@/types/general";
import styled from "@emotion/styled";
import { Alert as MuiAlert, Snackbar } from "@mui/material";
import { FC, memo } from "react";

const Alert = styled(MuiAlert)`
    width: 100%;
    font-size: 14px;
    font-weight: 300;
    font-style: italic;
`;

interface Props {
    showNotify: boolean;
    hideNotify: () => void;
    notifyType: NotifyType | undefined;
    notifyMessage: string;
}

const Notification: FC<Props> = (props: Props) => {
    const { showNotify, hideNotify, notifyMessage, notifyType } = props;
    return (
        <Snackbar
            open={showNotify}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            autoHideDuration={3000}
            onClose={hideNotify}
        >
            <Alert variant="filled" severity={notifyType}>
                {notifyMessage}
            </Alert>
        </Snackbar>
    );
};

export default memo(Notification);
