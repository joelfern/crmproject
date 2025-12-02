"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, FileCode, Shield, Users } from "lucide-react";
import Link from "next/link";

const settingsSections = [
    {
        title: "Users",
        description: "Manage system users, roles, and groups.",
        href: "/settings/users",
        icon: Users,
        color: "text-orange-700",
    },
    {
        title: "Security",
        description: "Configure identity providers and authentication.",
        href: "/settings/security",
        icon: Shield,
        color: "text-blue-700",
    },
    {
        title: "Data Model",
        description: "Visualize and manage object relationships.",
        href: "/settings/datamodel",
        icon: Database,
        color: "text-violet-500",
    },
    {
        title: "Schema Builder",
        description: "Add and edit fields for CRM objects.",
        href: "/settings/schema",
        icon: FileCode,
        color: "text-emerald-500",
    },
];

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your CRM configuration and administration.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {settingsSections.map((section) => (
                    <Link key={section.href} href={section.href}>
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-base font-medium">
                                    {section.title}
                                </CardTitle>
                                <section.icon className={`h-4 w-4 ${section.color}`} />
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{section.description}</CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
