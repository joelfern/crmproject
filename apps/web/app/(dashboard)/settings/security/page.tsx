"use client";

import { IdPList } from "@/components/settings/idp-list";
import { RoleGuard } from "@/components/auth/role-guard";
import { Role } from "@/hooks/use-role";

export default function SecurityPage() {
    return (
        <RoleGuard allowedRoles={[Role.ADMIN]}>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Security</h2>
                    <p className="text-muted-foreground">
                        Manage identity providers and authentication settings.
                    </p>
                </div>
                <IdPList />
            </div>
        </RoleGuard>
    );
}
