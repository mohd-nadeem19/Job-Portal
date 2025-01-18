import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register Company
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        // Check if companyName is provided
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        // Check if company already exists
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register the same company again",
                success: false
            });
        }

        // Create new company
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get Companies by User ID
export const getCompany = async (req, res) => {
    try {
        const userId = req.id //logged in user id
        const companies = await Company.find({ userId }); // Use `find` to get all companies
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
};

//get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company get by id successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
};

//update company
export const updateCompany = async (req, res) => {
    
    try {
        const { name, description, website, location } = req.body;
        console.log(name, description, website, location);
        const file = req.file;
        //idhar cloudinary ayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

       const updateData = { name, description, website, location, logo};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        };

        return res.status(200).json({
            message: "Company information updated.",
            // company,
            success: "true"
        })
    } catch (error) {
        console.log(error);
        
    }
}