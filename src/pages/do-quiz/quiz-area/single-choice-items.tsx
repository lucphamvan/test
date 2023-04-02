import { Answer } from "@/types/quiz";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ChoiceItem from "./single-choice-item";

interface Props {
    questionAnswer?: Answer;
    updateSelectedChoices: (index: number, selected_choice_ids: string[]) => void;
    currentIndex: number;
}
const SingleChoiceItems = ({ questionAnswer, currentIndex, updateSelectedChoices }: Props) => {
    const [selectedChoiceIds, setSelectedChoiceIds] = useState(questionAnswer?.selected_choice_ids.at(0));

    useEffect(() => {
        setSelectedChoiceIds(questionAnswer?.selected_choice_ids.at(0));
    }, [questionAnswer]);

    const handleSelectAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedChoiceIds(event.target.value);
        updateSelectedChoices(currentIndex, [event.target.value]);
    };

    if (!questionAnswer?.choices) return null;

    return (
        <Box>
            {questionAnswer?.choices?.map((choice) => {
                return (
                    <ChoiceItem
                        key={choice.id}
                        choice={choice}
                        selectedValue={selectedChoiceIds}
                        handleSelectAnswer={handleSelectAnswer}
                    />
                );
            })}
        </Box>
    );
};
export default SingleChoiceItems;
