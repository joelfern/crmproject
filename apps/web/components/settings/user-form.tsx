"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function UserForm({ userId }: { userId?: string }) {
    // Mock data fetching based on userId
    const [role, setRole] = useState("USER");
    const [permissions, setPermissions] = useState({
        canEditDashboard: false,
        canManageSchema: false,
        canManageDataModel: false,
    });

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
                    <CardDescription>Basic information and role assignment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue="Bob User" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue="bob@example.com" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                                <SelectItem value="USER">User</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Granular Permissions</CardTitle>
                    <CardDescription>Fine-grained access controls.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Edit Dashboard</Label>
                            <p className="text-sm text-muted-foreground">Allow user to customize dashboard layout.</p>
                        </div>
                        <Switch
                            checked={permissions.canEditDashboard}
                            onCheckedChange={(c) => setPermissions({ ...permissions, canEditDashboard: c })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Manage Schema</Label>
                            <p className="text-sm text-muted-foreground">Allow user to add/edit object fields.</p>
                        </div>
                        <Switch
                            checked={permissions.canManageSchema}
                            onCheckedChange={(c) => setPermissions({ ...permissions, canManageSchema: c })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Manage Data Model</Label>
                            <p className="text-sm text-muted-foreground">Allow user to edit relationships.</p>
                        </div>
                        <Switch
                            checked={permissions.canManageDataModel}
                            onCheckedChange={(c) => setPermissions({ ...permissions, canManageDataModel: c })}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
            </div>
        </div>
    );
}
