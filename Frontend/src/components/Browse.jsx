import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchedQuery } from '@/redux/jobSlice';


const Browse = () => {
  useGetAllJobs();// this is a custom hook that fetches all jobs from the backend and stores them in the redux store

  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();// this is used to dispatch actions to the redux store

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""))
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-10 my-10'>
        <h1 className='font-bold text-xl my-10'>
          Search Reasults
          <span className="ml-2 bg-blue-100 text-blue-600 text-sm font-medium py-1 px-2 rounded-full">
            ({allJobs.length})
          </span>
        </h1>
        <div className='grid grid-cols-3 gap-4'>
          {
            allJobs.map((job) => {
              return (
                <Job key={job._id} job={job} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Browse