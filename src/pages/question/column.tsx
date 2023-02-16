import { Question } from "@/types/question";
import { TableColumn } from "react-data-table-component";
import Actions from "./components/actions";

export const columns = (refreshData: any): TableColumn<Question>[] => [
    {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
        maxWidth: "250px"
    },
    {
        name: "Content",
        selector: (row) => row.content
    },
    {
        name: "Actions",
        cell: (question) => {
            return <Actions question={question} refreshData={refreshData} />;
        }
    }
];
