// const jwt=require('jsonwebtoken');

// const auth=(req,res,next)=>{
//     const token=req.headers?.autorization?.split(" ")[1]
//     if(token){
//         try {
//             const decoded=jwt.verify(token,"masai");
//             if(decoded){
//                 next()
//             }else{
//                 res.send({"msg":"Please Login!"})
//             }
//         } catch (error) {
//             res.send({"msg":"Please Login!"})
//         }
//     }else{
//         res.send({"msg":"Please Login!"})
//     }
// };

// module.exports=auth

const jwt = require("jsonwebtoken")
const authenticate = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1]
    if (token) {
        const decoded = jwt.verify(token, "masai")
        if (decoded) {
            req.body.authorID=decoded.authorID
            req.body.author=decoded.author
            next()
        } else {
            res.send("Please Login")
        }
    } else {
        res.send("Please Login")
    }
}
module.exports = {
    authenticate
}
