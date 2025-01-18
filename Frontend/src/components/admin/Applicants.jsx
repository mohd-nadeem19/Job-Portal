import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLLCATION_API_AND_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/ApplicationSlice'

const Applicants = () => {
  const params = useParams();// get the id from the url
  const dispatch = useDispatch();// get the dispatch function from redux
  const {applicants} = useSelector(store => store.application)// get the applicants from redux


  //UseEffect to fetch applicants from backend
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`${APPLLCATION_API_AND_POINT}/${params.id}/applicants`, { withCredentials: true })
        dispatch(setAllApplicants(res.data.job));

      } catch (error) {
        console.log(error)
      }
    }
    fetchApplicants();
  }, [])
  return (
    <div>
  <Navbar />
  <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
    <h1 className='text-xl font-bold text-gray-900 my-5 ml-6 flex items-center'>
      Applicants 
      <span className="ml-2 bg-blue-100 text-blue-600 text-sm font-medium py-1 px-2 rounded-full">
        ({applicants?.applications?.length})
      </span>
    </h1>
    <ApplicantsTable />
  </div>
</div>

  )
}

export default Applicants