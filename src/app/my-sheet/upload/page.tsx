"use client"

import React, { useRef, useState } from 'react'
import * as XLSX from 'xlsx';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { MySheetForm } from '@/components/Formik/MySheetForm';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from '@/components/icons';

const Page = () => {

    const [data, setData] = useState<any>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileUpload = () => {
        if (!fileInputRef.current) return
        const file = fileInputRef.current.files && fileInputRef.current.files[0];
        if (!file) return
        const reader = new FileReader();

        reader.onload = (event) => {
            if (!event || !event?.target) return
            const workbook = XLSX.read(event.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(sheet);

            const data = sheetData.map((item: any) => ({
                Problem: item?.Problem || "",
                Difficulty: item.Difficulty || "",
                Status: item.Status || "",
                Notes: item.Notes || "",
            }));

            setData(data);
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div className='w-full h-full p-20 flex flex-col'>
            <Link href="/my-sheet" className='w-full flex'><Icons.arrowBack className='size-6' /> My Sheet</Link>
            <div className='w-full h-full flex justify-center items-center p-6'>
                {data && data.length > 0 ? (
                    <MySheetForm data={data} />
                ) :
                    (
                        <>
                            <Input
                                type="file"
                                accept=".xlsx, .xls, .csv"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                id="file-input"
                            />
                            <label htmlFor="file-input" className='w-fit p-2 rounded-lg shadow-lg bg-quaternary cursor-pointer'>Upload File</label>
                            <sup>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger><Icons.info className='size-6' /></TooltipTrigger>
                                        <TooltipContent className='w-fit'>
                                            <strong>Imp*:</strong> Uploading a new file will overwrite <br></br>the existing data in your <em>Sheet</em>. So please <br></br>update your previous sheet instead of new sheet<br></br> if you want to add new data.
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </sup>
                        </>
                    )}
            </div>
        </div>
    )
}

export default Page;