import Link from "next/link";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Database, User, Shield } from "lucide-react";

const settingsOptions = [
    {
        title: "Schema Builder",
        description: "Manage objects and fields.",
        href: "/settings/schema",
        icon: Database,
    },
    {
        title: "Profile",
        description: "Manage your account settings.",
        href: "/settings/profile",
        icon: User,
    },
    {
        title: "Security",
        description: "Manage password and 2FA.",
        href: "/settings/security",
        icon: Shield,
    },
];

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your application settings.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {settingsOptions.map((option) => (
                    <Link key={option.href} href={option.href}>
                        <Card className="hover:bg-muted/50 transition cursor-pointer h-full">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <option.icon className="h-5 w-5" />
                                    <CardTitle>{option.title}</CardTitle>
                                </div>
                                <CardDescription>{option.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
