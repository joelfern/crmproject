"use client";

import { UserForm } from "@/components/settings/user-form";
import { RoleGuard } from "@/components/auth/role-guard";
import { Role } from "@/hooks/use-role";

export default function UserDetailPage({ params }: { params: { id: string } }) {
    return (
        <RoleGuard allowedRoles={[Role.ADMIN]}>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Edit User</h2>
                    <p className="text-muted-foreground">
                        Configure roles and granular permissions.
                    </p>
                </div>
                <UserForm userId={params.id} />
            </div>
        </RoleGuard>
    );
}
