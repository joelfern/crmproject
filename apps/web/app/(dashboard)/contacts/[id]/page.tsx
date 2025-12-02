import { DetailView } from "@/components/detail-view";

const fields = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "title", label: "Title" },
    { key: "department", label: "Department" },
    { key: "mailingAddress", label: "Mailing Address" },
    { key: "birthdate", label: "Birthdate" },
    { key: "description", label: "Description" },
];

const data = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@acme.com",
    phone: "555-0123",
    title: "CEO",
    department: "Management",
    mailingAddress: "123 Main St",
    birthdate: "1980-01-01",
    description: "Key contact at Acme Corp.",
};

export default function ContactDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return <DetailView title="Contact Details" data={data} fields={fields} />;
}
