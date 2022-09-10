import { IUser } from "../types/user.type";
import {model, Schema} from "mongoose"

const userSchema: Schema = new Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    email:{
        type: String,
        require: true,
        match: /.+@.+\..+/,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, {timestamps: true})

export default model<IUser>("User", userSchema)