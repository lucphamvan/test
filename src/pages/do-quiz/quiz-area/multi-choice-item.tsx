import { Flex, Label } from "@/components";
import { Choice } from "@/types/question";
import { Checkbox } from "@mui/material";
import { memo } from "react";

interface ChoiceItemProps {
    choice: Choice;
    handleSelectAnswer: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedChoiceIds: string[];
}
const ChoiceItem = ({ choice, handleSelectAnswer, selectedChoiceIds }: ChoiceItemProps) => {
    return (
        <Flex>
            <Checkbox
                checked={selectedChoiceIds?.includes(choice.id)}
                id={`choice-${choice.id}`}
                value={choice.id}
                onChange={handleSelectAnswer}
            />
            <Label htmlFor={`choice-${choice.id}`}>{choice.content}</Label>
        </Flex>
    );
};

export default memo(ChoiceItem);
