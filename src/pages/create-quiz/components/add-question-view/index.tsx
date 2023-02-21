import { Flex } from "@/components";
import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useRef } from "react";
import { QuizContext } from "../..";
import { genQuestion } from "../../helper";
import AddQuestion from "./add-question";
import QuestionList from "./question-list";

interface Props {
    goNextStep: () => void;
    goPreviousStep: () => void;
}

const AddQuestionView = ({ goNextStep, goPreviousStep }: Props) => {
    const { setCurrentQuestion, resetRef } = useContext(QuizContext);
    const ref = useRef<HTMLDivElement>(null);

    const onAddQuestionBtnClick = () => {
        setCurrentQuestion(genQuestion());
        resetRef.current && resetRef.current();
    };

    useEffect(() => {
        let offsetTop = ref.current?.getBoundingClientRect().top || 0;
        let width = ref.current?.getBoundingClientRect().width || 0;
        window.addEventListener("scroll", () => {
            if (ref.current) {
                const offsetLeft = ref.current.getBoundingClientRect().left;

                if (window.scrollY > offsetTop && window.innerWidth > 900) {
                    ref.current.style.position = "fixed";
                    ref.current.style.top = "0px";
                    ref.current.style.left = offsetLeft + "px";
                    ref.current.style.paddingTop = "0px";
                    ref.current.style.width = width + "px";
                    return;
                } else {
                    ref.current.style.position = "static";
                    ref.current.style.paddingTop = "1rem";
                }
            }
        });
        return () => {
            window.removeEventListener("scroll", () => {});
        };
    }, [ref]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 900 && ref.current) {
                ref.current.style.position = "static";
            }
        });
        return () => {
            window.removeEventListener("resize", () => {});
        };
    }, [ref]);

    return (
        <Grid container spacing="1rem">
            <Grid item xs={12} md={6}>
                <QuestionList />
            </Grid>
            <Grid item xs={12} md={6} ref={ref}>
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
                    <AddQuestion />
                </Stack>
            </Grid>
        </Grid>
    );
};

export default React.memo(AddQuestionView);
