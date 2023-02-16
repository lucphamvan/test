import { Flex } from "@/components";
import { Question } from "@/types/question";
import EditQuestion from "../edit-question";
import DeleteAction from "./delete-action";
import ViewAction from "./view-action";

interface ActionsProps {
    question: Question;
    refreshData: any;
}
const Actions = ({ question, refreshData }: ActionsProps) => {
    return (
        <Flex>
            <ViewAction question={question} />
            <EditQuestion question={question} refreshData={refreshData} />
            <DeleteAction question={question} refreshData={refreshData} />
        </Flex>
    );
};

export default Actions;
