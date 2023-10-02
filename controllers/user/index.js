
const UserModel = require("../../models/userModel/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { pageMaker, makeRespObj } = require("../../AppUtils/")
const { sendEmail } = require("../../utils/emailSend")
const crypto = require("crypto")

const createUser = async (userInputs) => {
    try {
        const { email, phone, password, ...userData } = userInputs

        let errorArray = {}

        const getEmailData = await UserModel.fetchUserFilterData({
            email: email,
        })
        if (getEmailData !== null) {
            errorArray = {
                email: "This email Already Exists",
                ...errorArray,
            }

            return makeRespObj({
                status_code: 400,
                message:
                    "User creation failed. Please check the provided data.",
                error: errorArray,
            })
        }
        const getPhoneData = await UserModel.fetchUserFilterData({
            phone: phone,
        })
        if (getPhoneData !== null) {
            errorArray = {
                phone: "This phone Already Exists",
                ...errorArray,
            }

            return makeRespObj({
                status_code: 400,
                message:
                    "User creation failed. Please check the provided data.",
                error: errorArray,
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const createUser = await UserModel.createUser({
            email,
            phone,
            ...userData,
            password: hashedPassword,
        })

        return makeRespObj({
            status_code: 201,
            message: "User has been created successfully.",
            data: createUser,
        })
    } catch (error) {
        console.log(error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const loginUser = async (userInputs) => {
    try {
        const { email, password } = userInputs

        const user = await UserModel.fetchOneUser(email)

        if (!user) {
            return makeRespObj({
                status_code: 401,
                message: "Invalid email",
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return makeRespObj({
                status_code: 401,
                message: "Invalid password",
            })
        }

        const token = jwt.sign(
            {
                userID: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "365d",
            }
        )
        return makeRespObj({
            status_code: 201,
            message: "Login successful",
            data: { userData: user, token: token },
        })
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getUserData = async (userInputs) => {
    try {
        const { search, startToken, endToken } = userInputs
        const { page, perPage } = pageMaker({ startToken, endToken })

        const fetchedUserData = await UserModel.fetchUserData(
            search,
            page,
            perPage
        )

        if (fetchedUserData !== null) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: fetchedUserData,
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const updateUser = async (userInputs) => {
    try {
        const { userId, email, phone, ...updateData } = userInputs

        let errorobj = {}

        const getEmailData = await UserModel.fetchUserFilterData({
            email: email,
        })

        if (getEmailData !== null && getEmailData._id.toString() !== userId) {
            errorobj = {
                email: "This email Already Exists",
                ...errorobj,
            }

            return makeRespObj({
                status_code: 400,
                message: "User update failed. Please check the provided data.",
                error: errorobj,
            })
        }

        const getPhoneData = await UserModel.fetchUserFilterData({
            phone: phone,
        })

        if (getPhoneData !== null && getPhoneData._id.toString() !== userId) {
            errorobj = {
                phone: "This phone Already Exists",
                ...errorobj,
            }

            return makeRespObj({
                status_code: 400,
                message: "User update failed. Please check the provided data.",
                error: errorobj,
            })
        }

        const updateUser = await UserModel.updateUser(userId, {
            ...updateData,
        })

        if (updateUser) {
            return makeRespObj({
                status_code: 200,
                message: "User data updated successfully",
            })
        } else {
            return makeRespObj({
                status_code: 400,
                message: "Failed to update user data",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getUserById = async (userInputs) => {
    try {
        const { userId } = userInputs

        const getUserData = await UserModel.fetchUserById(userId)

        if (getUserData !== null) {
            return makeRespObj({
                status_code: 200,
                message: "Data get successfully",
                data: getUserData,
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const chnageUserPassword = async (userInputs) => {
    const { userId, oldPassword, newPassword, confirmPassword } = userInputs

    const user = await UserModel.fetchUserById(userId)

    if (!user) {
        return makeRespObj({
            status_code: 404,
            message: "User not found",
        })
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)

    if (!isPasswordValid) {
        return makeRespObj({
            status_code: 401,
            message: "Invalid old password",
        })
    }

    if (newPassword !== confirmPassword) {
        return makeRespObj({
            status_code: 400,
            message: "New password and confirm password do not match",
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    const updateUser = await UserModel.updateUser(userId, {
        password: hashedPassword,
    })

    if (updateUser) {
        return makeRespObj({
            status_code: 200,
            message: "Password changed successfully",
        })
    } else {
        return makeRespObj({
            status_code: 500,
            message: "Failed to change password",
        })
    }
}

const deleteUser = async (userInputs) => {
    try {
        const { userId } = userInputs
        console.log("userId", userId)

        const deleteUser = await UserModel.updateUser(userId, {
            isDeleted: true,
        })

        if (deleteUser) {
            return makeRespObj({
                status_code: 200,
                message: "user deleted successfully",
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Failed to delete user",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const forgotPassword = async (userInputs) => {
    try {
        const { email } = userInputs

        const user = await UserModel.fetchOneUser(email)
        if (!user) {
            return makeRespObj({
                status_code: 401,
                message: "Invalid email",
            })
        }

        const tokenValue = crypto.randomBytes(32).toString("hex")
        user.token = tokenValue
        await user.save()

        const emailContent = `${process.env.BASE_URL}resetPassword/${user._id}/${tokenValue}`

        const subject = "Taj perfumes"
        sendEmail(emailContent, user.email, subject)
        return makeRespObj({
            status_code: 200,
            message: "'Password reset email sent",
        })
    } catch (error) {
        console.error(error)
        return makeRespObj({
            status_code: 500,
            message: "serverError",
        })
    }
}

const resetPassword = async (userInputs) => {
    try {
        const { userId, token, password } = userInputs

        const user = await UserModel.fetchUserById(userId)
        if (!user) {
            return makeRespObj({
                status_code: 401,
                message: "User not found",
            })
        }

        if (user.token !== token) {
            return makeRespObj({
                status_code: 401,
                message: "Invalid or expired token",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user.password = hashedPassword
        user.token = undefined
        await user.save()

        return makeRespObj({
            status_code: 200,
            message: "Password reset successfully",
        })
    } catch (error) {
        console.error(error)
        return makeRespObj({
            status_code: 500,
            message: "An error occurred",
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    getUserData,
    updateUser,
    getUserById,
    deleteUser,
    forgotPassword,
    resetPassword,
    chnageUserPassword,
}
