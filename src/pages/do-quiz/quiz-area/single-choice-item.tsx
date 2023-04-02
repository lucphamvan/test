import { Flex, Label } from "@/components";
import { Choice } from "@/types/question";
import { Radio } from "@mui/material";

interface ChoiceItemProps {
    choice: Choice;
    selectedValue?: string;
    handleSelectAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChoiceItem = ({ choice, selectedValue, handleSelectAnswer }: ChoiceItemProps) => {
    return (
        <Flex>
            <Radio
                checked={selectedValue === choice.id}
                onChange={handleSelectAnswer}
                value={choice.id}
                id={`choice-${choice.id}`}
            />
            <Label htmlFor={`choice-${choice.id}`}>{choice.content}</Label>
        </Flex>
    );
};

export default ChoiceItem;
