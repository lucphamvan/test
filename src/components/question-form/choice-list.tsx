import { CreateQuestionInput } from "@/types/question";
import React, { useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { DndContext } from "../dnd-context";
import ChoiceItem from "./choice-item";

interface Props {
    form: UseFormReturn<CreateQuestionInput, any>;
    fieldArray: UseFieldArrayReturn<CreateQuestionInput, "choices", "id">;
}

const ChoiceList = ({ form, fieldArray }: Props) => {
    // drag end : save answer was reordered
    const handleDragEnd = useCallback(
        ({ source, destination }: DropResult) => {
            if (destination) {
                fieldArray.move(source.index, destination.index);
            }
        },
        [fieldArray]
    );

    // render list choices
    const renderListChoice = useCallback(() => {
        return fieldArray.fields.map((choice, index) => {
            return (
                <ChoiceItem item={choice} index={index} form={form} fieldArray={fieldArray} key={`choice-${index}`} />
            );
        });
    }, [fieldArray, form]);

    // render
    return (
        <DndContext id="choices-list" onDragEnd={handleDragEnd}>
            {renderListChoice()}
        </DndContext>
    );
};
export default React.memo(ChoiceList);
