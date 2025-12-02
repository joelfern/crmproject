import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 border rounded-xl bg-card text-card-foreground shadow">
                    <div className="font-semibold leading-none tracking-tight">Total Revenue</div>
                    <div className="mt-2 text-3xl font-bold">$45,231.89</div>
                </div>
                <div className="p-6 border rounded-xl bg-card text-card-foreground shadow">
                    <div className="font-semibold leading-none tracking-tight">Active Users</div>
                    <div className="mt-2 text-3xl font-bold">+2350</div>
                </div>
            </div>
            <div className="mt-4">
                <Button>Download Report</Button>
            </div>
        </div>
    );
}
