

const jwt = require("jsonwebtoken")
const { makeRespObj } = require("../../AppUtils")
// const UserModel = require("../../models/userModel/userSchema")

module.exports = async (req, res, next) => {
    const failedRes = () => {
        res.status(403).json(
            makeRespObj({
                status: false,
                status_code: 403,
                message: "User Request is Unauthorized!",
                error: "Internal Server Error",
            })
        )
    }

    try {
        if (!req.headers.authorization) {
            return failedRes()
        }

        const [, token] = req.headers.authorization.split(" ")

        if (!token) {
            return failedRes()
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // const user = await UserModel.findOne({
        //     _id: decoded.userID,
        //     isDeleted: false,
        // })
        // console.log("user", user)

        // if (!user) {
        //     return failedRes() 
        // }

        req.body.userID = decoded.userID

        next()
    } catch (error) {
        console.error(error)
        return failedRes()
    }
}


// const jwt = require("jsonwebtoken")
// const { makeRespObj } = require("../../AppUtils")

// module.exports = async (req, res, next) => {
//     const failedRes = () => {
//         res.status(403).json(
//             makeRespObj({
//                 status: false,
//                 status_code: 403,
//                 message: "User Request is Unauthorized!",
//                 error: "Internal Server Error",
//             })
//         )
//     }

//     try {
//         if (!req.headers.authorization) {
//             return failedRes()
//         }

//         const [, token] = req.headers.authorization.split(" ")

//         if (!token) {
//             return failedRes()
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         req.body.userID = decoded.userID

//         next()
//     } catch (error) {
//         console.error(error)
//         return failedRes()
//     }
// }

// const jwt = require("jsonwebtoken");
// const { makeRespObj } = require("../../AppUtils");


// const jwt = require("jsonwebtoken");
// const { makeRespObj } = require("../../AppUtils");

// // Maintain a blacklist of revoked tokens
// const revokedTokens = new Set();
// console.log("revokedTokens", revokedTokens)

// module.exports = async (req, res, next) => {
//     const failedRes = () => {
//         res.status(403).json(
//             makeRespObj({
//                 status: false,
//                 status_code: 403,
//                 message: "User Request is Unauthorized!",
//                 error: "Internal Server Error",
//             })
//         );
//     };

//     try {
//         if (!req.headers.authorization) {
//             return failedRes();
//         }

//         const [, token] = req.headers.authorization.split(" ");

//         if (!token) {
//             return failedRes();
//         }
//         console.log("token", token)

//         // Check if the token is in the revokedTokens list
//         if (revokedTokens.has(token)) {
//             console.log("Heloo")
//             return failedRes(); // Token is in the blacklist
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("==========", decoded)

//         req.body.userID = decoded.userID;

//         next();
//     } catch (error) {
//         console.error(error);
//         return failedRes();
//     }
// };
