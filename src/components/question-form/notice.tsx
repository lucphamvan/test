import { Alert, Stack } from "@mui/material";

const Notice = () => {
    return (
        <Alert icon={false} style={{ padding: 0 }}>
            <ul>
                <Stack gap="0.5rem">
                    <li>
                        <div>Use radio button to set your correct answer</div>
                    </li>
                    <li>
                        <div>Support multiple correct answers</div>
                    </li>
                </Stack>
            </ul>
        </Alert>
    );
};

export default Notice;
