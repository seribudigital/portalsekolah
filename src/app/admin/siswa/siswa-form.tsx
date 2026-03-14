"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Siswa } from "./columns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { doc, addDoc, updateDoc, collection } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"

import { toast } from "sonner"
import { Loader2 } from "lucide-react"


// Schema Validation
const formSchema = z.object({
    namaLengkap: z.string().min(2, "Nama minimal 2 karakter"),
    nisn: z.string().min(5, "NISN minimal 5 karakter"),
    unit: z.enum(["TK", "SD", "MTS", "MA"]),
    kelas: z.string().min(1, "Pilih kelas"),
    rombel: z.string().min(1, "A atau B"),
    status: z.enum(["AKTIF", "ALUMNI"]),
})

type SiswaFormValues = z.infer<typeof formSchema>

interface SiswaFormProps {
    initialData?: Siswa | null
    onSuccess: () => void
    onCancel: () => void
    currentAdminUnit?: string // e.g., "MTS" or "ALL"
}

export function SiswaForm({ initialData, onSuccess, onCancel, currentAdminUnit }: SiswaFormProps) {
    const [loading, setLoading] = useState(false)

    const defaultValues: Partial<SiswaFormValues> = initialData
        ? {
            namaLengkap: initialData.namaLengkap,
            nisn: initialData.nisn,
            unit: initialData.unit as SiswaFormValues["unit"],
            kelas: initialData.kelas,
            rombel: initialData.rombel,
            status: initialData.status as SiswaFormValues["status"],
        }
        : {
            namaLengkap: "",
            nisn: "",
            unit: currentAdminUnit && currentAdminUnit !== "ALL" ? (currentAdminUnit as SiswaFormValues["unit"]) : "SD",
            kelas: "",
            rombel: "A",
            status: "AKTIF",
        }

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<SiswaFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    // Dynamic dropdown logic
    const selectedUnit = watch("unit")
    const selectedStatus = watch("status")
    const selectedRombel = watch("rombel")

    const unitClasses: Record<string, string[]> = {
        "TK": ["TK A", "TK B"],
        "SD": ["1", "2", "3", "4", "5", "6"],
        "MTS": ["7", "8", "9"],
        "MA": ["10", "11", "12"]
    }

    const currentClasses = unitClasses[selectedUnit] || []

    // Ensure selected class is valid for new unit
    useEffect(() => {
        const currentKelas = watch("kelas")
        if (currentKelas && !currentClasses.includes(currentKelas)) {
            setValue("kelas", "")
        }
    }, [selectedUnit, setValue, currentClasses])

    const onSubmit = async (data: SiswaFormValues) => {
        setLoading(true)
        try {
            if (initialData?.id) {
                // Update
                const ref = doc(db, "siswa", initialData.id)
                await updateDoc(ref, data)
                toast.success("Data Siwa Berhasil Diperbarui")
            } else {
                // Create
                await addDoc(collection(db, "siswa"), data)
                toast.success("Siswa Baru Berhasil Ditambahkan!")
                reset() // Reset form explicitly
            }
            onSuccess()
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Terjadi kesalahan saat menyimpan data.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="namaLengkap">Nama Lengkap</Label>
                <Input id="namaLengkap" disabled={loading} {...register("namaLengkap")} />
                {errors.namaLengkap && <p className="text-sm text-red-500">{errors.namaLengkap.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="nisn">NISN</Label>
                <Input id="nisn" disabled={loading} {...register("nisn")} />
                {errors.nisn && <p className="text-sm text-red-500">{errors.nisn.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Unit Sekolah</Label>
                    <Select
                        disabled={loading || (currentAdminUnit !== "ALL" && currentAdminUnit !== undefined)}
                        onValueChange={(val) => setValue("unit", (val ?? "SD") as SiswaFormValues["unit"])}
                        defaultValue={selectedUnit}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih unit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="TK">TK</SelectItem>
                            <SelectItem value="SD">SD</SelectItem>
                            <SelectItem value="MTS">MTS</SelectItem>
                            <SelectItem value="MA">MA</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Kelas</Label>
                    <Select
                        disabled={loading || !selectedUnit}
                        onValueChange={(val) => setValue("kelas", val ?? "")}
                        value={watch("kelas")} // Use value instead of defaultValue for dynamic update
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent>
                            {currentClasses.map((kls) => (
                                <SelectItem key={kls} value={kls}>{kls}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.kelas && <p className="text-sm text-red-500">{errors.kelas.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Rombel</Label>
                    <Select
                        disabled={loading}
                        onValueChange={(val) => setValue("rombel", val ?? "")}
                        defaultValue={selectedRombel}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Rombel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="A">Rombel A</SelectItem>
                            <SelectItem value="B">Rombel B</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                        disabled={loading}
                        onValueChange={(val) => setValue("status", (val ?? "AKTIF") as SiswaFormValues["status"])}
                        defaultValue={selectedStatus}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="AKTIF">AKTIF</SelectItem>
                            <SelectItem value="ALUMNI">ALUMNI</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex items-center justify-end pt-4 space-x-2">
                <Button disabled={loading} type="button" variant="outline" onClick={onCancel}>
                    Batal
                </Button>
                <Button disabled={loading} type="submit" className="bg-primary hover:bg-primary/90">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Simpan Perubahan" : "Tambahkan Data"}
                </Button>
            </div>
        </form>
    )
}
