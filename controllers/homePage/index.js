const CategoryModel = require("../../models/categoryModel/category")
const BrandModel = require("../../models/brandModel/brand")
const ProductModel = require("../../models/productModel/product")
const SubCategoryModel = require("../../models/subCategoryModel/subcategory")
const { pageMaker, makeRespObj } = require("../../AppUtils/")

const categoryList = async () => {
    try {
        const fetchCategoryData = await CategoryModel.homePageCategory()

        if (fetchCategoryData) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: fetchCategoryData,
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
            })
        }
    } catch (error) {
        console.log("<------HomeCategoryList--->", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getBrandData = async () => {
    try {
        const brandData = await BrandModel.homePageBrand()

        if (brandData) {
            return makeRespObj({
                status_code: 200,
                message: "Data found successfully",
                data: brandData,
            })
        } else {
            return makeRespObj({
                status_code: 404,
                message: "Data not found",
            })
        }
    } catch (error) {
        console.log("<----homePageBrandData---->", error)
        return makeRespObj({
            status_code: 500,
            catchErr: error,
        })
    }
}

const getProductData = async (userInputs) => {
    try {
        const { categoryId } = userInputs

        const productData = await ProductModel.homePageProduct()

        if (productData) {
            const subcategory = productData.subCategoryData
            const category = subcategory.categoryData

            const categoryData = category._id.toString()

            if (categoryData === categoryId) {
                return makeRespObj({
                    status_code: 200,
                    message: "Data found successfully",
                    data: productData,
                })
            } else {
                return makeRespObj({
                    status_code: 404,
                    message: "Data not found",
                })
            }
        } else {
            return makeRespObj({
                status_code: 404,
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

const getProduct = async (userInputs) => {
    try {
        const { search, startToken, endToken, badgeType } = userInputs
        const { page, perPage } = pageMaker({ startToken, endToken })

        let getProductData

        if (badgeType === 1) {
            const newArrivalProduct = await ProductModel.newArrivalProduct(
                search,
                page,
                perPage
            )
            getProductData = newArrivalProduct
        } else if (badgeType === 2) {
            const bestSeller = await ProductModel.trendingNow(
                search,
                page,
                perPage
            )
            getProductData = bestSeller
        } else if (badgeType === 3) {
            const bestSeller = await ProductModel.bestSeller(
                search,
                page,
                perPage
            )
            getProductData = bestSeller
        } else {
            return makeRespObj({
                status_code: 400,
                message: "Invalid badgeType value. Use  1, 2, 3.",
            })
        }

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

module.exports = {
    categoryList,
    getBrandData,
    getProductData,
    getProduct,
}
