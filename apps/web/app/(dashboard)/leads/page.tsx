import { ListView } from "@/components/list-view";

const columns = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "company", label: "Company" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" },
];

const data = [
    {
        id: "1",
        firstName: "Jane",
        lastName: "Smith",
        company: "StartUp Inc",
        email: "jane@startup.com",
        status: "NEW",
    },
];

export default function LeadsPage() {
    return (
        <ListView
            title="Leads"
            columns={columns}
            data={data}
            basePath="/leads"
        />
    );
}
