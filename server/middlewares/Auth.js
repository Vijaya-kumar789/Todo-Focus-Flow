
import jwt from 'jsonwebtoken'


const auth = {
    isAuth: async(req, res, next) => {
        
        try {
            //get the token from req cookies
            const token = req.cookies.token;
            
            //if the token is not present , return a error message
            if (!token) {
                return res.status(400).json({ message: "Unauthorized" });
            }

            //if the token is present verify the token
            try {

                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

                // //get the userId form the decoded Token
                // // attached to the req object
                req.userId = decodedToken.id;

                //call the next middleware
                next();

            } catch (error) {
                res.status(400).json({ message: "invalid token" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}

export default auth;