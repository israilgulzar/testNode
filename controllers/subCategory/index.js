
const SubCategoryModel = require("../../models/subCategoryModel/subcategory")
const { pageMaker, makeRespObj } = require("../../AppUtils/")

const createSubCategory = async (userInputs) => {
    try {
        const { categoryId, subCategoryName, isActive } = userInputs
        let errorObj = {}

        const getFilterData = await SubCategoryModel.filterSubCategoryData({
            subCategoryName: subCategoryName,
        })

        if (getFilterData !== null) {
            errorObj = {
                subCategoryName: "This subCategoryName already exists",
                ...errorObj,
            }

            return makeRespObj({
                status_code: 400,
                message: "SubCategory creation failed.",
                error: errorObj,
            })
        }

        const createSubCategoryResult =
            await SubCategoryModel.createSubCategory({
                categoryData: categoryId,
                subCategoryName,
                isActive,
            })

        if (createSubCategoryResult) {
            return makeRespObj({
                status_code: 201,
                message: "SubCategory has been created successfully.",
                data: createSubCategoryResult,
            })
        } else {
            return makeRespObj({
                status_code: 400,
                message: "Failed to create the subCategory.",
            })
        }
    } catch (err) {
        console.log("<---createSubCategory-->", err)
        return makeRespObj({
            status_code: 500,
            catchErr: err,
        })
    }
}

const getSubCategoryData = async (userInputs) => {
    try {
        const { search, startToken, endToken } = userInputs
        const { page, perPage } = pageMaker({ startToken, endToken })

        const getSubCategoryData = await SubCategoryModel.fetchSubCategoryData(
            search,
            page,
            perPage
        )
        const recordCount = await SubCategoryModel.subcategoryCount(search)

        if (getSubCategoryData) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                // data:getSubCategoryData
                data: {
                    subCategoryData: getSubCategoryData,
                    recordCount: recordCount,
                },
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
                data: {
                    subCategoryData: [],
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

const getSubCategoryDataCus = async (userInputs) => {
    try {
        const { search, startToken, endToken } = userInputs
        const { page, perPage } = pageMaker({ startToken, endToken })

        const getSubCategoryData =
            await SubCategoryModel.fetchSubCategoryDataCus(
                search,
                page,
                perPage
            )
        if (getSubCategoryData) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: getSubCategoryData,
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found ",
                data: {
                    subCategoryData: [],
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

const updateSubCategory = async (userInputs) => {
    try {
        const { subCategoryId, categoryId, subCategoryName, isActive } =
            userInputs

        if (subCategoryName) {
            const existingSubCategory =
                await SubCategoryModel.filterSubCategoryData({
                    subCategoryName: subCategoryName,
                })

            if (
                existingSubCategory &&
                existingSubCategory._id.toString() !== subCategoryId
            ) {
                return makeRespObj({
                    status_code: 400,
                    message: "This subCategoryName already exists",
                })
            }
        }

        const updatedSubCategory = await SubCategoryModel.updateSubCategory(
            subCategoryId,
            {
                categoryData: categoryId,
                subCategoryName,
                isActive,
            }
        )

        if (updatedSubCategory) {
            return makeRespObj({
                status_code: 200,
                message: "SubCategory updated successfully.",
            })
        } else {
            return makeRespObj({
                status_code: 400,
                message: "Failed to update SubCategory",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const chnageSubCategoryStatus = async (userInputs) => {
    try {
        const { subCategoryId, isActive } = userInputs

        const updateSubCategory = await SubCategoryModel.updateSubCategory(
            subCategoryId,
            {
                isActive,
            }
        )

        if (updateSubCategory) {
            return makeRespObj({
                status_code: 200,
                message: "subCategory status chnage successfully.",
                data: updateSubCategory,
            })
        } else {
            return makeRespObj({
                status_code: 400,
                message: "failed to status chnage subCategory ",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getSubCategoryById = async (userInputs) => {
    try {
        const { subCategoryId } = userInputs

        const getSubCategoryById = await SubCategoryModel.fetchSubCategoryById(
            subCategoryId
        )

        return getSubCategoryById
            ? makeRespObj({
                  status_code: 200,
                  message: "Data get successful",
                  data: getSubCategoryById,
              })
            : makeRespObj({
                  status_code: 400,
                  message: "Data get failed !",
              })
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const deleteSubCategory = async (userInputs) => {
    try {
        const { subCategoryId } = userInputs
        const deleteSubCategory = await SubCategoryModel.updateSubCategory(
            subCategoryId,
            {
                isDeleted: true,
            }
        )

        if (deleteSubCategory) {
            return makeRespObj({
                status_code: 200,
                message: "subCategory deleted successfully",
            })
        } else {
            return makeRespObj({
                status_code: 400,
                message: "Failed to delete subCategory",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const subCategoryDropdown = async (userInputs) => {
    try {
        const { search, startToken, endToken } = userInputs

        const { page, perPage } = pageMaker({ startToken, endToken })

        const fetchSubCategoryData = await SubCategoryModel.subCategoryDropdown(
            search,
            page,
            perPage
        )
        if (fetchSubCategoryData) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: fetchSubCategoryData,
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Data not found",
                data: [],
            })
        }
    } catch (error) {
        console.error(`Error in fetchSubCategoryData:, ${error}`)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

module.exports = {
    createSubCategory,
    getSubCategoryData,
    updateSubCategory,
    getSubCategoryById,
    deleteSubCategory,
    subCategoryDropdown,
    chnageSubCategoryStatus,
    getSubCategoryDataCus,
}
