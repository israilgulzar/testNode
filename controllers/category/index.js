
const CategoryModel = require("../../models/categoryModel/category")
const SubCategoryModel = require("../../models/subCategoryModel/subcategory")
const { pageMaker, makeRespObj } = require("../../AppUtils/")

const createCategory = async (userInputs) => {
    try {
        const { categoryName, isActive } = userInputs
        let errorObj = {}
        const getCategoryData = await CategoryModel.filterCategoryData({
            categoryName: categoryName,
        })

        if (getCategoryData !== null) {
            errorObj = {
                categoryName: "This categoryName already exists",
                ...errorObj,
            }

            return makeRespObj({
                status_code: 400,
                message: "Category creation failed.",
                error: errorObj,
            })
        }

        const createCategoryResult = await CategoryModel.createCategory({
            categoryName,
            isActive,
        })

        if (createCategoryResult) {
            return makeRespObj({
                status_code: 201,
                message: "Category has been created successfully.",
                data: createCategoryResult,
            })
        } else {
            return makeRespObj({
                status_code: 400,
                message: "Failed to create the category.",
            })
        }
    } catch (error) {
        console.log("<----createCategory------>", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getCategoryData = async (userInputs) => {
    try {
        const { search, startToken, endToken } = userInputs
        const { page, perPage } = pageMaker({ startToken, endToken })

        const fetchCategoryData = await CategoryModel.fetchCategoryData(
            search,
            page,
            perPage
        )
        const recordCount = await CategoryModel.fetchCategoryCount(search)
        if (fetchCategoryData.length > 0) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: {
                    categoryData: fetchCategoryData,
                    recordCount: recordCount,
                },
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
                data: {
                    categoryData: [],
                    recordCount: 0,
                },
            })
        }
    } catch (error) {
        console.log("<-----getCategoryData---->", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const customerCategoryList = async (userInputs) => {
    try {
        const { search, startToken, endToken } = userInputs
        const { page, perPage } = pageMaker({ startToken, endToken })

        const fetchCategoryData = await CategoryModel.customerCategoryList(
            search,
            page,
            perPage
        )
        const recordCount = await CategoryModel.CusCategoryCount(search)
        if (fetchCategoryData.length > 0) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: {
                    categoryData: fetchCategoryData,
                    recordCount: recordCount,
                },
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
                data: {
                    categoryData: [],
                    recordCount: 0,
                },
            })
        }
    } catch (error) {
        console.log("<------customerCategoryList--->", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

// const updateCategory = async (userInputs) => {
//     try {
//         const { categoryId, categoryName, isActive } = userInputs

//         const existingCategory = await CategoryModel.filterCategoryData({
//             categoryName: categoryName,
//         })

//         if (
//             existingCategory &&
//             existingCategory._id.toString() !== categoryId
//         ) {
//             return makeRespObj({
//                 status_code: 400,
//                 message: "This categoryName already exists",
//             })
//         }

//         const updatedCategory = await CategoryModel.updateCategory(categoryId, {
//             categoryName,
//             isActive,
//         })

//         if (updatedCategory) {
//             return makeRespObj({
//                 status_code: 200,
//                 message: "Category updated successfully",
//                 data: updatedCategory,
//             })
//         } else {
//             return makeRespObj({
//                 status_code: 400,
//                 message: "Failed to update category",
//             })
//         }
//     } catch (error) {
//         console.log("<----updateCategory---->", error)
//         return makeRespObj({
//             status_code: 500,
//             catchErr: error,
//         })
//     }
// }

const updateCategory = async (userInputs) => {
    try {
        const { categoryId, categoryName, isActive } = userInputs

        if (categoryName) {
            const existingCategory = await CategoryModel.filterCategoryData({
                categoryName: categoryName,
            })

            if (existingCategory && existingCategory._id.toString() !== categoryId) {
                return makeRespObj({
                    status_code: 400,
                    message: "This categoryName already exists",
                })
            }
        }

        const updatedCategory = await CategoryModel.updateCategory(categoryId, {
            categoryName,
            isActive,
        })

        if (updatedCategory) {
            return makeRespObj({
                status_code: 200,
                message: "Category updated successfully",
                data: updatedCategory,
            })
        } else {
            return makeRespObj({
                status_code: 400,
                message: "Failed to update category",
            })
        }
    } catch (error) {
        console.log("<----updateCategory---->", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}


const chnageCategoryStatus = async (userInputs) => {
    try {
        const { categoryId, isActive } = userInputs

        const updateCategory = await CategoryModel.updateCategory(categoryId, {
            isActive,
        })

        if (updateCategory) {
            return makeRespObj({
                status_code: 200,
                message: "category status chnage successfully.",
            })
        } else {
            return makeRespObj({
                status_code: 400,
                message: "failed to status chnage category ",
            })
        }
    } catch (error) {
        console.log("<---chnageCategoryStatus-->", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getCategoryById = async (userInputs) => {
    try {
        const { categoryId } = userInputs
        const getCategoryData = await CategoryModel.fetchCategoryById(
            categoryId
        )
        if (getCategoryData) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: getCategoryData,
            })
        } else {
            return makeRespObj({
                status_code: 400,
                message: "Data not found",
            })
        }
    } catch (error) {
        console.log("<-----getCategoryById-->", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const deleteCategory = async (userInputs) => {
    try {
        const { categoryId } = userInputs

        const deleteCategory = await CategoryModel.updateCategory(categoryId, {
            isDeleted: true,
        })

        if (deleteCategory) {
            return makeRespObj({
                status_code: 200,
                message: "category deleted successfully",
            })
        } else {
            return makeRespObj({
                status_code: 400,
                message: "Failed to delete category",
            })
        }
    } catch (error) {
        console.log("<---deleteCategory---->", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const categoryDropdown = async (userInputs) => {
    try {
        const { search, startToken, endToken } = userInputs

        const { page, perPage } = pageMaker({ startToken, endToken })

        const fetchCategoryData = await CategoryModel.categoryDropdown(
            search,
            page,
            perPage
        )

        if (fetchCategoryData.length > 0) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: fetchCategoryData,
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Data not found",
                data: [],
            })
        }
    } catch (error) {
        console.log("<---categoryDropdown--->", error)
        return makeRespObj({
            status_code: 500,
        })
    }
}

const updateCategoryPosition = async (userInputs) => {

    try{
        const { category_position } = userInputs;

        if (category_position !== undefined && category_position !== null) {
            let idArray = JSON.parse(category_position)
            let counter = 0

            await new Promise(async (resolve, reject) => {
                await idArray.map(async (element, index) => {
                    await new Promise(async (resolve, reject) => {

                        counter = counter + 1;
                        await CategoryModel.updateCategory(element.categoryId, {
                            shortOrder: counter
                        })

                        let subcategoryIdArray = element.subCategoryId

                        if (subcategoryIdArray.length > 0) {
                            await subcategoryIdArray.map(async (subcategoryElement, subcategoryIndex) => {
                                await SubCategoryModel.updateSubCategory(subcategoryElement, {
                                    shortOrder: subcategoryIndex + 1,
                                    categoryId: element.categoryId
                                })

                                if (subcategoryIdArray.length === (subcategoryIndex + 1)) {
                                    resolve(true)
                                }
                            })
                        } else {
                            resolve(true)
                        }
                    })
                    if (idArray.length === (index + 1)) {
                        resolve(true)
                    }
                });
            })

            return {
                status: true,
                status_code: 200,
                message: "Position changed successfully"
            };
        } else {
            return {
                status: false,
                status_code: 400,
                message: "Falied to change position"
            };
        }
    } catch (error) {
        // Handle unexpected errors
        console.error('Unexpected error detected :: ',error)
        return {
            status: false,
            status_code: 500,
            message: 'An unexpected error occurred',
            error: { server_error: 'An unexpected error occurred' },
            data: null,
        };
    }

}

const getCategorysWithSubCategoryData = async (userInputs) => {

    try{
        const getCategoryData = await CategoryModel.fetchCategoryList();

        let promiseData = null
        let categoryData = []
        let categoryIndexCount = 0
        if (getCategoryData !== undefined && getCategoryData !== null && getCategoryData.length > 0) {
            promiseData = await new Promise(async (resolve, reject) => {
                await getCategoryData.map(async (category, categoryIndex) => {
                    categoryData[categoryIndex] = {
                        _id: category._id,
                        categoryName: category.categoryName,
                        shortOrder: category.shortOrder,
                        sub_category: []
                    }
                    await new Promise(async (resolve, reject) => {
                        let subcategory = await SubCategoryModel.fetchSubCategorys('', category._id);

                        if (subcategory !== null) {
                            categoryData[categoryIndex]["sub_category"] = subcategory

                            categoryIndexCount = categoryIndexCount + 1
                            await resolve(true)
                        } else {
                            categoryIndexCount = categoryIndexCount + 1
                            await resolve(true)
                        }

                    })

                    if (getCategoryData.length === categoryIndexCount) {
                        await resolve(categoryData)
                    }
                });
            })

        }

        if (getCategoryData !== null) {
            return {
                status: true,
                status_code: 200,
                message: "Data get successfully",
                data: promiseData
            };
        } else {
            return {
                status: false,
                status_code: 404,
                message: "Data not found",
                data: null
            };
        }
    } catch (error) {
        // Handle unexpected errors
        console.error('Unexpected error detected :: ',error)
        return {
            status: false,
            status_code: 500,
            message: 'An unexpected error occurred',
            error: { server_error: 'An unexpected error occurred' },
            data: null,
        };
    }
}

module.exports = {
    createCategory,
    getCategoryData,
    updateCategory,
    getCategoryById,
    deleteCategory,
    categoryDropdown,
    chnageCategoryStatus,
    customerCategoryList,
    updateCategoryPosition,
    updateCategoryPosition,
    getCategorysWithSubCategoryData
}
