import { ListView } from "@/components/list-view";

const columns = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "title", label: "Title" },
];

const data = [
    {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john@acme.com",
        phone: "555-0123",
        title: "CEO",
    },
];

export default function ContactsPage() {
    return (
        <ListView
            title="Contacts"
            columns={columns}
            data={data}
            basePath="/contacts"
        />
    );
}
