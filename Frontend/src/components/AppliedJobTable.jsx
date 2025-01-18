import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className="container mx-auto p-6">
            <Table className="w-full border border-gray-300 shadow-lg">
                <TableCaption className="text-sm font-semibold text-gray-700 mb-4">
                    A list of your applied jobs
                </TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="px-4 py-2">Date</TableHead>
                        <TableHead className="px-4 py-2">Job Role</TableHead>
                        <TableHead className="px-4 py-2">Company</TableHead>
                        <TableHead className="px-4 py-2 text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center text-red-500 font-semibold py-4">
                                You haven't applied to any jobs yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:bg-gray-50">
                                <TableCell className="px-4 py-2">
                                    {appliedJob.createdAt.split('T')[0]}
                                </TableCell>
                                <TableCell className="px-4 py-2">
                                    {appliedJob.job.title}
                                </TableCell>
                                <TableCell className="px-4 py-2">
                                    {appliedJob.job.company.name}
                                </TableCell>
                                <TableCell className="px-4 py-2 text-right">
                                    <Badge className={`${appliedJob?.status === 'rejected' ? 'bg-red-500' : appliedJob.status === 'pending' ? 'bg-gray-500' : 'bg-green-500'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
