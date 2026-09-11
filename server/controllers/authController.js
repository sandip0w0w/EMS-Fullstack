const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// login for admin and employee

const login = async (req, res) => {
    try{
        const { email, password, role_type} = req.body;

        if (!email || !password){
            return res.status(400).json({ error: "Email and password are required"});
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({ error: "Invalid credentials"});
        }

        if(role_type === "admin" && user.role !== "ADMIN"){
            return res.status(401).json({error: "Not authorized as admin"});
        }

        if(role_type === "employee" && user.role !== "EMPLOYEE"){
            return res.status(401).json({error: "Not authorized as employeee"});
        }

        const isValid = await bcrypt.compare(password, user.password)

        if(!isValid){
            return res.status(401).json({ error : "Invalid credentials"});
        }

        const payload = {
            userId : user._id.toString(),
            role : user.role,
            email : user.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );
        return res.json({ user: payload, token});


    }catch(error){
        console.error("Login error: ", error);
        return res.status(500).json({ error : "Login Failed"});
    }
}

// get session for employee and admin

const session = (req, res) => {
    const session = req.session;
    return res.json({ user: session})
}

const changePassword = async(req, res) => {
    try{
        const session = req.session;
        const { currentPassword, newPassword } = req.body;
        if(!currentPassword || !newPassword ){
            return res.status(400).json({ error: "Both passwords are required" });
        }
        const user = await User.findById(session.userId)
        if(!user) return res.status(404).json({ error: "User not found" });

        const isValid = bcrypt.compare(currentPassword, user.password);
        if(!isValid) return res.status(404).json({error: "Current Password is incorrect"});

        const hashed = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(session.userId, {password: hashed})
        return res.status(200).json({success: true});
    } catch(err){
        return res.status(500).json({error: "Failed to change password"});
    }
}


module.exports = {
    login,
    session,
    changePassword
}