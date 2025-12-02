import { DetailView } from "@/components/detail-view";

const fields = [
    { key: "quoteNumber", label: "Quote Number" },
    { key: "totalAmount", label: "Total Amount" },
    { key: "status", label: "Status" },
    { key: "validUntil", label: "Valid Until" },
    { key: "billingAddress", label: "Billing Address" },
    { key: "shippingAddress", label: "Shipping Address" },
    { key: "description", label: "Description" },
];

const data = {
    id: "1",
    quoteNumber: "Q-001",
    totalAmount: "$50,000",
    status: "DRAFT",
    validUntil: "2024-12-31",
    billingAddress: "123 Main St",
    shippingAddress: "123 Main St",
    description: "Initial quote.",
};

export default function QuoteDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return <DetailView title="Quote Details" data={data} fields={fields} />;
}
