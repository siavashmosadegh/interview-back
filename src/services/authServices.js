import { findByEmail } from "../repository/authRepository.js";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export const registerService = async (data) => {

    console.log(data);

    // 1. validation
    // check to see if user exists
    
    const existingUser = await findByEmail(data.email);

    if (existingUser) {
        throw new Error ("this user already exists");
    }

    // 2. hash password

    const hashedPassword = await hash(password,10);

    // 3. save to db

    const result = await insertUser(data)
    
    // 4. generate token

    const token = sign({ id: data.email }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })

    // 5. send response

    return token;

    //const user = await authRepository.createUser(data);
    //return user;
};