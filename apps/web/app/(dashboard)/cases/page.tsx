import { ListView } from "@/components/list-view";

const columns = [
    { key: "subject", label: "Subject" },
    { key: "status", label: "Status" },
    { key: "priority", label: "Priority" },
    { key: "type", label: "Type" },
];

const data = [
    {
        id: "1",
        subject: "Login Issue",
        status: "NEW",
        priority: "HIGH",
        type: "Problem",
    },
];

export default function CasesPage() {
    return (
        <ListView
            title="Cases"
            columns={columns}
            data={data}
            basePath="/cases"
        />
    );
}
