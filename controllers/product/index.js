const ProductModel = require("../../models/productModel/product")
const VariantPriceModel = require("../../models/variantPriceModel/variantprice")
const { pageMaker, makeRespObj } = require("../../AppUtils/")

//  stepFlag 1  create product

// const productDetails = async (userInputs) => {
//     try {
//         const { subCategoryId, categoryId, ...restData } = userInputs
//         const createProductDetail = await ProductModel.createProduct({
//             categoryData: categoryId,
//             subCategoryData: subCategoryId,
//             ...restData,
//         })

//         if (createProductDetail) {
//             return makeRespObj({
//                 status_code: 200,
//                 message: "Product details add successfully",
//                 data: createProductDetail,
//             })
//         } else {
//             return makeRespObj({
//                 status_code: 200,
//                 message: "Failed to add product details",
//             })
//         }
//     } catch (error) {
//         return makeRespObj({
//             status_code: 500,
//             catchErr: error,
//         })
//     }
// }

const productDetails = async (userInputs) => {
    try {
        const { productId, subCategoryId, categoryId, ...restData } = userInputs

        if (productId) {
            const updatedProduct = await ProductModel.updateProductById({
                productId: productId,
                // categoryData: categoryId,
                subCategoryData: subCategoryId,
                ...restData,
            })

            if (updatedProduct) {
                return makeRespObj({
                    status_code: 200,
                    message: "Product details updated successfully",
                    data: updatedProduct,
                })
            } else {
                return makeRespObj({
                    status_code: 404,
                    message: "Product not found",
                })
            }
        } else {
            const createProductDetail = await ProductModel.createProduct({
                // categoryData: categoryId,
                subCategoryData: subCategoryId,
                ...restData,
            })

            if (createProductDetail) {
                return makeRespObj({
                    status_code: 200,
                    message: "Product details added successfully",
                    data: createProductDetail,
                })
            } else {
                return makeRespObj({
                    status_code: 500,
                    message: "Failed to add product details",
                })
            }
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

//  stepFlag 2
const productManagement = async (userInputs) => {
    try {
        const {
            productId,
            parentProductId,
            brandId,
            productType,
            ...restData
        } = userInputs

        const stepFlag = 2

        if (productType === 1) {
            restData.brandData = brandId
        } else if (productType === 2) {
            restData.parentProductData = parentProductId
        } else if (productType === 3) {
            restData.brandData = null
            restData.parentProductData = null
        }

        const updatedProduct = await ProductModel.productManagement(productId, {
            stepFlag,
            productType,
            ...restData,
        })

        if (updatedProduct) {
            return makeRespObj({
                status_code: 200,
                message: "Product management successful.",
                data: updatedProduct,
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Failed to manage product.",
            })
        }
    } catch (error) {
        console.log("Error:", error)
        return makeRespObj({
            status_code: 500,
            message: "Error occurred during product management.",
            error: error.message,
        })
    }
}

const productPricing = async (userInputs) => {
    try {
        const { productId, variants, hasVariants, ...restData } = userInputs

        const stepFlag = 3

        let createVariantPriceResult

        if (hasVariants || !hasVariants) {
            createVariantPriceResult =
                await VariantPriceModel.createVariantPrices(variants)
        }

        if (createVariantPriceResult) {
            const variantIds =
                createVariantPriceResult &&
                createVariantPriceResult.length > 0 &&
                createVariantPriceResult.map((v) => v._id.toString())

            if (!hasVariants) {
                restData.variantPriceData = variantIds
            }

            const createProductResult =
                variantIds &&
                variantIds.length > 0 &&
                (await ProductModel.productManagement(productId, {
                    ...restData,
                    hasVariants,
                    stepFlag,
                    variantPriceData: variantIds,
                }))

            if (createProductResult) {
                return makeRespObj({
                    status_code: 201,
                    message: "Product Price added successfully.",
                    data: createProductResult,
                })
            } else {
                return makeRespObj({
                    status_code: 500,
                    message: "Failed to add product Price.",
                })
            }
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getProductData = async (userInputs) => {
    try {
        const {
            search,
            startToken,
            endToken,
            isFilterBy,
            priceRange,
            maxPrice,
            minPrice,
            categoryFilters,
            brandIds,
        } = userInputs
        const { page, perPage } = pageMaker({ startToken, endToken })

        let getProductData

        if (isFilterBy === 0) {
            const fetchProductAllData = await ProductModel.fetchProductAllData(
                search,
                page,
                perPage
            )
            getProductData = fetchProductAllData
        } else if (isFilterBy === 1) {
            getProductData = await ProductModel.fetchBrandData(
                search,
                page,
                perPage
            )
        } else if (isFilterBy === 2) {
            getProductData = await ProductModel.onlyParentProductData(
                search,
                page,
                perPage
            )
        } else if (isFilterBy === 3) {
            getProductData = await ProductModel.onlyTajData(
                search,
                page,
                perPage
            )
        } else if (isFilterBy === 4) {
            getProductData = await ProductModel.variantPriceData(
                search,
                startToken,
                endToken,
                priceRange,
                maxPrice,
                minPrice
            )
        } else if (isFilterBy === 5) {
            let categoryIds = []
            let subcategoryIds = []

            if (Array.isArray(categoryFilters)) {
                categoryIds = categoryFilters.map(
                    (filter) => filter.categoryIds
                )

                if (categoryFilters[0]?.subcategoryIds) {
                    subcategoryIds = categoryFilters.map(
                        (filter) => filter.subcategoryIds
                    )
                }
            }

            getProductData = await ProductModel.fetchCategoryData(
                search,
                page,
                perPage,
                categoryIds,
                subcategoryIds
            )
        } else if (isFilterBy === 6) {
            const categoryIds = []
            const subcategoryIds = []

            getProductData = await ProductModel.fetchCategoryData(
                search,
                page,
                perPage,
                categoryIds,
                subcategoryIds
            )
        } else if (isFilterBy === 7) {
            getProductData = await ProductModel.fetchBrandIds(
                search,
                page,
                perPage,
                brandIds
            )
        } else {
            return makeRespObj({
                status_code: 400,
                message: "Invalid isFilterBy value. Use 0, 1, 2, 3, 4,5 or 6.",
            })
        }

        // getProductData.sort((a, b) => {
        //     if (a.parentProductData) return -1
        //     if (b.parentProductData) return 1
        //     return 0
        // })

        if (getProductData) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: getProductData,
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Data not found",
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

const getProductById = async (userInputs) => {
    try {
        const { productId } = userInputs

        const fetchProductById = await ProductModel.fetchProductById(productId)

        return fetchProductById
            ? makeRespObj({
                  status_code: 200,
                  message: "Data found successful",
                  data: fetchProductById,
              })
            : makeRespObj({
                  status_code: 400,
                  message: "Data found failed !",
              })
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

//
const deleteProduct = async (userInputs) => {
    try {
        const { productId } = userInputs
        const updateProduct = await ProductModel.updateProduct(productId, {
            isDeleted: true,
        })

        if (updateProduct) {
            return makeRespObj({
                status_code: 200,
                message: "Product deleted successfully",
            })
        }
         else {
            return makeRespObj({
                status_code: 200,
                message: "Failed to delete Product",
            })
        }
    } catch (error) {
        console.log("error---------------------", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

// deleteVariantPrice
const deleteVariantPrice = async (userInputs) => {
    try {
        const { variantIds } = userInputs
        const deleteVariantPrice = await VariantPriceModel.deleteVariantPrice(
            variantIds
        )

        if (deleteVariantPrice) {
            return makeRespObj({
                status_code: 200,
                message: "variantPrice deleted successfully",
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "Failed to delete variantPrice",
            })
        }
    } catch (error) {
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const chnageProductStatus = async (userInputs) => {
    try {
        const { product_id, is_active } = userInputs

        const updateProduct = await ProductModel.updateProduct(product_id, {
            is_active,
        })
        if (updateProduct) {
            return makeRespObj({
                status_code: 200,
                message: "Product status chnage successfully",
                data: updateProduct,
            })
        } else {
            return makeRespObj({
                status_code: 200,
                message: "failed to chnage product status",
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
    getProductData,
    getProductById,
    chnageProductStatus,
    deleteVariantPrice,
    productDetails,
    productManagement,
    productPricing,
    deleteProduct,
}
