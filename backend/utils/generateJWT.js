import jwt from "jsonwebtoken"; 

const generateTokenAndSetCookie = (userId, res) =>{ 
    // $ openssl rand -base64 32 // use to generate JWT_SECRET
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "15d", 
    }); 
    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000, // MS 
        httpOnly: true, // prevent xss attacks cross-site scripting attacks 
        sameSite: "strict", // CSRF attacks cross-site request forgry attacks  
        secure: process.env.NODE_ENV !== "development"
    }); 
}; 
export default generateTokenAndSetCookie; 