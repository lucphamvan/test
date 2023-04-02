import { Answer } from "@/types/quiz";
import { Box } from "@mui/material";
import ChoiceItem from "./multi-choice-item";

interface Props {
    questionAnswer?: Answer;
    updateSelectedChoices: (index: number, selected_choice_ids: string[]) => void;
    currentIndex: number;
}
const MultiChoiceItems = ({ questionAnswer, updateSelectedChoices, currentIndex }: Props) => {
    const handleSelectAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelectedChoiceIds = [...(questionAnswer?.selected_choice_ids ?? []), event.target.value];
            updateSelectedChoices(currentIndex, newSelectedChoiceIds);
        } else {
            const newSelectedChoiceIds = questionAnswer?.selected_choice_ids?.filter((id) => id !== event.target.value);
            updateSelectedChoices(currentIndex, newSelectedChoiceIds ?? []);
        }
    };

    if (!questionAnswer?.choices) return null;

    return (
        <Box>
            {questionAnswer?.choices.map((choice, index) => {
                return (
                    <ChoiceItem
                        key={`choice-${choice.id}`}
                        choice={choice}
                        selectedChoiceIds={questionAnswer.selected_choice_ids}
                        handleSelectAnswer={handleSelectAnswer}
                    />
                );
            })}
        </Box>
    );
};
export default MultiChoiceItems;
