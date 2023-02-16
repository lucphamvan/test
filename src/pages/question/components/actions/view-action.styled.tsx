import { FullSizeAlert } from "@/components";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const Title = styled.div`
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.6;
    font-family: "Oswald", sans-serif;
`;

export const Box = styled(FullSizeAlert)`
    padding: 1rem;
    font-size: 14px;
`;

export const AnswerContent = styled.div`
    width: 100%;
`;

export const QuestionBox = styled(TextField)`
    .Mui-disabled {
        -webkit-text-fill-color: #143127 !important;
    }
`;
