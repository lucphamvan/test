import { Flex } from "@/components";
import { Quiz } from "@/types/quiz";
import DeleteAction from "./delete-action";
import ViewAction from "./view-action";

interface ActionsProps {
    test: Quiz;
    refreshData: () => void;
}
const Actions = (props: ActionsProps) => {
    return (
        <Flex>
            <ViewAction />
            <DeleteAction />
        </Flex>
    );
};
export default Actions;
