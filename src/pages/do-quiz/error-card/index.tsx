import { StyledErrorCard } from "./index.styled";

const ErrorCard = ({ errorMessage }: { errorMessage: string }) => {
    return (
        <StyledErrorCard>
            {/* <div className="heading">ERROR</div> */}
            <div className="message s-font">{errorMessage}</div>
        </StyledErrorCard>
    );
};

export default ErrorCard;
