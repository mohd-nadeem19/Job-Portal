import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_AND_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();// get the id from the url
    useGetCompanyById(params.id);// get the company by id
    
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null
    });

    const [loading, setLoading] = useState(false);// loading state
    const { singleCompany } = useSelector(store => store.company);// get the singleCompany state from the context

    const navigate = useNavigate();// navigate to another page

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(); // create a new FormData object
        formData.append('name', input.name); // append the name field
        formData.append('description', input.description); // append the description field
        formData.append('website', input.website); // append the website field
        formData.append('location', input.location); // append the location field
        if (input.file) {
            formData.append('file', input.file); // append the file field if it exists
        }

        // send the formData object to the server using a POST request
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_AND_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            // handle the response from the server
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    // useEffect hook to fetch the company data from the server when the component mounts
    useEffect(() => {
        setInput({
            name: singleCompany.name || '',
            description: singleCompany.description || '',  
            website: singleCompany.website || '',
            location: singleCompany.location || '',
            file: singleCompany.file || null,
        })
        
    },[singleCompany])

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span onClick={() => navigate('/admin/companies')}>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-5'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='w-4 h-4 mr-2 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-8">Update</Button>
                    }
                </form>

            </div>
        </div>
    )
}

export default CompanySetup