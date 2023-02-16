import { Loading } from "@/components";
import { ROUTE } from "@/config/route";
import { useAppSelector } from "@/redux/hook";
import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children?: React.ReactNode;
}
export const ProtectRoute = ({ children }: Props) => {
    const { fetching, isAuthen } = useAppSelector((state) => state.authen);

    if (fetching) {
        return <Loading />;
    }

    if (!isAuthen) {
        return <Navigate to={"/" + ROUTE.LOGIN} />;
    }

    return <>{children}</>;
};
