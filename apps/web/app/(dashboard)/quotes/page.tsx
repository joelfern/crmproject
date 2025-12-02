import { ListView } from "@/components/list-view";

const columns = [
    { key: "quoteNumber", label: "Quote Number" },
    { key: "totalAmount", label: "Total Amount" },
    { key: "status", label: "Status" },
    { key: "validUntil", label: "Valid Until" },
];

const data = [
    {
        id: "1",
        quoteNumber: "Q-001",
        totalAmount: "$50,000",
        status: "DRAFT",
        validUntil: "2024-12-31",
    },
];

export default function QuotesPage() {
    return (
        <ListView
            title="Quotes"
            columns={columns}
            data={data}
            basePath="/quotes"
        />
    );
}
