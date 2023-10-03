
const UserAddressModel = require("../../models/userAddressModel/useradress")

const { pageMaker, makeRespObj } = require("../../AppUtils/")

const createUserAddress = async (userInputs) => {
    try {
        const { userId, ...userAddressData } = userInputs

        const createUserAddress = await UserAddressModel.createUserAddress({
            userData: userId,
            ...userAddressData,
        })

        return makeRespObj({
            status_code: 201,
            message: "UserAddress created successfully.",
            data: createUserAddress,
        })
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getUserAddressData = async (userInputs) => {
    try {
        const { search, startToken, endToken } = userInputs
        const { page, perPage } = pageMaker({ startToken, endToken })

        const fetchUserAddressData =
            await UserAddressModel.fetchUserAddressData(search, page, perPage)

        if (fetchUserAddressData !== null) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: fetchUserAddressData,
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

const updateUserAddress = async (userInputs) => {
    try {
        const { userAddressId, userId, ...updateUserAddressData } = userInputs

        const updateUserAddress = await UserAddressModel.updateUserAddress(
            userAddressId,
            {
                userData: userId,

                ...updateUserAddressData,
            }
        )

        if (updateUserAddress) {
            return makeRespObj({
                status_code: 200,
                message: "userAddress updated successfully",
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "failed to update userAddress",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getUserAddressById = async (userInputs) => {
    try {
        const { userAddressId } = userInputs

        const getUserAddressData = await UserAddressModel.fetchUserAddressById(
            userAddressId
        )

        if (getUserAddressData !== null) {
            return makeRespObj({
                status_code: 200,
                message: "Data get successfully",
                data: getUserAddressData,
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

const deleteUserAddress = async (userInputs) => {
    try {
        const { userAddressId } = userInputs

        const deleteUserAddress = await UserAddressModel.updateUserAddress(
            userAddressId,{
                isDeleted: true

            }
        )

        if (deleteUserAddress) {
            return makeRespObj({
                status_code: 200,
                message: "userAddress deleted successfully",
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Failed to delete userAddress",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

module.exports = {
    deleteUserAddress,
    getUserAddressById,
    updateUserAddress,
    getUserAddressData,
    createUserAddress,
}
