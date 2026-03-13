import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <Skeleton className="h-10 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>

            <div className="bg-card border rounded-lg shadow-sm">
                <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
                    <Skeleton className="h-10 w-full sm:max-w-xs" />
                    <div className="flex gap-2">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </div>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors">
                                <th className="h-12 px-4 text-left align-middle font-medium"><Skeleton className="h-4 w-4" /></th>
                                <th className="h-12 px-4 text-left align-middle font-medium"><Skeleton className="h-4 w-24" /></th>
                                <th className="h-12 px-4 text-left align-middle font-medium"><Skeleton className="h-4 w-32" /></th>
                                <th className="h-12 px-4 text-left align-middle font-medium"><Skeleton className="h-4 w-16" /></th>
                                <th className="h-12 px-4 text-left align-middle font-medium"><Skeleton className="h-4 w-16" /></th>
                                <th className="h-12 px-4 text-left align-middle font-medium"><Skeleton className="h-4 w-20" /></th>
                                <th className="h-12 px-4 text-left align-middle font-medium"><Skeleton className="h-4 w-12" /></th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle"><Skeleton className="h-4 w-4" /></td>
                                    <td className="p-4 align-middle"><Skeleton className="h-4 w-32" /></td>
                                    <td className="p-4 align-middle"><Skeleton className="h-4 w-48" /></td>
                                    <td className="p-4 align-middle"><Skeleton className="h-6 w-16 rounded-full" /></td>
                                    <td className="p-4 align-middle"><Skeleton className="h-4 w-12" /></td>
                                    <td className="p-4 align-middle"><Skeleton className="h-6 w-24 rounded-full" /></td>
                                    <td className="p-4 align-middle"><Skeleton className="h-8 w-8 rounded-md" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between px-4 py-4 border-t">
                    <Skeleton className="h-4 w-48" />
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-8" />
                    </div>
                </div>
            </div>
        </div>
    );
}
