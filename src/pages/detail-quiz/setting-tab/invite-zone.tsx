import { Card, Flex, Heading } from "@/components";
import { useDisclosure } from "@/hook/useDisclosure";
import { getInvitedEmails } from "@/services/quiz.service";
import { InvitedEmail, Quiz } from "@/types/quiz";
import { UnfoldMoreDouble } from "@mui/icons-material";
import { Box, Button, Collapse, Divider, Grid, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import InviteDialog from "./invite-dialog";
import InviteEmailItem from "./invite-email-item";

interface Props {
    quiz: Quiz;
    setQuiz: React.Dispatch<React.SetStateAction<Quiz | undefined>>;
}
const InviteZone = ({ quiz, setQuiz }: Props) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { isOpen: isExpanded, onToggle: onToggleCollapsed } = useDisclosure();
    const [invitedEmails, setInvitedEmails] = useState<InvitedEmail[]>([]);
    const [triggerRefetch, setTriggerRefetch] = useState<boolean>(false);

    const onTriggerRefetch = useCallback(() => {
        setTriggerRefetch((prev) => !prev);
    }, []);

    useEffect(() => {
        const fetchInvitedEmails = async () => {
            try {
                const _invitedEmails = await getInvitedEmails(quiz.id);
                setInvitedEmails(_invitedEmails);
            } catch (error) {
                console.log(error);
            }
        };
        fetchInvitedEmails();
    }, [quiz.id, triggerRefetch]);

    return (
        <>
            {quiz.published && (
                <>
                    <Card px="2rem" py="1.5rem">
                        {/* invite zone */}
                        <Stack>
                            <Flex justifyContent="space-between">
                                <Box>
                                    <Heading>Invite</Heading>
                                    <Typography variant="body2" color="text.secondary">
                                        Invite students to take the quiz
                                    </Typography>
                                </Box>
                                <Button variant="contained" className="w-120" onClick={onOpen}>
                                    Invite
                                </Button>
                            </Flex>
                        </Stack>

                        {/*display list invited emails */}
                        {!!invitedEmails?.length && (
                            <>
                                <br />
                                <Divider>
                                    <IconButton size="small" onClick={onToggleCollapsed} color="primary">
                                        <UnfoldMoreDouble />
                                    </IconButton>
                                </Divider>
                                <Collapse in={isExpanded}>
                                    <Stack gap="0.5rem">
                                        <br />
                                        <Heading>Invited List</Heading>
                                        <Grid container spacing="0.5rem">
                                            {invitedEmails?.map((invitedEmail) => (
                                                <InviteEmailItem
                                                    key={invitedEmail.id}
                                                    invitedEmail={invitedEmail}
                                                    onTriggerRefetch={onTriggerRefetch}
                                                />
                                            ))}
                                        </Grid>
                                    </Stack>
                                </Collapse>
                            </>
                        )}
                    </Card>

                    {/* invite dialog */}
                    <InviteDialog quiz={quiz} isOpen={isOpen} onClose={onClose} onTriggerRefetch={onTriggerRefetch} />
                </>
            )}
        </>
    );
};
export default InviteZone;
