"use client";

import { useState, useCallback, useRef } from "react";
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    ReactFlowProvider,
    useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, GripVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialNodes: Node[] = [
    {
        id: "Account",
        position: { x: 250, y: 5 },
        data: { label: "Account" },
        style: { background: "#fff", border: "1px solid #777", width: 150 },
    },
    {
        id: "Contact",
        position: { x: 100, y: 150 },
        data: { label: "Contact" },
        style: { background: "#fff", border: "1px solid #777", width: 150 },
    },
];

const initialEdges: Edge[] = [
    { id: "e1-2", source: "Account", target: "Contact", animated: true },
];

const initialAvailableObjects = [
    "Lead",
    "Opportunity",
    "Quote",
    "Case",
    "Product",
    "Pricebook",
];

function DataModelFlow() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [availableObjects, setAvailableObjects] = useState(initialAvailableObjects);
    const [isRelDialogOpen, setIsRelDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isCreateObjDialogOpen, setIsCreateObjDialogOpen] = useState(false);
    const [newRel, setNewRel] = useState({ source: "", target: "" });
    const [newObjName, setNewObjName] = useState("");
    const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
    const { project } = useReactFlow();

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");

            // check if the dropped element is valid
            if (typeof type === "undefined" || !type) {
                return;
            }

            const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();

            if (!reactFlowBounds) return;

            const position = project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const newNode: Node = {
                id: type,
                position,
                data: { label: type },
                style: { background: "#fff", border: "1px solid #777", width: 150 },
            };

            setNodes((nds) => nds.concat(newNode));

            // Optional: Remove from available list if you want unique instances
            // setAvailableObjects((objs) => objs.filter((o) => o !== type));
        },
        [project, setNodes]
    );

    const handleAddRelationship = () => {
        if (newRel.source && newRel.target) {
            const newEdge: Edge = {
                id: `e${newRel.source}-${newRel.target}-${Date.now()}`,
                source: newRel.source,
                target: newRel.target,
                animated: true,
            };
            setEdges((eds) => addEdge(newEdge, eds));
            setIsRelDialogOpen(false);
            setNewRel({ source: "", target: "" });
        }
    };

    const onEdgeClick = (event: React.MouseEvent, edge: Edge) => {
        event.stopPropagation();
        setSelectedEdge(edge);
        setNewRel({ source: edge.source, target: edge.target });
        setIsEditDialogOpen(true);
    };

    const handleUpdateRelationship = () => {
        if (selectedEdge && newRel.source && newRel.target) {
            setEdges((eds) =>
                eds.map((e) => {
                    if (e.id === selectedEdge.id) {
                        return {
                            ...e,
                            source: newRel.source,
                            target: newRel.target,
                        };
                    }
                    return e;
                })
            );
            setIsEditDialogOpen(false);
            setSelectedEdge(null);
            setNewRel({ source: "", target: "" });
        }
    };

    const handleDeleteRelationship = () => {
        if (selectedEdge) {
            setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
            setIsEditDialogOpen(false);
            setSelectedEdge(null);
            setNewRel({ source: "", target: "" });
        }
    };

    const handleCreateObject = () => {
        if (newObjName) {
            setAvailableObjects((prev) => [...prev, newObjName]);
            setIsCreateObjDialogOpen(false);
            setNewObjName("");
        }
    };

    return (
        <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Data Model</h2>
                    <p className="text-muted-foreground">
                        Visualize relationships. Drag objects from the sidebar. Click lines to edit.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Dialog open={isCreateObjDialogOpen} onOpenChange={setIsCreateObjDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Plus className="mr-2 h-4 w-4" /> Create Object
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Object</DialogTitle>
                                <DialogDescription>
                                    Define a new object type to add to your schema.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="objName" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="objName"
                                        value={newObjName}
                                        onChange={(e) => setNewObjName(e.target.value)}
                                        className="col-span-3"
                                        placeholder="e.g. Invoice"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleCreateObject}>Create Object</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isRelDialogOpen} onOpenChange={setIsRelDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Add Relationship
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Relationship</DialogTitle>
                                <DialogDescription>
                                    Connect two objects to create a relationship.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="source" className="text-right">
                                        Source
                                    </Label>
                                    <Select
                                        value={newRel.source}
                                        onValueChange={(val) => setNewRel({ ...newRel, source: val })}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select source object" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {nodes.map((node) => (
                                                <SelectItem key={node.id} value={node.id}>
                                                    {node.data.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="target" className="text-right">
                                        Target
                                    </Label>
                                    <Select
                                        value={newRel.target}
                                        onValueChange={(val) => setNewRel({ ...newRel, target: val })}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select target object" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {nodes.map((node) => (
                                                <SelectItem key={node.id} value={node.id}>
                                                    {node.data.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddRelationship}>Create Relationship</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Relationship</DialogTitle>
                            <DialogDescription>
                                Modify or delete the relationship.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-source" className="text-right">
                                    Source
                                </Label>
                                <Select
                                    value={newRel.source}
                                    onValueChange={(val) => setNewRel({ ...newRel, source: val })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select source object" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {nodes.map((node) => (
                                            <SelectItem key={node.id} value={node.id}>
                                                {node.data.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-target" className="text-right">
                                    Target
                                </Label>
                                <Select
                                    value={newRel.target}
                                    onValueChange={(val) => setNewRel({ ...newRel, target: val })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select target object" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {nodes.map((node) => (
                                            <SelectItem key={node.id} value={node.id}>
                                                {node.data.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter className="sm:justify-between">
                            <Button variant="destructive" onClick={handleDeleteRelationship}>
                                Delete
                            </Button>
                            <Button onClick={handleUpdateRelationship}>Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-1 gap-6 h-full">
                <div className="w-64 shrink-0">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Objects</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            {availableObjects.map((obj) => (
                                <div
                                    key={obj}
                                    className="flex items-center gap-2 p-3 bg-muted rounded-md cursor-move border hover:border-primary transition-colors"
                                    draggable
                                    onDragStart={(event) => onDragStart(event, obj)}
                                >
                                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{obj}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="border rounded-md flex-1 bg-white h-full" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onEdgeClick={onEdgeClick}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        fitView
                    >
                        <Controls />
                        <MiniMap />
                        <Background gap={12} size={1} />
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
}

import { RoleGuard } from "@/components/auth/role-guard";
import { Role } from "@/hooks/use-role";

export default function DataModelPage() {
    return (
        <RoleGuard allowedRoles={[Role.ADMIN]}>
            <ReactFlowProvider>
                <DataModelFlow />
            </ReactFlowProvider>
        </RoleGuard>
    );
}
