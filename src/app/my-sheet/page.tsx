"use client"

import { Icons } from '@/components/icons';
import Loader from '@/components/Loader/loader';
import MySheetTable from '@/components/TanstackTable/MySheetTable';
import { Button } from '@/components/ui/button';
import { useGetUserMySheet } from '@/hooks/useGetMySheet';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { toast } from '@/components/ui/use-toast';

const Page = () => {

    const { data: userData } = useSession();
    const { id = "" } = userData?.user || {};
    const { data, isLoading, isError, error } = useGetUserMySheet(id);

    if (isLoading) {
        return <Loader isLoading={true} />
    }

    const download = () => {
        if (data?.my_sheet.length > 0) {
            exportToExcel();
        } else {
            downloadFile();
        }
    }

    const downloadFile = async () => {
        const filePath = `/excel_templates/MySheet.xlsx`;

        try {
            const response = await fetch(filePath);
            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: response.headers.get('content-type') || "" });
            const loadedFile = new File([blob], 'MySheet.xlsx');
            triggerDownload(loadedFile);
        } catch (error) {
            console.error('Error loading file:', error);
        }
    };

    const triggerDownload = (downloadedFile: File) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(downloadedFile);
        link.download = downloadedFile.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data?.my_sheet);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "LeetCode Problems");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(fileData, "MySheet.xlsx");
    };

    if (isError) {
        toast({
            title: "Unable to fetch your sheet",
            variant: "destructive",
        });
    }

    return (
        <>
            <div className='w-full flex flex-col justify-center items-center text-foreground'>

                {
                    data?.my_sheet.length > 0 ? <MySheetTable sheetData={data?.my_sheet} /> :
                        <>
                            <h1 className='font-semibold py-4 text-3xl'>Custom DSA Cheat Sheet</h1>
                            <p className='italic text-xl p-8 text-center'>Welcome to the custom DSA cheat sheet page! Here you can create your own personalized cheat sheet for Data Structures and Algorithms.</p>
                        </>
                }
                <Link href="/my-sheet/upload" className='flex justify-center py-6'>
                    <Button className='bg-success font-bold text-secondary hover:scale-105 transform transition duration-300'>{data?.my_sheet.length > 0 ? "Update sheet" : "Add your own DSA sheet"}</Button>
                </Link>

                <h2 className='underline pt-4'>Steps to {data?.my_sheet.length > 0 ? "Update" : "Add"} Your Custom Cheat Sheet</h2>
                <ol className='list-decimal py-2'>
                    <li className='p-2'>Download {data?.my_sheet.length > 0 ? "your" : "the default"} Excel template <Button className='bg-success text-secondary hover:scale-105 transform transition duration-300' onClick={download}>Download<Icons.fileDownload className='size-6' /></Button></li>
                    <li className='p-2'>Update the Excel sheet with your {data?.my_sheet.length > 0 ? "new" : "own"} data.</li>
                    <li className='p-2'>Click on <b>{data?.my_sheet.length > 0 ? " Update sheet" : " Add your own DSA sheet"} <Icons.up className='inline size-6' /></b></li>
                    <li className='p-2'>Upload the updated Excel file</li>
                    <li className='p-2'>Click on the <b>Submit</b> button to store your custom cheat sheet.</li>
                </ol>
            </div>
        </>
    );
};

export default Page;
