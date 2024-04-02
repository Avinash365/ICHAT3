import bcrypt from "bcryptjs";
import User from '../models/user.model.js';
import generateTokenAndSetCookie from "../utils/generateJWT.js";

export const singup = async (req, res) => {
    try {
        console.log(req.body);
        let { fullName, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Username already exists" })
        }
        // Hash Password hare 
        const salt = await bcrypt.genSalt(5);
        const hashPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/ 
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?email=${email}`
        // const girlProfilePic = `https://avatar.iran.liara.run/public/girl?email=${email}`

        const newUser = new User({
            fullName,
            email,
            password: hashPassword,
            profilePic: boyProfilePic
        })
        if (newUser) {
            // Generate JWT token here 
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
};
export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0}); 
        res.status(500).json({massage:"Logged out successfully"}); 
    } catch (error) {
        console.log("Error in logout controller", error.message); 
        res.status(500).json({ error: error.message })
    }

}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid email or password" });

        }
        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullName: user.email,
            profilePic: user.profilePic
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
