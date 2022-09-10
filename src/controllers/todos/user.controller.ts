import { Request, Response } from "express";
import { IUser } from "../../types/user.type";
import User from './../../models/user.model'
import bcrypt from 'bcryptjs'
import isEmail from "validator/lib/isEmail";

const signup = async (req: Request, res: Response): Promise<void> => {
    const {username, email, password, role}: IUser = req.body

    //check valid email
    if(!isEmail(email)){
        res.status(400).send({
            message: "This email is unvalid"
        })
    }
    
    try {
        //check dubplicate email
        const users = await User.findOne({email: email});
        if(users) {
            res.status(401).send({
                statusCode: 401, 
                message: "This email is already exist."})
        }
        const user: IUser = new User({
            username: username,
            email: email,
            password: bcrypt.hashSync(password),
            role: role
        })
        const newUser: IUser = await user.save()
        res.status(201).send({
            res: newUser,
            statusCode: 201,
            message: 'User registered'
        })
    } catch (error) {
        throw error
    }
}


export {signup}