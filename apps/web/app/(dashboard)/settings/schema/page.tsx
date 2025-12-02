"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Pencil } from "lucide-react";
import { RoleGuard } from "@/components/auth/role-guard";
import { Role } from "@/hooks/use-role";

// Mock data for schema
const initialSchema = {
    Account: [
        { id: 1, name: "name", label: "Name", type: "Text", required: true },
        { id: 2, name: "industry", label: "Industry", type: "Text", required: false },
        { id: 3, name: "website", label: "Website", type: "URL", required: false },
        { id: 4, name: "annualRevenue", label: "Annual Revenue", type: "Currency", required: false },
    ],
    Contact: [
        { id: 1, name: "firstName", label: "First Name", type: "Text", required: true },
        { id: 2, name: "lastName", label: "Last Name", type: "Text", required: true },
        { id: 3, name: "email", label: "Email", type: "Email", required: false },
    ],
    Lead: [
        { id: 1, name: "firstName", label: "First Name", type: "Text", required: true },
        { id: 2, name: "lastName", label: "Last Name", type: "Text", required: true },
        { id: 3, name: "company", label: "Company", type: "Text", required: true },
    ],
    Opportunity: [
        { id: 1, name: "title", label: "Title", type: "Text", required: true },
        { id: 2, name: "amount", label: "Amount", type: "Currency", required: true },
        { id: 3, name: "stage", label: "Stage", type: "Select", required: true },
    ],
};

export default function SchemaBuilderPage() {
    return (
        <RoleGuard allowedRoles={[Role.ADMIN]}>
            <SchemaBuilderContent />
        </RoleGuard>
    );
}

function SchemaBuilderContent() {
    const [selectedObject, setSelectedObject] = useState("Account");
    const [schema, setSchema] = useState(initialSchema);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newField, setNewField] = useState({ name: "", label: "", type: "Text", required: false });

    const currentFields = schema[selectedObject as keyof typeof schema] || [];

    const handleAddField = () => {
        const updatedFields = [
            ...currentFields,
            { ...newField, id: Date.now(), required: false }, // Simplified for demo
        ];
        setSchema({ ...schema, [selectedObject]: updatedFields });
        setIsDialogOpen(false);
        setNewField({ name: "", label: "", type: "Text", required: false });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Schema Builder</h2>
                    <p className="text-muted-foreground">
                        Manage fields and objects for your CRM.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-[250px_1fr]">
                <Card>
                    <CardHeader>
                        <CardTitle>Objects</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="flex flex-col">
                            {Object.keys(schema).map((obj) => (
                                <Button
                                    key={obj}
                                    variant={selectedObject === obj ? "secondary" : "ghost"}
                                    className="justify-start rounded-none h-12 px-6"
                                    onClick={() => setSelectedObject(obj)}
                                >
                                    {obj}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>{selectedObject} Fields</CardTitle>
                            <CardDescription>
                                Manage the fields for the {selectedObject} object.
                            </CardDescription>
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" /> Add Field
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Field</DialogTitle>
                                    <DialogDescription>
                                        Create a new field for the {selectedObject} object.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="label" className="text-right">
                                            Label
                                        </Label>
                                        <Input
                                            id="label"
                                            value={newField.label}
                                            onChange={(e) =>
                                                setNewField({ ...newField, label: e.target.value })
                                            }
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            API Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={newField.name}
                                            onChange={(e) =>
                                                setNewField({ ...newField, name: e.target.value })
                                            }
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="type" className="text-right">
                                            Type
                                        </Label>
                                        <Select
                                            value={newField.type}
                                            onValueChange={(val) =>
                                                setNewField({ ...newField, type: val })
                                            }
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Text">Text</SelectItem>
                                                <SelectItem value="Number">Number</SelectItem>
                                                <SelectItem value="Currency">Currency</SelectItem>
                                                <SelectItem value="Date">Date</SelectItem>
                                                <SelectItem value="Select">Select</SelectItem>
                                                <SelectItem value="Checkbox">Checkbox</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleAddField}>Save Field</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Label</TableHead>
                                    <TableHead>API Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentFields.map((field) => (
                                    <TableRow key={field.id}>
                                        <TableCell className="font-medium">{field.label}</TableCell>
                                        <TableCell>{field.name}</TableCell>
                                        <TableCell>{field.type}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
