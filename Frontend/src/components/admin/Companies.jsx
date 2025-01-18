import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllcompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center my-5">
                    <Input
                        className="w-1/3 border border-gray-300 rounded-lg p-2"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                        onClick={() => navigate('/admin/companies/create')}
                    >
                        New Company
                    </Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    );
}

export default Companies;
