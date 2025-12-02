"use client";

import { UsersTable } from "@/components/settings/users-table";
import { RoleGuard } from "@/components/auth/role-guard";
import { Role } from "@/hooks/use-role";

export default function UsersPage() {
    return (
        <RoleGuard allowedRoles={[Role.ADMIN]}>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                    <p className="text-muted-foreground">
                        Manage user access, roles, and groups.
                    </p>
                </div>
                <UsersTable />
            </div>
        </RoleGuard>
    );
}
