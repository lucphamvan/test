import { QuizAnswerInfo } from "@/types/quiz";
import moment from "moment";
import { StyledInfoCard } from "./info-card.styled";

interface Props {
    quizInfo?: QuizAnswerInfo;
}

const InfoCard = ({ quizInfo }: Props) => {
    return (
        <StyledInfoCard>
            <div className="heading">{quizInfo?.quiz_setting.name}</div>
            <div>Duration : {quizInfo?.quiz_setting.duration}</div>
            <div>Email : {quizInfo?.email}</div>
            <div>End at : {moment(quizInfo?.quiz_setting.end_time).calendar()}</div>
        </StyledInfoCard>
    );
};

export default InfoCard;
