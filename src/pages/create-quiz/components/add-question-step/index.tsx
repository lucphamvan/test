import { Flex } from "@/components";
import { useDisclosure } from "@/hook/useDisclosure";
import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { QuizContext } from "../..";
import { genQuestion } from "../../helper";
import AddQuestionForm from "./question-form";
import QuestionList from "./question-list";

interface Props {
    goNextStep: () => void;
    goPreviousStep: () => void;
}

const AddQuestionStep = ({ goNextStep, goPreviousStep }: Props) => {
    const { setCurrentQuestion, resetRef } = useContext(QuizContext);
    const { isOpen: isOpenQuestionForm, onOpen: onOpenQuestionForm, onClose: onCloseQuestionForm } = useDisclosure();

    // refs
    const rightRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);

    const onAddQuestionBtnClick = () => {
        setCurrentQuestion(genQuestion());
        onOpenQuestionForm();
        resetRef.current && resetRef.current();
    };

    const handleRightGridPosition = useCallback(
        (offsetTop: number) => {
            if (!rightRef.current || !leftRef.current) return;
            const bounding = leftRef.current.getBoundingClientRect();
            const width = bounding.width || 0;
            const offsetLeft = bounding.left + bounding.width || 0;
            if (window.scrollY > offsetTop && window.innerWidth > 900) {
                rightRef.current.style.position = "fixed";
                rightRef.current.style.top = "0%";
                // rightRef.current.style.transform = "translateY(-50%)";
                rightRef.current.style.left = offsetLeft + "px";
                rightRef.current.style.width = width + "px";
                rightRef.current.style.transition = "top 2s ease";
            } else {
                rightRef.current.style.position = "static";
                // rightRef.current.style.transform = "translateY(0%)";
                rightRef.current.style.transition = "top 2s ease";
            }
        },
        [rightRef, leftRef]
    );

    useEffect(() => {
        // the original distance between the top of the left and right grid
        const offsetTop = leftRef.current?.getBoundingClientRect().top || 0;
        window.addEventListener("scroll", () => {
            handleRightGridPosition(offsetTop);
        });
        window.addEventListener("resize", () => {
            handleRightGridPosition(offsetTop);
        });
        return () => {
            window.removeEventListener("scroll", () => {});
            window.removeEventListener("resize", () => {});
        };
    }, [rightRef, leftRef, handleRightGridPosition]);

    return (
        <Grid container spacing="1rem">
            <Grid item xs={12} md={6} ref={leftRef}>
                <QuestionList onOpenQuestionForm={onOpenQuestionForm} />
            </Grid>
            <Grid item xs={12} md={6} ref={rightRef} sx={{ top: 0 }}>
                <Stack gap="1rem">
                    <Button variant="contained" onClick={() => {}}>
                        Preview
                    </Button>
                    <Flex gap="1rem">
                        <Button sx={{ flexGrow: 1 }} variant="outlined" onClick={goPreviousStep}>
                            Back
                        </Button>
                        <Button sx={{ flexGrow: 1 }} variant="outlined" onClick={goNextStep}>
                            Next
                        </Button>
                    </Flex>
                    <Button variant="outlined" onClick={onAddQuestionBtnClick}>
                        Add question
                    </Button>
                    {isOpenQuestionForm && <AddQuestionForm onCloseQuestionForm={onCloseQuestionForm} />}
                </Stack>
            </Grid>
        </Grid>
    );
};

export default React.memo(AddQuestionStep);
