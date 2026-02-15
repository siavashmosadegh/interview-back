import { findByEmail, insertUser } from "../repository/authRepository.js";
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

    const hashedPassword = await hash(data.password,10);

    // 3. Prepare data

    const userData = {
        ...data,
        password, hashedPassword
    }

    // 4. save user to db

    const user = await insertUser(userData);
    
    // 5. generate token

    const token = sign(
        { 
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
        expiresIn: '1h'
        }
    )

    // 6. remove password from response
    delete user.password

    // 7. return


    return {
        user,
        token
    };
};