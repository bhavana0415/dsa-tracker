"use client"

import { Icons } from '@/components/icons';
import Loader from '@/components/Loader/loader';
import MySheetTable from '@/components/TanstackTable/MySheetTable';
import { Button } from '@/components/ui/button';
import { useGetUserMySheet } from '@/hooks/useGetMySheet';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Page = () => {

    const { data: userData } = useSession();
    const { id = "" } = userData?.user || {};
    const { data, isLoading, isError, error } = useGetUserMySheet(id);

    if (isLoading) {
        return <Loader isLoading={true} />
    }

    console.log(data.my_sheet)

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


    return (
        <>
            {
                data?.my_sheet.length > 0 ?
                    <MySheetTable sheetData={data?.my_sheet} />
                    :
                    <div className='w-full flex flex-col justify-center items-center text-foreground'>
                        <h1 className='font-semibold py-4 text-3xl'>Custom DSA Cheat Sheet</h1>
                        <p className='italic text-xl p-8 text-center'>Welcome to the custom DSA cheat sheet page! Here you can create your own personalized cheat sheet for Data Structures and Algorithms.</p>
                        <h2 className='underline pt-4'>Steps to Add Your Custom Cheat Sheet</h2>
                        <ol className='list-decimal py-2'>
                            <li className='p-2'>Download the default Excel template <Button className='bg-success text-secondary hover:scale-105 transform transition duration-300' onClick={downloadFile}>Download<Icons.fileDownload className='size-6' /></Button></li>
                            <li className='p-2'>Update the Excel sheet with your own data.</li>
                            <li className='p-2'>Upload the updated Excel file</li>
                            <li className='p-2'>Click on the &quot;Save&quot; button to store your custom cheat sheet.</li>
                        </ol>
                    </div>
            }
            <Link href="/my-sheet/upload" className='flex justify-center py-6'>
                <Button className='bg-success font-bold text-secondary hover:scale-105 transform transition duration-300'>{data?.my_sheet.length > 0 ? "Update sheet" : "Add your own DSA sheet"}</Button>
            </Link>
        </>
    );
};

export default Page;
