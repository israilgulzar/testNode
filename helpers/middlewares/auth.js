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

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log(decoded);

//         // Check if the user's account is marked as deleted
//         if (decoded.isDeleted) {
//             console.log("============", decoded.isDeleted)
//             return failedRes(); // Token is associated with a deleted account
//         }

//         // Check if the token has expired
//         const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
//         if (decoded.exp <= currentTimestamp) {
//             return failedRes(); // Token has expired
//         }

//         req.body.userID = decoded.userID;

//         next();
//     } catch (error) {
//         console.error(error);
//         return failedRes();
//     }
// };

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

// const jwt = require("jsonwebtoken");
// const { makeRespObj } = require("../../AppUtils");

// // Maintain a blacklist of revoked tokens
// const revokedTokens = new Set();

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

//         // Check if the token is in the revokedTokens list
//         if (revokedTokens.has(token)) {
//             return failedRes(); // Token is in the blacklist
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         console.log("decoded", decoded)
//         // Check if the token has expired
//         const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
//         if (decoded.exp <= currentTimestamp) {
//             return failedRes(); // Token has expired

//         }

//         req.body.userID = decoded.userID;

//         next();
//     } catch (error) {
//         console.error(error);
//         return failedRes();
//     }
// };

const jwt = require("jsonwebtoken")
const { makeRespObj } = require("../../AppUtils")
const UserModel = require("../../models/userModel/userSchema")

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

        const decoded = jwt.verify(token, '8UdW2')

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
