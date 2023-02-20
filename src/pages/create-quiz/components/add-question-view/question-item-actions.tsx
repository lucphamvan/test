import { Flex } from "@/components";
import styled from "@emotion/styled";
import { Delete, Edit, ExpandMore } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Wrapper = styled(Flex)`
    gap: 0.5rem;
    position: absolute;
    top: 0.75rem;
    right: 1rem;
`;

interface QuestionItemActionsProp {
    onExpand: () => void;
    onEdit: () => void;
}
const QuestionItemActions = ({ onExpand, onEdit }: QuestionItemActionsProp) => {
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
        onExpand();
    };

    return (
        <Wrapper>
            <IconButton size="small" className="action-btn" onClick={handleEdit}>
                <Edit sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton size="small" className="action-btn" onClick={handleDetele}>
                <Delete sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton size="small" className="action-btn" onClick={handleExpand}>
                <ExpandMore sx={{ fontSize: 16 }} />
            </IconButton>
        </Wrapper>
    );
};

export default QuestionItemActions;
