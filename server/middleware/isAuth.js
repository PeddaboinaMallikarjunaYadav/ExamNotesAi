import jwt from "jsonwebtoken"


// Authorize the user by verifying the token 
const isAuth = async (req, res, next) => {
    try {
        let {token} = req.cookies // Getting the token from the cookie
        if(!token) { // Checking if the user is authonticated
            return res.status(401).json({message: "Not authonticated"}) 
        }
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!verifyToken) {
            return res.status(400).json({message: "User dosen't have valid token"})
        }
        req.userId = verifyToken.userId
        next()

    } catch (error) {
        return res.status(500).json({message: `is auth erro ${error}`})
    }
}

export default isAuth