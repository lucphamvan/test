import { Flex } from "@/components";
import { QuizAnswerInfo } from "@/types/quiz";
import { Box, Button, Stack, Typography } from "@mui/material";
import { StyledHeading, StyledInfoCard } from "./index.styled";

interface InfoItemProps {
    label: string;
    value?: string | number;
}
const InfoItem = ({ label, value }: InfoItemProps) => {
    return (
        <Flex gap="4rem" justifyContent="space-between">
            <span>{label}</span>
            <Box fontWeight={500}>{value}</Box>
        </Flex>
    );
};

interface InfoCardProps {
    quizInfo?: QuizAnswerInfo;
    onStartQuiz: () => void;
}
const InfoCard = ({ quizInfo, onStartQuiz }: InfoCardProps) => {
    return (
        <StyledInfoCard>
            <Stack spacing="4px">
                <StyledHeading>WELCOME TO {quizInfo?.quiz_setting?.name}</StyledHeading>
                <Typography variant="body2" textAlign="center" color="text.secondary">
                    Before we start, here is some extra information you need check
                </Typography>
            </Stack>
            <Stack spacing="0.5rem">
                <InfoItem label="Email" value={quizInfo?.email} />
                <InfoItem label="Duration" value={quizInfo?.quiz_setting.duration + " minutes"} />
            </Stack>
            <Button variant="contained" className="w-120" onClick={onStartQuiz}>
                Let Start
            </Button>
        </StyledInfoCard>
    );
};

export default InfoCard;
