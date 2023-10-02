
const adminModel = require("../../models/adminModel/admin")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { pageMaker, makeRespObj } = require("../../AppUtils/")

const createAdmin = async (userInputs) => {
    try {
        const { name, email, password } = userInputs

        const existingAdmin = await adminModel.fetchOneAdmin(email)
        if (existingAdmin) {
            return makeRespObj({
                status_code: 403,
                message: "Admin Already Exists. Please Login",
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const createAdmin = await adminModel.createAdmin({
            name,
            email,
            password: hashedPassword,
        })

        return makeRespObj({
            status_code: 201,
            message: "Admin has been created successfully.",
            data: createAdmin,
        })
    } catch (error) {
        console.log("<<---createAdmin--->>", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const loginAdmin = async (userInputs) => {
    try {
        const { email, password } = userInputs

        const admin = await adminModel.fetchOneAdmin(email)

        if (!admin) {
            return makeRespObj({
                status_code: 401,
                message: "Invalid email.",
                error: "Invalid credentials or admin not found.",
            })
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password)

        if (!isPasswordValid) {
            return makeRespObj({
                status_code: 401,
                message: "Invalid password",
                error: "Invalid credentials or admin not found.",
            })
        }

        const token = jwt.sign(
            {
                adminID: admin._id,
                email: admin.email,
            },
            process.env.JWT_SECRET_ADMIN,
            {
                expiresIn: "365d",
            }
        )

        return makeRespObj({
            status_code: 201,
            message: "Admin Login Successful",
            data: { adminData: admin, token: token },
        })
    } catch (error) {
        console.log("<------loginAdmin------->", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getAdminData = async (userInputs) => {
    try {
        const { search, startToken, endToken } = userInputs
        const { page, perPage } = pageMaker({ startToken, endToken })

        const getAdminData = await adminModel.fetchAdminData(
            search,
            page,
            perPage
        )

        if (getAdminData.length > 0) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: getAdminData,
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
                data: [],
            })
        }
    } catch (error) {
        console.log("<<<-----getAdminData----->>", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const updateAdmin = async (userInputs) => {
    try {
        const { adminId, name, email } = userInputs

        const existingAdmin = await adminModel.fetchOneAdmin(email)

        if (existingAdmin && existingAdmin._id.toString() !== adminId) {
            return makeRespObj({
                status_code: 400,
                message: "Admin with this email already exists.",
            })
        }

        const updatedAdmin = await adminModel.updateAdmin(adminId, {
            name,
            email,
        })

        if (updatedAdmin) {
            return makeRespObj({
                status_code: 200,
                message: "Admin updated successfully",
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Failed to update Admin",
            })
        }
    } catch (error) {
        console.log("<<<----updateAdmin------>>", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getAdminById = async (userInputs) => {
    try {
        const { adminId } = userInputs

        const getAdminData = await adminModel.fetchAdminById(adminId)

        if (getAdminData) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: getAdminData,
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
            })
        }
    } catch (error) {
        console.log("<<<----getAdminById------>>", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const deleteAdmin = async (userInputs) => {
    try {
        const { adminId } = userInputs

        const deleteAdmin = await adminModel.updateAdmin(adminId,{
            isDeleted: true,
        })

        if (deleteAdmin) {
            return makeRespObj({
                status_code: 200,
                message: "Admin deleted successfully",
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Failed to delete Admin",
            })
        }
    } catch (error) {
        console.log("<<<----deleteAdmin------>>", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

module.exports = {
    createAdmin,
    loginAdmin,
    getAdminData,
    updateAdmin,
    getAdminById,
    deleteAdmin,
}
