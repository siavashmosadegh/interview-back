import {
    register
} from "../services/authServices.js";

export const register = async (req , res , next ) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json("registered Successfully");
    } catch (error) {
        next(error);
    }
}