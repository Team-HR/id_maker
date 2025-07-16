import OfficeIdTemplate from "@/Components/OfficeIdTemplate";
import { OfficeId } from "@/types/types";
import React from "react";

interface Props {
    office_ids: OfficeId[];
}

const Dashboard = ({ office_ids }: Props) => {
    return (
        <div>
            <OfficeIdTemplate office_ids={office_ids} />
        </div>
    );
};

export default Dashboard;
