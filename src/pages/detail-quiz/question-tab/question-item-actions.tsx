import { Flex } from "@/components";
import styled from "@emotion/styled";
import { Delete, Edit, ExpandMore } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { QuizContext } from "..";

const Wrapper = styled(Flex)`
    gap: 0.5rem;
    position: absolute;
    top: -0.75rem;
    right: 1rem;
    background-color: #f9ffff;
`;

interface QuestionItemActionsProp {
    onExpand: () => void;
    onEdit: () => void;
    onRemove: () => void;
}
const QuestionItemActions = ({ onExpand, onEdit, onRemove }: QuestionItemActionsProp) => {
    const { quiz } = useContext(QuizContext);

    const handleExpand = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onExpand();
    };

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onEdit();
    };

    const handleDetele = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onRemove();
    };

    return (
        <Wrapper>
            {!quiz.published && (
                <IconButton size="small" className="action-btn" onClick={handleEdit}>
                    <Edit sx={{ fontSize: 16, color: "#1A5532" }} />
                </IconButton>
            )}
            {!quiz.published && (
                <IconButton size="small" className="action-btn" onClick={handleDetele}>
                    <Delete sx={{ fontSize: 16, color: "#1A5532" }} />
                </IconButton>
            )}
            <IconButton size="small" className="action-btn" onClick={handleExpand}>
                <ExpandMore sx={{ fontSize: 16, color: "#1A5532" }} />
            </IconButton>
        </Wrapper>
    );
};

export default QuestionItemActions;
