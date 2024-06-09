import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser'


export const verifyToken = (req, res, next) => {
    try {
        const cookieToken = req.cookies["token"];

        if (!cookieToken) {
            return res.status(402).json({ message: "Unauthorized access" });

        }


        const decode = jwt.verify(cookieToken, process.env.JWT_SECRET_KEY);
        console.log(decode);
        req.userId = decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ errorMessage: "Invalid token!" , isTokenExpired : true});
    }
};

export const decodeJwtToken = (cookie) => {
    try {
        
        if (!cookie) {
            console.log("Cookie is missing.");
            return;
        }else
        {
            console.log("Cookie is present.",authHeader);
        }

        const decode = jwt.verify(cookie, process.env.JWT_SECRET_KEY);
        console.log("Decoded token:", decode);

        const userId = decode.userId;
        if (!userId) {
            console.log("User ID is missing in the decoded token.");
            return;
        }

        return userId;
        
    } catch (error) {
        console.log("Error decoding JWT token:", error);
        return;
    }
}


