import jwt from "jsonwebtoken"

export const getToken = async (userId) => {
    try{
        const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"})
        return token
    }catch(e) {
        console.log(e);
    }
}