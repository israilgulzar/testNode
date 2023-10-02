
const variantModel = require("../../models/variantModel/variant")
const variantPriceModel = require("../../models/variantPriceModel/schema")
const { pageMaker, makeRespObj } = require("../../AppUtils/")

const createVariant = async (userInputs) => {
    try {
        const { variantType, isActive } = userInputs

        let errorObj = {}
        const variantTypeFilter = await variantModel.variantTypeFilter({
            variantType: variantType,
        })
        if (variantTypeFilter !== null) {
            errorObj = {
                variantType: "This variantType Already Exists",
                ...errorObj,
            }

            return makeRespObj({
                status_code: 400,
                message: "variant creation failed.",
                error: errorObj,
            })
        }

        const createVariant = await variantModel.createVariant({
            variantType,
            isActive,
        })
        return (
            createVariant &&
            makeRespObj({
                status_code: 201,
                message: "Variant created successfully.",
                data: createVariant,
            })
        )
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getVariantData = async (userInputs) => {
    try {
        const { search, startToken, endToken } = userInputs
        const { page, perPage } = pageMaker({ startToken, endToken })

        const fetchVariantData = await variantModel.fetchVariantData(
            search,
            page,
            perPage
        )

        const recordCount = await variantModel.variantCount(search)
        if (fetchVariantData.length > 0) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: {
                    variantData: fetchVariantData,
                    recordCount: recordCount,
                },
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
                data: {
                    variantData: [],
                    recordCount: 0,
                },
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getVariantDataCus = async (userInputs) => {
    try {
        const { search, startToken, endToken } = userInputs
        const { page, perPage } = pageMaker({ startToken, endToken })

        const fetchVariantData = await variantModel.fetchVariantDataCus(
            search,
            page,
            perPage
        )

        const recordCount = await variantModel.variantCountCus(search)
        if (fetchVariantData.length > 0) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: {
                    variantData: fetchVariantData,
                    recordCount: recordCount,
                },
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
                data: {
                    variantData: [],
                    recordCount: 0,
                },
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const updateVariant = async (userInputs) => {
    try {
        const { variantId, variantType, isActive } = userInputs

        const updateVariant = await variantModel.updateVariant(variantId, {
            variantType,
            isActive,
        })

        if (updateVariant) {
            return makeRespObj({
                status_code: 200,
                message: "Variant updated successfully",
                data: updateVariant,
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "failed to update Variant ",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const chnageVariantStatus = async (userInputs) => {
    try {
        const { variantId, isActive } = userInputs

        const updateVariant = await variantModel.updateVariant(variantId, {
            isActive,
        })

        if (updateVariant) {
            return makeRespObj({
                status_code: 200,
                message: "Variant chnage Status successfully",
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "failed to chnage Status Variant ",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getVariantById = async (userInputs) => {
    const { variantId } = userInputs

    try {
        const getVariantById = await variantModel.fetchVariantById(variantId)
        return getVariantById
            ? makeRespObj({
                  status_code: 200,
                  message: "Data get successful",
                  data: getVariantById,
              })
            : makeRespObj({
                  status_code: 400,
                  message: "Data get failed !",
              })
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: "______getVariantById _______" + error,
        })
    }
}

// const deleteVariant = async (userInputs) => {
//     try {
//         const { variantId } = userInputs

//         const extinginVariant = await productModel.find()
//         console.log("extinginVariant", extinginVariant)

//         const deleteVariant = await variantModel.updateVariant(variantId, {
//             isDeleted: true,
//         })
//         if (deleteVariant) {
//             return makeRespObj({
//                 status_code: 200,
//                 message: "Variant deleted successfully",
//             })
//         } else {
//             return makeRespObj({
//                 status_code: 200,
//                 message: "Failed to delete Variant",
//             })
//         }
//     } catch (error) {
//         return makeRespObj({
//             status_code: 500,
//             catchErr: error,
//         })
//     }
// }

const deleteVariant = async (userInputs) => {
    try {
        const { variantId } = userInputs

        const variantPriceDocument = await variantPriceModel.findOne({
            variantData: variantId,
        })
        
        if (variantPriceDocument) {
            const variantData = variantPriceDocument.variantData.toString()
            if (variantData === variantId) {
                return makeRespObj({
                    status_code: 400,
                    message:
                        "This variant is used in other products and cannot be deleted.",
                })
            }
        }

        const deleteVariant = await variantModel.updateVariant(variantId, {
            isDeleted: true,
        })

        if (deleteVariant) {
            return makeRespObj({
                status_code: 200,
                message: "Variant deleted successfully",
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Failed to delete Variant",
            })
        }
    } catch (error) {
        console.log(error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const variantDropdown = async (userInputs) => {
    try {
        const { search, startToken, endToken } = userInputs

        const { page, perPage } = pageMaker({ startToken, endToken })

        const fetchVariantData = await variantModel.variantDropdown(
            search,
            page,
            perPage
        )
        const recordCount = await variantModel.variantCountCus(search)

        if (fetchVariantData) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: {
                    variantData: fetchVariantData,
                    recordCount: recordCount,
                },
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
                data: {
                    variantData: [],
                    recordCount: 0,
                },
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
        })
    }
}

module.exports = {
    createVariant,
    getVariantData,
    updateVariant,
    getVariantById,
    deleteVariant,
    variantDropdown,
    chnageVariantStatus,
    getVariantDataCus,
}
