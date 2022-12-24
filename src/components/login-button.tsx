import styled from "@emotion/styled";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";

const StyledButton = styled(Button)`
    color: #d5e7dd;
`;

const LoginButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onToggle = () => setIsOpen((value) => !value);

    return (
        <Stack direction="row" spacing="0.75rem">
            <StyledButton variant="outlined" size="small" onClick={onToggle}>
                Login
            </StyledButton>
            <StyledButton variant="outlined" size="small">
                Sign up
            </StyledButton>
            <Dialog maxWidth="xs" fullWidth open={isOpen}>
                <DialogTitle fontSize="1.25rem" sx={{ paddingBottom: 0 }} color="primary" fontWeight="bold">
                    LOGIN
                </DialogTitle>
                <DialogContent>
                    <Stack paddingY="1rem" spacing="1.5rem">
                        <TextField size="small" label="Email" fullWidth />
                        <TextField size="small" label="Password" type="password" fullWidth />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onToggle}>Cancel</Button>
                    <Button onClick={onToggle}>Login</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

export default LoginButton;
