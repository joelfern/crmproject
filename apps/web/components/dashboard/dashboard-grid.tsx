"use client";

import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Button } from "@/components/ui/button";
import { Save, Edit } from "lucide-react";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
    children: React.ReactNode[];
}

const initialLayouts = {
    lg: [
        { i: "0", x: 0, y: 0, w: 1, h: 1 }, // Total Revenue
        { i: "1", x: 1, y: 0, w: 1, h: 1 }, // Subscriptions
        { i: "2", x: 2, y: 0, w: 1, h: 1 }, // Sales
        { i: "3", x: 3, y: 0, w: 1, h: 1 }, // Active Now
        { i: "4", x: 0, y: 1, w: 2, h: 2 }, // Overview
        { i: "5", x: 2, y: 1, w: 2, h: 2 }, // Recent Sales
        { i: "6", x: 0, y: 3, w: 2, h: 2 }, // User Growth
        { i: "7", x: 2, y: 3, w: 2, h: 2 }, // Revenue Pie
    ],
};

export function DashboardGrid({ children }: DashboardGridProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [layouts, setLayouts] = useState(initialLayouts);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onLayoutChange = (currentLayout: any, allLayouts: any) => {
        setLayouts(allLayouts);
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? (
                        <>
                            <Save className="mr-2 h-4 w-4" /> Save Layout
                        </>
                    ) : (
                        <>
                            <Edit className="mr-2 h-4 w-4" /> Edit Layout
                        </>
                    )}
                </Button>
            </div>
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}
                rowHeight={150}
                isDraggable={isEditing}
                isResizable={isEditing}
                onLayoutChange={onLayoutChange}
                draggableHandle=".drag-handle"
            >
                {children.map((child, index) => (
                    <div
                        key={index}
                        className={`border rounded-xl bg-card text-card-foreground shadow overflow-hidden relative ${isEditing ? "cursor-move ring-2 ring-primary/20" : ""
                            }`}
                    >
                        {isEditing && (
                            <div className="drag-handle absolute top-2 right-2 cursor-move p-1 bg-muted rounded z-50 hover:bg-primary/20">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground"><path d="M5.5 3C5.5 3.27614 5.27614 3.5 5 3.5C4.72386 3.5 4.5 3.27614 4.5 3C4.5 2.72386 4.72386 2.5 5 2.5C5.27614 2.5 5.5 2.72386 5.5 3ZM5.5 7.5C5.5 7.77614 5.27614 8 5 8C4.72386 8 4.5 7.77614 4.5 7.5C4.5 7.22386 4.72386 7 5 7C5.27614 7 5.5 7.22386 5.5 7.5ZM5.5 12C5.5 12.2761 5.27614 12.5 5 12.5C4.72386 12.5 4.5 12.2761 4.5 12C4.5 11.7239 4.72386 11.5 5 11.5C5.27614 11.5 5.5 11.7239 5.5 12ZM9.5 3C9.5 3.27614 9.27614 3.5 9 3.5C8.72386 3.5 8.5 3.27614 8.5 3C8.5 2.72386 8.72386 2.5 9 2.5C9.27614 2.5 9.5 2.72386 9.5 3ZM9.5 7.5C9.5 7.77614 9.27614 8 9 8C8.72386 8 8.5 7.77614 8.5 7.5C8.5 7.22386 8.72386 7 9 7C9.27614 7 9.5 7.22386 9.5 7.5ZM9.5 12C9.5 12.2761 9.27614 12.5 9 12.5C8.72386 12.5 8.5 12.2761 8.5 12C8.5 11.7239 8.72386 11.5 9 11.5C9.27614 11.5 9.5 11.7239 9.5 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </div>
                        )}
                        <div className="h-full w-full p-2">{child}</div>
                    </div>
                ))}
            </ResponsiveGridLayout>
        </div>
    );
}
