"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

interface Column {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
}

interface ListViewProps {
    title: string;
    columns: Column[];
    data: any[];
    basePath: string; // e.g., "/accounts"
}

export function ListView({ title, columns, data, basePath }: ListViewProps) {
    const router = useRouter();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New {title.slice(0, -1)}
                </Button>
            </div>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col) => (
                                <TableHead key={col.key}>{col.label}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, i) => (
                                <TableRow
                                    key={row.id || i}
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => router.push(`${basePath}/${row.id}`)}
                                >
                                    {columns.map((col) => (
                                        <TableCell key={col.key}>
                                            {col.render
                                                ? col.render(row[col.key], row)
                                                : row[col.key]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
