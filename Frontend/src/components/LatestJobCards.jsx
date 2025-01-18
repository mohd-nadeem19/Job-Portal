import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`description/${job?._id}`)}
            className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-blue-500'
        >
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex gap-2 mt-3'>
                <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position}</Badge>
                <Badge className='text-[#F83002] font-bold' variant='ghost'>{job?.jobType}</Badge>
                <Badge className='text-[#7209B7] font-bold' variant='ghost'>{job?.salary} LPA</Badge>
            </div>
        </div>
    );
}

export default LatestJobCards;
