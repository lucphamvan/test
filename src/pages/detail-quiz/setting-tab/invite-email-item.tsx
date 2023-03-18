import { Flex } from "@/components";
import { removeInvitedEmail } from "@/services/quiz.service";
import { InvitedEmail } from "@/types/quiz";
import { Clear } from "@mui/icons-material";
import { Box, Grid, IconButton } from "@mui/material";
import React from "react";

interface InviteEmailItemProps {
    invitedEmail: InvitedEmail;
    onTriggerRefetch: () => void;
}

const InviteEmailItem = ({ invitedEmail, onTriggerRefetch }: InviteEmailItemProps) => {
    // on remove invited email
    const onRemove = async () => {
        try {
            await removeInvitedEmail(invitedEmail.quiz_id, invitedEmail.email);
            onTriggerRefetch();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid item xs={12} md={6} lg={4}>
            <Flex justifyContent="space-between" padding="0.25rem 0.5rem" borderRadius="2px" bgcolor="#bad1d130">
                <Box>{invitedEmail.email}</Box>
                <IconButton size="small" onClick={onRemove}>
                    <Clear style={{ fontSize: "14px", color: "#143127" }} />
                </IconButton>
            </Flex>
        </Grid>
    );
};

export default React.memo(InviteEmailItem);
