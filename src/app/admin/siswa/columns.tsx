"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useState } from "react"
import { SiswaForm } from "./siswa-form"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { toast } from "sonner"
import { triggerRevalidation } from "@/lib/revalidate"

export type Siswa = {
    id: string
    nisn: string
    namaLengkap: string
    unit: string
    kelas: string
    rombel: string
    status: string
}

export const columns: ColumnDef<Siswa>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                // @ts-expect-error: checked can be 'indeterminate' for radix but strict TS balks sometimes
                checked={
                    table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? "indeterminate" : false
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "nisn",
        header: "NISN",
    },
    {
        accessorKey: "namaLengkap",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="-ml-4"
                >
                    Nama Lengkap
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "unit",
        header: "Unit",
        cell: ({ row }) => {
            const unit = row.getValue("unit") as string;
            // Unit color mapping
            const colorMap: Record<string, string> = {
                "TK": "bg-pink-100 text-pink-700 hover:bg-pink-200",
                "SD": "bg-red-100 text-red-700 hover:bg-red-200",
                "MTS": "bg-blue-100 text-blue-700 hover:bg-blue-200",
                "MA": "bg-gray-200 text-gray-800 hover:bg-gray-300",
            };
            return (
                <Badge variant="outline" className={`${colorMap[unit] || "bg-gray-100"} border-none font-semibold`}>
                    {unit}
                </Badge>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "kelas",
        header: "Kelas",
        cell: ({ row }) => {
            const kelas = row.getValue("kelas") as string;
            const rombel = row.original.rombel;
            return <span>{kelas}{rombel}</span>;
        },
        // Custom filter for Kelas + Rombel combination if needed, but we'll focus on just kelas for simplicity or standard includes
        filterFn: (row, id, value) => {
            const kelas = row.getValue(id) as string;
            const rombel = row.original.rombel;
            const combined = `${kelas}${rombel}`.toLowerCase();

            // If filter is an array of selected classes
            if (Array.isArray(value)) {
                return value.includes(combined) || value.includes(kelas);
            }
            return combined.includes(String(value).toLowerCase());
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge variant={status === "AKTIF" ? "default" : "secondary"}>
                    {status}
                </Badge>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const siswa = row.original
            const [isEditOpen, setIsEditOpen] = useState(false)
            const [isDeleteOpen, setIsDeleteOpen] = useState(false)
            const [isDeleting, setIsDeleting] = useState(false)

            const handleDelete = async () => {
                setIsDeleting(true)
                try {
                    await deleteDoc(doc(db, "siswa", siswa.id))
                    toast.success("Data siswa berhasil dihapus")
                    await triggerRevalidation()
                    setIsDeleteOpen(false)
                    // Refresh via meta if provided
                    if (table.options.meta && (table.options.meta as any).refreshData) {
                        (table.options.meta as any).refreshData()
                    } else {
                        window.location.reload()
                    }
                } catch (error: any) {
                    toast.error("Gagal menghapus: " + error.message)
                } finally {
                    setIsDeleting(false)
                }
            }

            return (
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                        <DropdownMenu>
                            {/* @ts-expect-error React 19 typings issue with Radix UI over asChild */}
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(siswa.nisn)}>
                                    Salin NISN
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="text-blue-600 font-medium" onSelect={(e) => { e.preventDefault(); setIsEditOpen(true); }}>
                                    <Pencil className="w-4 h-4 mr-2" /> Edit Data
                                </DropdownMenuItem>

                                <DropdownMenuItem className="text-red-600 font-medium" onSelect={(e) => { e.preventDefault(); setIsDeleteOpen(true); }}>
                                    <Trash className="w-4 h-4 mr-2" /> Hapus
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Edit Data Siswa</DialogTitle>
                                <DialogDescription>
                                    Perbarui detail untuk {siswa.namaLengkap} di bawah ini.
                                </DialogDescription>
                            </DialogHeader>
                            <SiswaForm
                                initialData={siswa}
                                onCancel={() => setIsEditOpen(false)}
                                onSuccess={() => {
                                    setIsEditOpen(false)
                                    if (table.options.meta && (table.options.meta as any).refreshData) {
                                        (table.options.meta as any).refreshData()
                                    } else {
                                        window.location.reload()
                                    }
                                }}
                            />
                        </DialogContent>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Data Siswa?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Aksi ini tidak dapat dibatalkan. Menghapus {siswa.namaLengkap} ({siswa.nisn}) secara permanen dari pangkalan data sekolah.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={(e) => { e.preventDefault(); handleDelete(); }} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
                                    {isDeleting ? "Menghapus..." : "Ya, Hapus Data"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </Dialog>
            )
        },
    },
]
