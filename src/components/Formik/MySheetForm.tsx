"use client"

import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
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
            <div>{errors.my_sheet[index][field]}</div>
        ) : null;
    };

    return (
        <div>
            <h1>My Sheet</h1>
            <Formik
                initialValues={{ my_sheet: data }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <FieldArray
                            name="my_sheet"
                            render={arrayHelpers => (
                                <div className='text-black'>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className='w-[350px]'>Problem</TableHead>
                                                <TableHead>Difficulty</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Notes</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {values.my_sheet && values.my_sheet.length > 0 ? (
                                                values.my_sheet.map((_: any, index: number) => (
                                                    <TableRow key={index} className='border-none'>
                                                        <TableCell className='w-[350px]'>
                                                            <Field name={`my_sheet.${index}.Problem`} className="p-2 rounded-lg bg-primary text-foreground w-full" />
                                                            {getError(errors, touched, index, 'Problem')}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Field name={`my_sheet.${index}.Difficulty`} as="select" className="p-2 rounded-lg bg-primary text-foreground">
                                                                <option value="">Select Difficulty</option>
                                                                <option value="Easy">Easy</option>
                                                                <option value="Medium">Medium</option>
                                                                <option value="Hard">Hard</option>
                                                            </Field>
                                                            {getError(errors, touched, index, 'Difficulty')}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Field name={`my_sheet.${index}.Status`} as="select" className="p-2 rounded-lg bg-primary text-foreground">
                                                                <option value="">Select Status</option>
                                                                <option value="Done">Done</option>
                                                                <option value="In Progress">In Progress</option>
                                                                <option value="Pending">Pending</option>
                                                            </Field>
                                                            {getError(errors, touched, index, 'Status')}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Icons.edit onClick={() => setOpenNotes(true)} className='cursor-pointer size-6' />
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
                                                            <Icons.remove className="m-1 cursor-pointer size-6" onClick={() => arrayHelpers.remove(index)} />
                                                            <Icons.add className="m-1 cursor-pointer size-6" onClick={() => arrayHelpers.remove(index)} />
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
                                        <Button type="submit" className='bg-ternary'>Submit</Button>
                                    </div>
                                </div>
                            )}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
}

// import React from 'react';
// import { Formik, Form, Field, FieldArray } from 'formik';
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableFooter,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import { Button } from '../ui/button';

// const data = [
//     { Problem: "https://leetcode.com/problems/two-sum/", Difficulty: "Easy", Status: "Pending", Notes: "" },
//     { Problem: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", Difficulty: "Easy", Status: "Pending", Notes: "" }
// ];

// export const MySheetForm = () => (
//     <div>
//         <h1>My Sheet</h1>
//         <Formik
//             initialValues={{ my_sheet: data }}
//             onSubmit={values =>
//                 setTimeout(() => {
//                     alert(JSON.stringify(values, null, 2));
//                 }, 500)
//             }
//         >
//             {({ values }) => (
//                 <Form>
//                     <FieldArray
//                         name="my_sheet"
//                         render={arrayHelpers => (
//                             <div className='text-black'>
//                                 <Table>
//                                     <TableCaption>A list of your recent invoices.</TableCaption>
//                                     <TableHeader>
//                                         <TableRow>
//                                             <TableHead>Problem</TableHead>
//                                             <TableHead>Difficulty</TableHead>
//                                             <TableHead>Status</TableHead>
//                                             <TableHead>Notes</TableHead>
//                                             <TableHead>Action</TableHead>
//                                         </TableRow>
//                                     </TableHeader>
//                                     <TableBody>
//                                         {values.my_sheet && values.my_sheet.length > 0 ? (
//                                             values.my_sheet.map((_, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell><Field name={`my_sheet.${index}.Problem`} /></TableCell>
//                                                     <TableCell><Field name={`my_sheet.${index}.Difficulty`} /></TableCell>
//                                                     <TableCell><Field name={`my_sheet.${index}.Status`} /></TableCell>
//                                                     <TableCell><Field name={`my_sheet.${index}.Notes`} /></TableCell>
//                                                     <TableCell>
//                                                         <Button
//                                                             type="button"
//                                                             onClick={() => arrayHelpers.remove(index)} // remove an item from the list
//                                                         >
//                                                             -
//                                                         </Button>
//                                                         <Button
//                                                             type="button"
//                                                             onClick={() => arrayHelpers.insert(index, { Problem: "", Difficulty: "", Status: "", Notes: "" })} // insert an empty object at a position
//                                                         >
//                                                             +
//                                                         </Button>
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))
//                                         ) : (
//                                             <button type="button" onClick={() => arrayHelpers.push({ Problem: "", Difficulty: "", Status: "", Notes: "" })}>
//                                                 Add an item
//                                             </button>
//                                         )}
//                                     </TableBody>
//                                 </Table>
//                                 <div>
//                                     <button type="submit">Submit</button>
//                                 </div>
//                             </div>
//                         )}
//                     />
//                 </Form>
//             )}
//         </Formik>
//     </div>
// );
