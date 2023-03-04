import { Quiz } from "@/types/quiz";
import { Stack } from "@mui/material";
import InviteZone from "./invite-zone";
import DeleteZone from "./delete-zone";
import GeneralSetting from "./general-setting";
import PublishZone from "./publish-zone";

interface Props {
    quiz: Quiz;
    setQuiz: React.Dispatch<React.SetStateAction<Quiz | undefined>>;
}
const SettingTab = ({ quiz, setQuiz }: Props) => {
    return (
        <Stack gap="2rem">
            <GeneralSetting quiz={quiz} setQuiz={setQuiz} />
            <InviteZone quiz={quiz} setQuiz={setQuiz} />
            <PublishZone quiz={quiz} setQuiz={setQuiz} />
            <DeleteZone quiz={quiz} />
        </Stack>
    );
};
export default SettingTab;
