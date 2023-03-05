import { Stack } from "@mui/material";
import { useContext } from "react";
import { QuizContext } from "..";
import DeleteZone from "./delete-zone";
import GeneralSetting from "./general-setting";
import InviteZone from "./invite-zone";
import PublishZone from "./publish-zone";

const SettingTab = () => {
    const { quiz, setQuiz } = useContext(QuizContext);
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
