import { DetailView } from "@/components/detail-view";

const fields = [
    { key: "title", label: "Title" },
    { key: "amount", label: "Amount" },
    { key: "stage", label: "Stage" },
    { key: "type", label: "Type" },
    { key: "leadSource", label: "Lead Source" },
    { key: "nextStep", label: "Next Step" },
    { key: "closeDate", label: "Close Date" },
    { key: "probability", label: "Probability" },
    { key: "description", label: "Description" },
];

const data = {
    id: "1",
    title: "Acme Corp Deal",
    amount: "$50,000",
    stage: "Negotiation",
    type: "New Business",
    leadSource: "Referral",
    nextStep: "Send Contract",
    closeDate: "2024-12-31",
    probability: "80%",
    description: "Closing soon.",
};

export default function OpportunityDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return <DetailView title="Opportunity Details" data={data} fields={fields} />;
}
