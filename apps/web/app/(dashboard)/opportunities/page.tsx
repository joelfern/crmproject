import { ListView } from "@/components/list-view";

const columns = [
    { key: "title", label: "Title" },
    { key: "amount", label: "Amount" },
    { key: "stage", label: "Stage" },
    { key: "closeDate", label: "Close Date" },
    { key: "probability", label: "Probability" },
];

const data = [
    {
        id: "1",
        title: "Acme Corp Deal",
        amount: "$50,000",
        stage: "Negotiation",
        closeDate: "2024-12-31",
        probability: "80%",
    },
];

export default function OpportunitiesPage() {
    return (
        <ListView
            title="Opportunities"
            columns={columns}
            data={data}
            basePath="/opportunities"
        />
    );
}
