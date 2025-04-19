"use client"

import React, { useEffect, useState } from 'react'
import {
    CellContext,
    ColumnDef,
    ColumnFiltersState,
    RowData,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Filter, useSkipper } from './Helper'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialogue";
import NotesIcon from '@mui/icons-material/Notes';
import { updateUserMySheet } from '@/app/api/routes/api/api'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from '../ui/use-toast'

type Question = {
    Problem: string,
    Difficulty: 'Easy' | 'Medium' | 'Hard',
    Status: 'Done' | 'In Progress' | 'Pending',
    Notes: string
}

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: 'text' | 'select_status' | 'select_difficulty'
    }
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void
    }
}

const DropdownCell: React.FC<CellContext<Question, unknown>> = ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    const handleChange = (newValue: string) => {
        setValue(newValue)
        table.options.meta?.updateData(index, id, newValue)
    }

    return (
        <Select value={value as string} onValueChange={handleChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
                {id === 'Status' && (
                    <>
                        <SelectItem value="Done">Done</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                    </>
                )}
                {id === 'Difficulty' && (
                    <>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                    </>
                )}
            </SelectContent>
        </Select>
    )
}

const InputCell: React.FC<CellContext<Question, unknown>> = ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    const handleChange = (newValue: string) => {
        setValue(newValue)
        table.options.meta?.updateData(index, id, newValue)
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <Input
            value={value as string}
            onChange={e => handleChange(e.target.value)}
        />
    )
}

const defaultColumn: Partial<ColumnDef<Question>> = {
    cell: InputCell,
}

const MySheetTable = ({ sheetData }: { sheetData: Question[] }) => {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [openNotes, setOpenNotes] = useState(false);

    const columns = React.useMemo<ColumnDef<Question, any>[]>(
        () => [
            {
                accessorFn: row => row.Problem,
                id: 'Problem',
                cell: info => info.getValue(),
                header: () => <span>Problem</span>,
            },
            {
                accessorKey: 'Difficulty',
                header: 'Difficulty',
                cell: DropdownCell,
                meta: {
                    filterVariant: 'select_difficulty',
                },
            },
            {
                accessorKey: 'Status',
                header: 'Status',
                cell: DropdownCell,
                meta: {
                    filterVariant: 'select_status',
                },
            },
            {
                accessorFn: row => row.Notes,
                id: 'Notes',
                cell: InputCell,
                header: () => <span>Notes</span>,
            },
        ],
        []
    )

    const [data, setData] = React.useState<Question[]>(sheetData as Question[])
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        filterFns: {},
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
        autoResetPageIndex,
        meta: {
            updateData: (rowIndex, columnId, value) => {
                skipAutoResetPageIndex()
                setData(old =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex]!,
                                [columnId]: value,
                            }
                        }
                        return row
                    })
                )
            },
        },
    })

    const { data: userData } = useSession();
    const { id = "" } = userData?.user || {};
    const router = useRouter();

    const handleSubmit = async () => {
        const response = await updateUserMySheet(id, data);
        if (response) {
            toast({
                title: "Saved changes successfully",
                variant: "default",
            });
            router.push("/my-sheet");
        } else {
            toast({
                title: 'Unable to save sheet',
                description: 'Please try again after some time',
                variant: "destructive",
            });
        }
    }

    return (
        <div className="p-4 m-4">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id} className='border-none   '>
                            {headerGroup.headers.map(header => {
                                return (
                                    <TableHead key={header.id} colSpan={header.colSpan} className='align-top'>
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none text-lg'
                                                            : '',
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: <ArrowCircleUpIcon className='mx-2' />,
                                                        desc: <ArrowCircleDownIcon className='mx-2' />,
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                                {header.column.getCanFilter() && header.id !== 'Notes' ? (
                                                    <div>
                                                        <Filter column={header.column} />
                                                    </div>
                                                ) : null}
                                            </>
                                        )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table?.getRowModel().rows.map(row => {
                        return (
                            <TableRow key={row.id} className='border-none'>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <TableCell key={cell.id}>
                                            {cell.column.id === "Notes" ?
                                                <>
                                                    <NotesIcon onClick={() => {
                                                        setOpenNotes(true);
                                                    }} className='cursor-pointer' />
                                                    <Dialog open={openNotes} onOpenChange={() => setOpenNotes(false)}>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Notes</DialogTitle>
                                                                <DialogDescription className='w-full flex flex-col justify-center'>
                                                                    {flexRender(
                                                                        cell.column.columnDef.cell,
                                                                        cell.getContext()
                                                                    )}
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                </>
                                                : cell.column.id === "Problem" ?
                                                    <a href={flexRender(cell.column.columnDef.cell, cell.getContext())?.toString()}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </a>
                                                    :
                                                    flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <div className="h-2" />
            <div className="w-full mx-auto flex flex-wrap justify-center items-center gap-4 justify-center">
                <Button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </Button>
                <Button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </Button>
                <Button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </Button>
                <Button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </Button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <Input
                        type="number"
                        min="1"
                        max={table.getPageCount()}
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <Select
                    value={table.getState().pagination.pageSize.toString()}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value));
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select page size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    Show {pageSize}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='w-full flex justify-end'>
                <Button onClick={handleSubmit} className='p-4 m-4 hover:scale-105'>Save Changes</Button>
            </div>
        </div>
    )
}

export default MySheetTable
