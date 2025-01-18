

import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">


                {/*  Left side  - Heading and Paragraph */}
                <div className='mx-12'>
                    <h1 className="text-lg font-bold">Job Hunt</h1>
                    <p className="text-sm">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
                {/*Right side - Social Icons */}

                <div className="flex space-x-4 mx-12">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-white text-2xl hover:text-blue-500" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-white text-2xl hover:text-blue-400" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-white text-2xl hover:text-blue-600" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
