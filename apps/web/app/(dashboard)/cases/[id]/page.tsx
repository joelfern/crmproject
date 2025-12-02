import { DetailView } from "@/components/detail-view";

const fields = [
    { key: "subject", label: "Subject" },
    { key: "status", label: "Status" },
    { key: "priority", label: "Priority" },
    { key: "origin", label: "Origin" },
    { key: "type", label: "Type" },
    { key: "reason", label: "Reason" },
    { key: "description", label: "Description" },
];

const data = {
    id: "1",
    subject: "Login Issue",
    status: "NEW",
    priority: "HIGH",
    origin: "Email",
    type: "Problem",
    reason: "User Error",
    description: "User cannot login.",
};

export default function CaseDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return <DetailView title="Case Details" data={data} fields={fields} />;
}
