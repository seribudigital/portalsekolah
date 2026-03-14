"use client"

import { useState } from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Trash2, Edit } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { doc, deleteDoc, writeBatch } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { toast } from "sonner"
import { triggerRevalidation } from "@/lib/revalidate"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    allowEdit?: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    allowEdit = true,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    // Custom global filter for Name and NISN
    const [globalFilter, setGlobalFilter] = useState("")

    const [isDeleting, setIsDeleting] = useState(false)
    const [isDeletingDialogOpen, setIsDeletingDialogOpen] = useState(false)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        globalFilterFn: (row, columnId, filterValue) => {
            const name = (row.getValue("namaLengkap") as string)?.toLowerCase() || "";
            const nisn = (row.getValue("nisn") as string)?.toLowerCase() || "";
            const val = filterValue.toLowerCase();
            return name.includes(val) || nisn.includes(val);
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter
        },
        onGlobalFilterChange: setGlobalFilter,
    })

    const exportToCSV = () => {
        const rows = table.getFilteredRowModel().rows.map(row => row.original as any)
        if (rows.length === 0) return;

        // Get keys from first row
        const keys = Object.keys(rows[0]).filter(k => k !== 'id') // exclude firestore id

        // Create header
        const csvContent = [
            keys.join(","),
            ...rows.map(row => keys.map(k => `"${row[k] || ""}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement("a")
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob)
            link.setAttribute("href", url)
            link.setAttribute("download", `Data_Siswa_Export.csv`)
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const handleBulkDelete = async () => {
        setIsDeleting(true)
        const promises = table.getFilteredSelectedRowModel().rows.map(row => {
            const docRef = doc(db, "siswa", (row.original as any).id);
            return deleteDoc(docRef);
        });

        try {
            await Promise.all(promises);
            toast.success(`${promises.length} data siswa berhasil dihapus secara massal.`);
            await triggerRevalidation();
            setRowSelection({});
            window.location.reload();
        } catch (error: any) {
            toast.error("Gagal menghapus secara massal: " + error.message);
        } finally {
            setIsDeleting(false);
        }
    }

    const selectedCount = Object.keys(rowSelection).length;

    return (
        <div className="space-y-4">
            {/* TOOLBAR */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-1 items-center space-x-2">
                    <Input
                        placeholder="Cari Nama atau NISN..."
                        value={globalFilter}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="max-w-sm"
                    />

                    <Select
                        value={(table.getColumn("unit")?.getFilterValue() as string) ?? "ALL"}
                        onValueChange={(value) => table.getColumn("unit")?.setFilterValue(value === "ALL" ? "" : value)}
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Semua Unit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Semua Unit</SelectItem>
                            <SelectItem value="TK">TK</SelectItem>
                            <SelectItem value="SD">SD</SelectItem>
                            <SelectItem value="MTS">MTS</SelectItem>
                            <SelectItem value="MA">MA</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        placeholder="Kelas (Cth: 1A)"
                        value={(table.getColumn("kelas")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn("kelas")?.setFilterValue(event.target.value)}
                        className="w-[130px]"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    {selectedCount > 0 && allowEdit && (
                        <AlertDialog open={isDeletingDialogOpen} onOpenChange={setIsDeletingDialogOpen}>
                            <Button variant="destructive" onClick={() => setIsDeletingDialogOpen(true)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Hapus ({selectedCount})
                            </Button>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Hapus {selectedCount} Data Siswa?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Aksi ini bersifat permanen. Anda akan menghapus selamanya {selectedCount} siswa terpilih dari database utama.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
                                    <AlertDialogAction disabled={isDeleting} onClick={(e) => { e.preventDefault(); handleBulkDelete(); }} className="bg-red-600 hover:bg-red-700">
                                        {isDeleting ? "Menghapus..." : "Ya, Hapus Masal"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                    <Button variant="outline" onClick={exportToCSV}>
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                </div>
            </div>

            {/* TABLE */}
            <div className="rounded-md border bg-white shadow-sm">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="font-semibold text-gray-700">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="hover:bg-gray-50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-3">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                                    Tidak ada data ditemukan.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} dari{" "}
                    {table.getFilteredRowModel().rows.length} baris terpilih.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Sebelumnya
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Selanjutnya
                    </Button>
                </div>
            </div>
        </div>
    )
}
