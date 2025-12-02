"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

interface Field {
    key: string;
    label: string;
    render?: (value: any) => React.ReactNode;
}

interface DetailViewProps {
    title: string;
    data: any;
    fields: Field[];
    onBack?: () => void;
}

export function DetailView({ title, data, fields, onBack }: DetailViewProps) {
    const router = useRouter();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" onClick={handleBack}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                </div>
                <Button variant="outline">
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        {fields.map((field) => (
                            <div key={field.key} className="sm:col-span-1">
                                <dt className="text-sm font-medium text-muted-foreground">
                                    {field.label}
                                </dt>
                                <dd className="mt-1 text-sm text-foreground">
                                    {field.render
                                        ? field.render(data[field.key])
                                        : data[field.key] || "-"}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </CardContent>
            </Card>
        </div>
    );
}
