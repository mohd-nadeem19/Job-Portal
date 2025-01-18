import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLLCATION_API_AND_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const shortListingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application); // Get all applicants from redux store

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLLCATION_API_AND_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message) || "Something went wrong";
        }
    }

    return (
        <div className="p-4">
            <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <TableCaption className="text-sm font-semibold text-gray-700">A list of your recent applied users.</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="p-3 text-left text-sm font-medium text-gray-700">FullName</TableHead>
                        <TableHead className="p-3 text-left text-sm font-medium text-gray-700">Email</TableHead>
                        <TableHead className="p-3 text-left text-sm font-medium text-gray-700">Contact</TableHead>
                        <TableHead className="p-3 text-left text-sm font-medium text-gray-700">Resume</TableHead>
                        <TableHead className="p-3 text-left text-sm font-medium text-gray-700">Date</TableHead>
                        <TableHead className="p-3 text-right text-sm font-medium text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {applicants && applicants.applications?.map((item) => {
                        return (
                            <TableRow key={item._id} className="hover:bg-gray-50">
                                <TableCell className="p-3 text-sm text-gray-800">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="p-3 text-sm text-gray-800">{item?.applicant?.email}</TableCell>
                                <TableCell className="p-3 text-sm text-gray-800">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="p-3 text-sm text-gray-800">
                                    {
                                        item?.applicant?.profile?.resume ? (
                                            <a className='text-blue-500 hover:text-blue-700 font-semibold' href={item?.applicant?.profile?.resume} target='_blank' rel='noopener noreferrer'>
                                                {item?.applicant?.profile?.resumeOriginalName}
                                            </a>
                                        ) : (
                                            <span className='text-red-500 font-semibold'>No resume uploaded</span>
                                        )
                                    }
                                </TableCell>
                                <TableCell className="p-3 text-sm text-gray-800">{item?.applicant?.createdAt.split('T')[0]}</TableCell>
                                <TableCell className="p-3 text-sm text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-gray-500 hover:text-gray-700" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 p-2 bg-white shadow-lg rounded-md hover:cursor-pointer">
                                            {shortListingStatus.map((status, index) => (
                                                <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded'>
                                                    <span>{status}</span>
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;

