import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register Section
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        // console.log(fullname, email, phoneNumber, password, role);
        
        // Validate input fields
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        
        const file = req.file;
        console.log(file);
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded",
                success: false
            });
        }

        const fileUri = getDataUri(file);
        console.log(fileUri);
        
        let cloudResponse;
        try {
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        } catch (uploadError) {
            return res.status(500).json({
                message: "File upload failed",
                success: false
            });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false
            });
        }

        // Hash password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (hashError) {
            return res.status(500).json({
                message: "Password hashing failed",
                success: false
            });
        }

        // Create new user
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Login Section
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check for missing fields
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        // Check if password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        // Check if role matches
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the current role.",
                success: false
            });
        }

        // Generate JWT token
        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Create a simplified user object
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        // Return response with cookie and user data
        return res
            .status(200)
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
// Logout Section
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
};

// UpdateProfile
export const updateProfile = async (req, res) => {
    // console.log(req.body);
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        console.log(fullname, email, phoneNumber, bio, skills)
        const file = req.file;

        // Cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        };
        //Updating Data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skillsArray) user.profile.skills = skillsArray


        // resume comes later here..
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url //save the cloudinary url
            user.profile.resumeOriginalName = file.originalname //save the original file name
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            Profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}