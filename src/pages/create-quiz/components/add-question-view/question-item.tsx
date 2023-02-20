import { Flex } from "@/components";
import { useDisclosure } from "@/hook/useDisclosure";
import { Choice, Question } from "@/types/question";
import { Box, Collapse, Stack } from "@mui/material";
import React, { useCallback, useContext } from "react";
import { QuizContext } from "../..";
import QuestionItemActions from "./question-item-actions";
import { ChoiceContent, ChoiceWrapper, NumberWrapper, QuestionContent, QuestionWrapper } from "./question-item.styled";

interface ChoiceItemProp {
    choice: Choice;
    index: number;
}
const ChoiceItem = ({ choice, index }: ChoiceItemProp) => {
    const char = String.fromCharCode(97 + index);
    const bgColor = choice.isCorrect ? "#86c986" : "#e0ebe0";
    return (
        <ChoiceWrapper icon={false} correct={choice.isCorrect}>
            <Flex gap="0.5rem">
                <NumberWrapper bgcolor={bgColor}>{char}</NumberWrapper>
                <ChoiceContent>{choice.content}</ChoiceContent>
            </Flex>
        </ChoiceWrapper>
    );
};

interface QuestionItemProp {
    question: Question;
    index: number;
}
const QuestionItem = React.memo(({ question, index }: QuestionItemProp) => {
    const { isOpen, onToggle } = useDisclosure();
    const { setCurrentQuestion } = useContext(QuizContext);
    question.choices.forEach((c) => (c.isCorrect = question.correct_choice_ids.includes(c.id)));

    const renderListChoice = () => {
        const list = question.choices.map((choice, index) => {
            return <ChoiceItem choice={choice} index={index} key={`choice-${choice.id}`} />;
        });
        return <Stack gap="0.25rem">{list}</Stack>;
    };

    const onExpand = useCallback(() => onToggle(), [onToggle]);

    const onEdit = useCallback(() => {
        setCurrentQuestion(question);
    }, [setCurrentQuestion, question]);

    return (
        <QuestionWrapper onClick={onExpand}>
            <QuestionItemActions onExpand={onExpand} onEdit={onEdit} />
            <Flex>
                <Box>{index + 1}.</Box>
                <QuestionContent>{question.content}</QuestionContent>
            </Flex>
            <Collapse in={isOpen}>{renderListChoice()}</Collapse>
        </QuestionWrapper>
    );
});

export default React.memo(QuestionItem);
