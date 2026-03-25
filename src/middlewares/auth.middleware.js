const jwt = require('jsonwebtoken');

//auth for admin
const adminAuth = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    try {

        let decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role != "admin") {
            return res.status(403).json({ message: "You are not allowed to upload music" });
        }

        req.user = decoded;

        next()


    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: " Unauthorized user" });
    }

}

//auth for user
const userAuth = (req, res, next) => {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({messgae:"Unauthorized"});
    }

    try{
        
        let decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role != "user"){
            return res.status(401).json({message:"Unauthorized"});
        }

        req.user = decoded;

        next();

    } catch(err){

        console.log(err);
        return res.status(401).json({message:"Unauthorized"});

    }
}



module.exports = { adminAuth , userAuth };