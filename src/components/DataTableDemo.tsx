import { useState } from "react";
import { DataTable, Column } from "./DataTable";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

// 1. Define your data type
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: "Active" | "Inactive";
}

// 2. Create some dummy data
const users: User[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "Admin" : "User",
    status: i % 2 === 0 ? "Active" : "Inactive",
}));

export function DataTableDemo() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(users.length / itemsPerPage);

    // Calculate current data slice
    const currentData = users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // 3. Define columns
    const columns: Column<User>[] = [
        { header: "ID", accessorKey: "id", className: "w-[80px]" },
        { header: "Name", accessorKey: "name" },
        { header: "Email", accessorKey: "email" },
        {
            header: "Role",
            accessorKey: "role",
            cell: (user) => (
                <span className={user.role === "Admin" ? "font-bold text-primary" : ""}>
                    {user.role}
                </span>
            )
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (user) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs ${user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                >
                    {user.status}
                </span>
            ),
        },
        {
            header: "Actions",
            accessorKey: "id", // accessorKey is required but not used here
            cell: (user) => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => alert(`View ${user.name}`)}>
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => alert(`Delete ${user.name}`)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <DataTable
                data={currentData}
                columns={columns}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
