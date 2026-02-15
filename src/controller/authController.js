import { registerService } from "../services/authServices.js";

export const register = async (req , res , next ) => {
    try {
        const {user, token} = await registerService(req.body);
        res.status(201).json({
            success: true,
            message: "Registered Successfully",
            user,
            token
        });
    } catch (error) {
        next(error);
    }
}