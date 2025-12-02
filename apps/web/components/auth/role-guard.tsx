"use client";

import { useRole, Role } from "@/hooks/use-role";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles: Role[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const { role, isLoading } = useRole();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !allowedRoles.includes(role)) {
            // Optional: Redirect to dashboard or login
            // router.push("/");
        }
    }, [role, isLoading, allowedRoles, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!allowedRoles.includes(role)) {
        return (
            <div className="p-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Access Denied</AlertTitle>
                    <AlertDescription>
                        You do not have permission to view this page. Required role: {allowedRoles.join(", ")}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return <>{children}</>;
}
