import { Quiz } from "@/types/quiz";
import { TableColumn } from "react-data-table-component";
import Actions from "./components/actions";

export const columns = (refreshData: any): TableColumn<Quiz>[] => [
    {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
        maxWidth: "250px"
    },
    {
        name: "Name",
        selector: (row) => row.setting.name
    },
    {
        name: "Begin",
        selector: (row) => row.setting.start_time
    },
    {
        name: "End",
        selector: (row) => row.setting.end_time
    },
    {
        name: "Duration",
        selector: (row) => row.setting.duration
    },
    {
        name: "Published",
        selector: (row) => (row.published ? "Yes" : "No")
    },
    {
        name: "Actions",
        cell: (test) => {
            return <Actions test={test} refreshData={refreshData} />;
        }
    }
];
