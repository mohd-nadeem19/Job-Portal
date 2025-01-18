import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialoge from './UpdateProfileDialoge';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs(); // get all applied jobs
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            {/* Profile Section */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-10 p-8 shadow-md">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
                        </Avatar>
                        <div>
                            <h1 className="font-medium text-2xl">{user?.fullname}</h1>
                            <p className="text-gray-600">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline" className="flex items-center gap-2">
                        <Pen className="h-4 w-4" />
                        Edit
                    </Button>
                </div>

                <div className="my-6">
                    <div className="flex items-center gap-3 my-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-700">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-3">
                        <Contact className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-700">{user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="my-6">
                    <h2 className="font-semibold text-lg mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {user?.profile?.skills?.length !== 0 ? (
                            user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className="bg-blue-100 text-blue-700">
                                    {item}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-gray-600">NA</span>
                        )}
                    </div>
                </div>

                {/* Resume Section */}
                <div className="my-6">
                    <Label className="text-lg font-bold">Resume</Label>
                    {isResume ? (
                        <a
                            target="_blank"
                            href={user?.profile?.resume}
                            className="text-blue-500 hover:underline ml-3"
                        >
                            {user?.profile?.resumeOriginalName}
                        </a>
                    ) : (
                        <span className="text-gray-600">NA</span>
                    )}
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto my-10">
                <h2 className="font-bold text-xl mb-5">Applied Jobs</h2>
                <AppliedJobTable />
            </div>

            {/* Update Profile Section */}
            <UpdateProfileDialoge open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
