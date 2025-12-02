"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ShieldCheck } from "lucide-react";

const initialIdPs = [
    { id: "1", name: "Corporate Okta", type: "Okta", domain: "example.okta.com", status: "Active" },
];

export function IdPList() {
    const [idps, setIdps] = useState(initialIdPs);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Identity Providers</h3>
                    <p className="text-sm text-muted-foreground">
                        Configure SSO with Okta, Azure AD, or Google Workspace.
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Provider
                </Button>
            </div>

            <div className="grid gap-4">
                {idps.map((idp) => (
                    <Card key={idp.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <CardTitle className="text-base">{idp.name}</CardTitle>
                            </div>
                            <Badge variant={idp.status === "Active" ? "default" : "secondary"}>
                                {idp.status}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Type:</span> {idp.type}
                                </div>
                                <div>
                                    <span className="font-medium">Domain:</span> {idp.domain}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
