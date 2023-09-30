const { validationResult } = require("express-validator")

module.exports.validateFormFields = async (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)))

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        const errorObject = {}
        errors.errors.forEach((errorList) => {
            errorObject[errorList.path] = errorList.msg
        })

        res.status(400).json({
            status: false,
            status_code: 400,
            message: "Something went wrong!",
            error: errorObject,
        })
    }
}
