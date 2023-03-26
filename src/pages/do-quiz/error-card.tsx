import { Dangerous } from "@mui/icons-material";
import { StyledErrorCard } from "./error-card.styled";

const ErrorCard = () => {
    return (
        <StyledErrorCard>
            <div className="heading">ERROR</div>
            <Dangerous style={{ fontSize: 100 }} className="color-danger" />
            <div className="message">Your input code is invalid</div>
        </StyledErrorCard>
    );
};

export default ErrorCard;
