import { DetailView } from "@/components/detail-view";

const fields = [
    { key: "name", label: "Name" },
    { key: "industry", label: "Industry" },
    { key: "website", label: "Website" },
    { key: "phone", label: "Phone" },
    { key: "type", label: "Type" },
    { key: "annualRevenue", label: "Annual Revenue" },
    { key: "numberOfEmployees", label: "Employees" },
    { key: "billingAddress", label: "Billing Address" },
    { key: "shippingAddress", label: "Shipping Address" },
    { key: "description", label: "Description" },
];

// Mock data for now
const data = {
    id: "1",
    name: "Acme Corp",
    industry: "Technology",
    website: "acme.com",
    phone: "555-0123",
    type: "Customer",
    annualRevenue: "$1,000,000",
    numberOfEmployees: 500,
    billingAddress: "123 Main St, Anytown, USA",
    shippingAddress: "123 Main St, Anytown, USA",
    description: "A leading technology company.",
};

export default function AccountDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return <DetailView title="Account Details" data={data} fields={fields} />;
}
