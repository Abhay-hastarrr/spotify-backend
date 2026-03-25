const userModel = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

//register
const registerUser = async (req, res) => {

    const { username, email, password, role = "user" } = req.body;

    const isuserExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isuserExist) {
        return res.status(409).json({
            message: "user already exist"
        })
    }

    let hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role
        }
    })
}

//login
const loginUser = async (req, res) => {

    const { username, email, password } = req.body;

    // Validate input: password must be provided
    if (!password) {
        return res.status(400).json({ message: "password is required" });
    }

    // Require either username or email for login
    if (!username && !email) {
        return res.status(400).json({ message: "username or email is required" });
    }

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(401).json({ message: "inavlid credentials" });
    }

    const ispasswordValid = await bcrypt.compare(password, user.password);

    if (!ispasswordValid) {
        return res.status(401).json({ message: "invalid credentials" })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET);

    // Set auth token cookie
    res.cookie("token", token);

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })

}

//logout
const logoutUser = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "user logged out successfully" });
}

module.exports = { registerUser, loginUser, logoutUser };