import { Flex } from "@/components";
import { useDisclosure } from "@/hook/useDisclosure";
import { Question } from "@/types/question";
import { DoneAll as CorrectIcon, Visibility } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";
import { AnswerContent, Box, QuestionBox, Title } from "./view-action.styled";

interface Props {
    question: Question;
}

const ViewAction = ({ question }: Props) => {
    const { isOpen, onClose, onToggle } = useDisclosure();

    const listAnswers = question?.choices?.map((option, index) => {
        const isCorrect = question?.correct_choice_ids?.includes(option?.id);
        const color = isCorrect ? "success" : "info";
        return (
            <Box key={option.id} color={color} icon={false}>
                <Flex width="100%">
                    <AnswerContent>{`${index + 1}.` + option?.content}</AnswerContent>
                    {isCorrect && <CorrectIcon color="success" />}
                </Flex>
            </Box>
        );
    });

    return (
        <>
            <IconButton children={<Visibility />} onClick={onToggle} />
            <Dialog fullWidth open={isOpen} onClose={onClose}>
                <DialogTitle>Question</DialogTitle>
                <DialogContent>
                    <Stack gap="0.5rem">
                        <QuestionBox multiline disabled value={question.content} />
                        <Title>Answer</Title>
                        {listAnswers}
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
};
export default ViewAction;
