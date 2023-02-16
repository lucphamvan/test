import { BreadcumbLink } from "@/components";
import { ROUTE } from "@/config/route";
import { Breadcrumbs as MuiBreadCrumbs } from "@mui/material";

const Breadcrumbs = () => {
    return (
        <MuiBreadCrumbs>
            <BreadcumbLink to="/">Home</BreadcumbLink>
            <BreadcumbLink to={"/" + ROUTE.QUIZ}>Quiz</BreadcumbLink>
            <BreadcumbLink to={"/" + ROUTE.QUIZ_CREATE} color="#1A553C">
                Create
            </BreadcumbLink>
        </MuiBreadCrumbs>
    );
};

export default Breadcrumbs;
