import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

//Admine post karega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        // console.log(req.body);
        const userId = req.id;
        
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        }
        // //Log companyId to debug
        // console.log("Company ID:", companyId);

        // //Check if companyId exists in Company collection
        // const company = await Company.findById(companyId);
        // if (!company) {
        //     return res.status(400).json({
        //         message: "Company not found.",
        //         success: false
        //     });
        // }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        // console.log("Created Job:", job);

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

//student ke liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        //create Query
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },

            ]
        };
        const jobs = await Job.find(query).populate({ // Populate company details
            path:"company"
        }).sort({createdAt:-1});
        // If no jobs found
        if (!jobs) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            })
        };
        // Success response
        return res.status(201).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
};

//get job by id
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({ // Populate applications details
            path:"applications"
        })
        // If no jobs found
        if (!job) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            })
        };
        // Success response
        return res.status(201).json({
            job,
            success: true
        });

    } catch (error) {
        console.log(error)
    }
};

//Admine ne kitne job create ki h abhi tak
export const getAdmineJobs = async(req, res) => {
    try {
        const admineId = req.id;
        const jobs = await Job.find({ created_by: admineId }).populate({ // Populate company details
            path: "company",
            createdAt: -1, // Sort by createdAt in descending order
        })
        // If no jobs found
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        };

        //Success Responce
        return res.status(200).json({
            jobs,
            success:true
        })
        
    } catch (error) {
        console.log(error)
    }
};