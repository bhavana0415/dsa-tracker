"use client"

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray, useFormikContext, useField } from 'formik';
import * as Yup from 'yup';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialogue";
import { Button } from '../ui/button';
import { updateUserMySheet } from '@/app/api/routes/api/api';
import { useSession } from 'next-auth/react';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { Icons } from '../icons';

const validationSchema = Yup.object().shape({
    my_sheet: Yup.array().of(
        Yup.object().shape({
            Problem: Yup.string().url('Invalid URL').required('Required'),
            Difficulty: Yup.string().oneOf(['Easy', 'Medium', 'Hard'], 'Invalid Difficulty').required('Required'),
            Status: Yup.string().oneOf(['Done', 'In Progress', 'Pending'], 'Invalid Status').required('Required'),
            Notes: Yup.string().optional(),
        })
    )
});

export const MySheetForm = ({ data }: { data: any }) => {

    const [openNotes, setOpenNotes] = useState(false);
    const { data: userData } = useSession();
    const { id = "" } = userData?.user || {};
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        const response = await updateUserMySheet(id, data.my_sheet);
        if (response) {
            toast({
                title: response.message,
                variant: "default",
            });
            router.push("/my-sheet");
        } else {
            toast({
                title: 'Unable to upload sheet',
                description: 'Please try again after some time',
                variant: "destructive",
            });
        }
    }

    const getError = (errors: any, touched: any, index: number, field: any) => {
        return typeof errors.my_sheet?.[index] !== 'string' && errors.my_sheet?.[index]?.[field] && touched.my_sheet?.[index]?.[field] ? (
            <div className='text-red-500'>{errors.my_sheet[index][field]}</div>
        ) : null;
    };

    const handleFormSubmit = (values: any, errors: any) => {
        if (Object.keys(errors).length > 0) {
            toast({
                title: "Missing required fields",
                variant: "destructive"
            })
        } else {
            handleSubmit(values)
        }
    }

    return (
        <Formik
            initialValues={{ my_sheet: data }}
            validationSchema={validationSchema}
            onSubmit={() => console.log("")}
        >
            {({ values, errors, touched }) => {

                return (
                    <Form>
                        <FieldArray
                            name="my_sheet"
                            render={arrayHelpers => (
                                <div className='text-black'>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className='w-[350px]'>Problem<sup style={{ color: "red" }}>*</sup></TableHead>
                                                <TableHead>Difficulty<sup style={{ color: "red" }}>*</sup></TableHead>
                                                <TableHead>Status<sup style={{ color: "red" }}>*</sup></TableHead>
                                                <TableHead>Notes</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {values.my_sheet && values.my_sheet.length > 0 ? (
                                                values.my_sheet.map((_: any, index: number) => (
                                                    <TableRow key={index} className='border-none'>
                                                        <TableCell className='w-[350px]'>
                                                            <Field name={`my_sheet.${index}.Problem`} className={`${getError(errors, touched, index, 'Problem') ? "border-red-500" : ""} p-2 rounded-lg bg-primary text-foreground w-full`} />
                                                            {getError(errors, touched, index, 'Problem')}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Field name={`my_sheet.${index}.Difficulty`} as="select" className={`${getError(errors, touched, index, 'Difficulty') ? "border-red-500" : ""} p-2 rounded-lg bg-primary text-foreground`}>
                                                                <option value="Easy">Easy</option>
                                                                <option value="Medium">Medium</option>
                                                                <option value="Hard">Hard</option>
                                                            </Field>
                                                            {getError(errors, touched, index, 'Difficulty')}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Field name={`my_sheet.${index}.Status`} as="select" className={`${getError(errors, touched, index, 'Status') ? "border-red-500" : ""} p-2 rounded-lg bg-primary text-foreground`}>
                                                                <option value="Done">Done</option>
                                                                <option value="In Progress">In Progress</option>
                                                                <option value="Pending">Pending</option>
                                                            </Field>
                                                            {getError(errors, touched, index, 'Status')}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Icons.edit onClick={() => setOpenNotes(true)} className='cursor-pointer size-6 text-foreground' />
                                                            <Dialog open={openNotes} onOpenChange={() => setOpenNotes(false)}>
                                                                <DialogContent>
                                                                    <DialogHeader>
                                                                        <DialogTitle>Notes</DialogTitle>
                                                                        <DialogDescription>
                                                                            <Field name={`my_sheet.${index}.Notes`} className="p-2 rounded-lg bg-primary text-foreground w-full h-full" as="textarea" />
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </TableCell>
                                                        <TableCell className='flex'>
                                                            <Icons.remove className="text-foreground m-1 cursor-pointer size-6" onClick={() => arrayHelpers.remove(index)} />
                                                            <Icons.add className="text-foreground m-1 cursor-pointer size-6" onClick={() => arrayHelpers.remove(index)} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <button type="button" onClick={() => arrayHelpers.push({ Problem: "", Difficulty: "", Status: "", Notes: "" })}>
                                                    Add an item
                                                </button>
                                            )}
                                        </TableBody>
                                    </Table>
                                    <div className='w-full flex justify-end'>
                                        <Button type="button" className='bg-quaternary hover:scale-105 hover:bg-ternary' onClick={() => handleFormSubmit(values, errors)}>Submit</Button>
                                    </div>
                                </div>
                            )}
                        />
                    </Form>
                )
            }}
        </Formik>
    );
}
