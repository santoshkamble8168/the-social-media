import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js"

//register user
export const register = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body

        const salt = await bcrypt.genSalt()
        const hasshedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hasshedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user) return res.status(400).json({message: "Invalid credentials"})

        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched) return res.status(400).json({message: "Invalid credentials"})

        const token = jwt.sign({user}, process.env.JWT_SECRET)
        delete user.password

        res.status(200).json({token, user})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}