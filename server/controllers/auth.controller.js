import userModel from "../models/user.model.js"
import { getToken } from "../utils/token.js"


// Generating googleAuth and insitilizing token to cookie
export const googleAuth = async (req, res) => {
    try{
        const {name, email} = req.body // Getting name and email from firebase reaponse
        let user = await userModel.findOne({email}) // Finding if the user already exists

        // If the user not in database creating the user
        if(!user) { 
            user = await userModel.create({
                name, email
            })
        }

        let token = await getToken(user._id) //Getting the token 
        res.cookie("token", token, {
            httpOnly: true, 
            secure: false, // Secure is false before deployment
            sameSite: "strict", // Used strict 
            maxAge: 604800000 // Cookie stores token for 7 days
        })
        return res.status(200).json(user)
    }catch(e){
        return res.status(500).json({message: "Internal Server Error"})
    }
}

// For loging out 
export const logOut = async (req, res) => {
    try{
        await res.clearCookie('token') // Clearing token Cookie
        return res.status(200).json({message: "Logged Out Successful"})
    }catch(e) {
        return res.status(500).json({message: `Logging out failed ${e}`})
    }
}