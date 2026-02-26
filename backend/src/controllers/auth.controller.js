import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Generate JWT
const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
}

// REGISTER
export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email});

        if (existingUser)
            return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {id: user._id, name: user.name, email: user.email},
        })
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

// LOGIN
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        
        if(!user)
            return res.status(400).json({message: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            res.status(400).json({message: "Invalid credentials"});

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "strict",
        });

        res.json({
            message: "Login successful",
            user: {id: user._id, name: user.name, email: user.email},
        });
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// LOGOUT

export const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.json({message : "Logged out successfully"});
}

// UPDATE PROFILE

export const updateProfile = async (req, res) => {
    try
    {
        const {name, bio, skills} = req.body;

        const user = await User.findById(req.user._id);

        if (!user)
            return res.status(404).json({message : "User not found"});

        user.name = name ?? user.name;
        user.bio = bio ?? user.bio;
        user.skills = skills ?? user.skills;

        await user.save();

        res.json({
            message : "Profile updated successfully",
            user,
        });
    }catch(error){
        res.status(500).json({message : error.message});
    }
};

