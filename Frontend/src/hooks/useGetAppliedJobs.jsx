import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLLCATION_API_AND_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();// get the dispatch function from the redux store

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLLCATION_API_AND_POINT}/get`, { withCredentials: true });
                console.log(res.data);
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs()
    }, [])
}
export default useGetAppliedJobs;