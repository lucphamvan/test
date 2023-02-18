import { DragContext, TooltipBody } from "@/components";
import { Choice, CreateQuestionInput } from "@/types/question";
import { Bolt, DragIndicator, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { Checkbox, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Controller, UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { ChoiceBox, ChoiceWrapper, Input } from "./styled";

interface Props {
    item: Choice;
    index: number;
    form: UseFormReturn<CreateQuestionInput, any>;
    fieldArray: UseFieldArrayReturn<CreateQuestionInput, "choices", "id">;
}

const ChoiceItem = ({ item, index, form, fieldArray }: Props) => {
    const error = form.formState.errors?.choices
        ? Boolean(form.formState.errors.choices[index]?.content?.message)
        : false;
    // const visibleDelBtn = fieldArray.fields.length > 1;
    return (
        <DragContext key={item.id} id={item.id} index={index}>
            <ChoiceWrapper>
                {/* drag icon */}
                <div className="drag-btn">
                    <Tooltip
                        enterDelay={400}
                        placement="top"
                        arrow
                        title={<TooltipBody>Click and drag to move</TooltipBody>}
                    >
                        <DragIndicator style={{ color: "#6e7375" }} />
                    </Tooltip>
                </div>
                {/* body answer */}
                <ChoiceBox icon={false}>
                    <Stack flexDirection="row" alignItems="center" gap="0.5rem">
                        <Input
                            {...form.register(`choices.${index}.content`)}
                            fullWidth
                            placeholder={`Answer ${index + 1}`}
                            error={error}
                        />
                        <Controller
                            name={`choices.${index}.isCorrect`}
                            control={form.control}
                            defaultValue={item.isCorrect}
                            render={({ field: { value, ref, ...props } }) => (
                                <Checkbox
                                    {...props}
                                    inputRef={ref}
                                    checked={!!value}
                                    icon={<RadioButtonUnchecked />}
                                    checkedIcon={<RadioButtonChecked />}
                                />
                            )}
                        />
                    </Stack>
                    {/* errors */}
                    <Typography fontSize={12} mt="0.25rem" color="error" fontWeight="400">
                        {form.formState.errors?.choices && form.formState.errors.choices[index]?.content?.message}
                    </Typography>
                </ChoiceBox>
                {/* delete icon */}

                <div className="delete-btn">
                    <Tooltip placement="top" arrow title={<TooltipBody>Delete</TooltipBody>}>
                        <Bolt onClick={() => fieldArray.remove(index)} style={{ color: "#6e7375" }} />
                    </Tooltip>
                </div>
            </ChoiceWrapper>
        </DragContext>
    );
};

export default React.memo(ChoiceItem);
