const jwt = require("jsonwebtoken")
const { makeRespObj } = require("../../AppUtils")

module.exports = async (req, res, next) => {
    const failedRes = () => {
        res.status(403).json(
            makeRespObj({
                status: false,
                status_code: 403,
                message: "Admin Request is Unauthorized!",
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

        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN)

        req.body.adminID = decoded.adminID
        next()
    } catch (error) {
        console.error(error)
        return failedRes()
    }
}
