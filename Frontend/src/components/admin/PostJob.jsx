import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_AND_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const PostJob = () => {
    // const companyArray = [];

    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: '',
    });

    const { companies } = useSelector(store => store.company);

    //use state for loading
    const [loading, setLoading] = useState(false);

    //use navigate
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({
            ...input, [e.target.name]: e.target.value
        });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${JOB_API_AND_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center  my-5'>
                <form onSubmit={submitHandler} className='max-w-4xl p-8 border border-gray-200 rounded-lg shadow-lg '>


                    <div className='grid grid-cols-2 gap-5'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                placeholder="Enter title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:right-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="Enter description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:right-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                placeholder="Enter requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:right-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                placeholder="Enter salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:right-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                placeholder="Enter location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:right-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                placeholder="Enter jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:right-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                placeholder="Enter experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:right-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Position</Label>
                            <Input
                                type="number"
                                name="position"
                                placeholder="Enter position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:right-0 my-1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                  
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='w-4 h-4 mr-2 animate-spin' />Post New Job</Button> : <Button type="submit" className="w-full my-8">Post New Job</Button>
                    }

                    {
                        companies.length === 0 && <p className=" text-xs text-center font-bold text-red-600 my-3">*Please register a company first, before positing a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob