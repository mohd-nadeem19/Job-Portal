import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLLCATION_API_AND_POINT, JOB_API_AND_POINT } from '@/utils/constant';

const JobDescription = () => {
  
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const {user} = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const isIntiallyApplied = singleJob?.applications?.some((app) => app.applicant === user?._id) || false // check if user has already applied for this job;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  console.log("checking initial state",isApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLLCATION_API_AND_POINT}/apply/${jobId}`, { withCredentials: true });
      console.log(res.data);
      if (res.data.success) {
        setIsApplied(true); // Update the state to reflect that the user has applied for the job
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user._id }] };
        dispatch(setSingleJob(updatedSingleJob)) //Update the single job state with the new application
        toast.success(res.data.message)
      }
  
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      const res = await axios.get(`${JOB_API_AND_POINT}/get/${jobId}`, { withCredentials: true });
      if(res.data.success) {
        dispatch(setSingleJob(res.data.job));
        setIsApplied(res.data.job.applications.some((app) => app.application.applicant === user?._id)); // Update the state to reflect the current application status
      }
    }
    fetchSingleJob();
  }, [jobId,dispatch,user?._id]);
  return (
    <div className='max-w-6xl mx-auto  my-10'>
      <div className="flex items-center justify-between">
        <div>
          <h1 className='font-bold text-xl'>{ singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant='ghost'>{ singleJob?.position}</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant='ghost'>{ singleJob?.jobType}</Badge>
            <Badge className={'text-[#7209B7] font-bold'} variant='ghost'>{ singleJob?.salary}LPA</Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209B7] hover:bg-[#4b037b]'}`}>
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
      <div className='my-4'>
        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{ singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{ singleJob?.location}</span></h1>
        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{ singleJob?.description}</span></h1>
        <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{ singleJob?.experience}yrs</span></h1>
        <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{ singleJob?.salary}LPA</span></h1>
        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{ singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{ singleJob?.createdAt?.split('T')[0]}</span></h1>
      </div>
    </div>
  )
}

export default JobDescription