import { Flex } from "@/components";
import { useDisclosure } from "@/hook/useDisclosure";
import { Choice, Question } from "@/types/question";
import { Collapse, Stack } from "@mui/material";
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
    const backgroundColor = choice.isCorrect ? "#1A5532" : "#D8EBD9";
    const color = choice.isCorrect ? "#fff" : "#1A5532";
    return (
        <ChoiceWrapper onClick={(e) => e.stopPropagation()}>
            <NumberWrapper style={{ backgroundColor, color }}>{char}</NumberWrapper>
            <ChoiceContent>{choice.content}</ChoiceContent>
        </ChoiceWrapper>
    );
};

interface QuestionItemProp {
    question: Question;
    index: number;
    setRemoveQuestionId: Function;
    showRemoveDialog: () => void;
    onOpenQuestionForm: () => void;
}
const QuestionItem = React.memo(
    ({ question, index, setRemoveQuestionId, showRemoveDialog, onOpenQuestionForm }: QuestionItemProp) => {
        const { isOpen: isExpand, onToggle: onToggleExpand } = useDisclosure();
        const { setCurrentQuestion } = useContext(QuizContext);
        question.choices.forEach((c) => (c.isCorrect = question.correct_choice_ids.includes(c.id)));

        const renderListChoice = () => {
            const list = question.choices.map((choice, index) => {
                return <ChoiceItem choice={choice} index={index} key={`choice-${choice.id}`} />;
            });
            return <Stack gap="0.25rem">{list}</Stack>;
        };

        const onExpandBtnClick = useCallback(() => {
            onToggleExpand();
        }, [onToggleExpand]);

        const onEditBtnClick = useCallback(() => {
            setCurrentQuestion(question);
            onOpenQuestionForm();
        }, [setCurrentQuestion, question]);

        const onRemoveBtnClick = useCallback(() => {
            setRemoveQuestionId(question.id);
            showRemoveDialog();
        }, [setRemoveQuestionId, question.id, showRemoveDialog]);

        return (
            <QuestionWrapper onClick={onExpandBtnClick}>
                <QuestionItemActions onExpand={onExpandBtnClick} onEdit={onEditBtnClick} onRemove={onRemoveBtnClick} />
                <Flex style={{ alignItems: "baseline" }}>
                    <QuestionContent>
                        {index + 1}.&nbsp; {question.content}
                    </QuestionContent>
                </Flex>
                <Collapse in={isExpand}>{renderListChoice()}</Collapse>
            </QuestionWrapper>
        );
    }
);

export default React.memo(QuestionItem);
