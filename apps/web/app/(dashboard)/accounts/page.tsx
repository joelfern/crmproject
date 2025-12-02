import { ListView } from "@/components/list-view";

const columns = [
    { key: "name", label: "Name" },
    { key: "industry", label: "Industry" },
    { key: "website", label: "Website" },
    { key: "phone", label: "Phone" },
    { key: "type", label: "Type" },
];

// Mock data for now
const data = [
    {
        id: "1",
        name: "Acme Corp",
        industry: "Technology",
        website: "acme.com",
        phone: "555-0123",
        type: "Customer",
    },
    {
        id: "2",
        name: "Globex",
        industry: "Manufacturing",
        website: "globex.com",
        phone: "555-0456",
        type: "Prospect",
    },
];

export default function AccountsPage() {
    return (
        <ListView
            title="Accounts"
            columns={columns}
            data={data}
            basePath="/accounts"
        />
    );
}
