import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
}
// remove dialog component
const RemoveDialog = ({ isOpen, onClose, onAccept }: Props) => {
    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth>
            <DialogTitle>Remove Question</DialogTitle>
            <DialogContent>
                <Box>Are you sure to remove this question ?</Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onAccept}>Accept</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RemoveDialog;
