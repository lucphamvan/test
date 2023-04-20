import { StyledInfoCard } from "./index.styled";

interface Props {
    message: string;
}
const InfoCard = ({ message }: Props) => {
    return (
        <StyledInfoCard>
            <div className="message s-font">{message}</div>
            <div className="message s-font">thank you</div>
        </StyledInfoCard>
    );
};

export default InfoCard;
