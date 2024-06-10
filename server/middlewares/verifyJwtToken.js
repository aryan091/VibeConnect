import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    try {
        const headerToken = req.headers["authorization"];

        if (!headerToken) {
            return res.status(402).json({ message: "Unauthorized access" });

        }


        const decode = jwt.verify(headerToken, process.env.JWT_SECRET_KEY);
        req.userId = decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ errorMessage: "Invalid token!" , isTokenExpired : true});
    }
};

export const decodeJwtToken = (authHeader) => {
    try {
        
        if (!authHeader) {
            console.log("Authorization header is missing.");
            return;
        }else
        {
            console.log("Authorization header is present.",authHeader);
        }

        const decode = jwt.verify(authHeader, process.env.JWT_SECRET_KEY);
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


