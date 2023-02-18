import { Question } from "@/types/question";
import ObjectID from "bson-objectid";

export const genQuestion = () => {
    return {
        content: "",
        choices: [{ id: ObjectID().toHexString(), content: "", isCorrect: false }]
    } as Question;
};
