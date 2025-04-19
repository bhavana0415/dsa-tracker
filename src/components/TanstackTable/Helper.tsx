"use client"

import React from 'react'
import {
    Column,
} from '@tanstack/react-table'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '../ui/input'

export function Filter({ column }: { column: Column<any, unknown> }) {
    const columnFilterValue = column.getFilterValue()
    const { filterVariant } = column.columnDef.meta ?? {}

    return filterVariant === 'select_status' ? (
        <Select
            onValueChange={value => column.setFilterValue(value == "All" ? "" : value)}
            value={columnFilterValue?.toString()}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    ) : filterVariant === 'select_difficulty' ? (
        <Select
            onValueChange={value => column.setFilterValue(value == "All" ? "" : value)}
            value={columnFilterValue?.toString()}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    ) : (
        <DebouncedInput
            className="w-36 border shadow rounded"
            onChange={value => column.setFilterValue(value)}
            placeholder={`Search...`}
            type="text"
            value={(columnFilterValue ?? '') as string}
        />
    )
}

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = React.useState(initialValue)

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <Input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}

export function useSkipper() {
    const shouldSkipRef = React.useRef(true)
    const shouldSkip = shouldSkipRef.current

    const skip = React.useCallback(() => {
        shouldSkipRef.current = false
    }, [])

    React.useEffect(() => {
        shouldSkipRef.current = true
    })

    return [shouldSkip, skip] as const
}