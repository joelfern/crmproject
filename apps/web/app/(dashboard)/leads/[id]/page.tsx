import { DetailView } from "@/components/detail-view";

const fields = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "company", label: "Company" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status" },
    { key: "source", label: "Source" },
    { key: "industry", label: "Industry" },
    { key: "annualRevenue", label: "Annual Revenue" },
    { key: "rating", label: "Rating" },
    { key: "address", label: "Address" },
    { key: "description", label: "Description" },
];

const data = {
    id: "1",
    firstName: "Jane",
    lastName: "Smith",
    company: "StartUp Inc",
    email: "jane@startup.com",
    phone: "555-9999",
    status: "NEW",
    source: "Web",
    industry: "Tech",
    annualRevenue: "$500,000",
    rating: "Hot",
    address: "456 Tech Blvd",
    description: "Interested in our premium plan.",
};

export default function LeadDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return <DetailView title="Lead Details" data={data} fields={fields} />;
}
