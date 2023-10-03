const Product = require("./schema")
const mongoose = require("mongoose")
const createProduct = async (insertData) => {
    try {
        const product = new Product(insertData)
        const productResult = await product.save()
        return productResult
    } catch (err) {
        console.error("Error creating product:", err.message)
        return null
    }
}

const fetchProductbyId = async (productId) => {
    const productData = await Product
        .findOne({
            _id: productId,
            isDeleted: false,
        })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return productData
}

// const updateProduct = async (updateData) => {
//     try {
//         const result = await Product.updateOne(
//             { _id: updateData.productId },
//             updateData
//         )
//         if (result.ok === 1) {
//             return true
//         } else {
//             return false
//         }
//     } catch (err) {
//         console.error("Error updating product:", err.message)
//         return false
//     }
// }

const updateProduct = async (productId, updateData) => {
    const productResult = Product.updateOne({ _id: productId }, updateData)
        .then((model) => {
            return true
        })
        .catch((err) => {
            console.log(err)
            return false
        })

    return productResult
}

const productManagement = (productId, updateData) => {
    return Product.findOneAndUpdate({ _id: productId }, updateData, {
        new: true,
    })
        .then((updatedProduct) => {
            if (updatedProduct) {
                return updatedProduct
            } else {
                return null
            }
        })
        .catch((err) => {
            console.log("Error:", err)
            return null
        })
}

const fetchBrandData = (search, start, limit) => {
    const searchFilter = []

    if (search !== "") {
        searchFilter.push({
            name: {
                $regex: ".*" + search + ".*",
                $options: "i",
            },
        })
    }

    searchFilter.push({
        isDeleted: false,
    })

    const query = {
        parentProductData: null,
        stepFlag: 3,
        brandData: { $exists: true },
    }

    if (searchFilter.length > 0) {
        query.$and = searchFilter
    }

    return Product.find(query)

        .populate({
            path: "subCategoryData",
            select: "subCategoryName",
            match: {
                $and: [{ isDeleted: false }, { isActive: true }],
            },
            populate: {
                path: "categoryData",
                model: "Category",
                select: "categoryName",
                match: { isDeleted: false },
            },
        })

        .populate({
            path: "brandData",
            select: "brandName",
            match: { isDeleted: false },
        })
        .populate({
            path: "variantPriceData",
            select: [
                "variantData",
                "price",
                "oldPrice",
                "sliderImages",
                "discounts",
                "stock",
            ],
            populate: {
                path: "variantData",
                model: "Variant",
                select: "variantType",
                match: { isDeleted: false },
            },
        })
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((productData) => {
            return productData
        })
        .catch((error) => {
            console.error("Error fetchBrandData data:", error)
            return null
        })
}

const fetchProductAllData = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    name: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
    }

    searchFilter.push({
        isDeleted: false,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}
    return Product.find(query)

        .populate({
            path: "subCategoryData",
            select: "subCategoryName",
            match: {
                $and: [{ isDeleted: false }, { isActive: true }],
            },
            populate: {
                path: "categoryData",
                model: "Category",
                select: "categoryName",
                match: { isDeleted: false },
            },
        })

        .populate({
            path: "brandData",
            select: "brandName",
            match: { isDeleted: false },
        })

        .populate({
            path: "variantPriceData",
            select: [
                "variantData",
                "price",
                "oldPrice",
                "sliderImages",
                "discounts",
                "stock",
            ],
            populate: {
                path: "variantData",
                model: "Variant",
                select: "variantType",
                match: { isDeleted: false },
            },
        })
        .populate("parentProductData")
        .skip(start)
        .limit(limit)
        .then((productData) => {
            console.log("Products:", productData)
            return productData
        })
        .catch((error) => {
            console.error("Error fetching productaLL data:", error)
            return null
        })
}

const onlyParentProductData = (search, start, limit) => {
    const searchFilter = []

    if (search !== "") {
        searchFilter.push({
            name: {
                $regex: ".*" + search + ".*",
                $options: "i",
            },
        })
    }

    searchFilter.push({
        isDeleted: false,
    })

    const query = {
        stepFlag: 3,
        parentProductData: { $exists: true },
    }

    if (searchFilter.length > 0) {
        query.$and = []

        if (searchFilter.length > 0) {
            query.$and.push({ $or: searchFilter })
        }
    }

    return Product.find(query)

        .populate({
            path: "subCategoryData",
            select: "subCategoryName",
            match: {
                $and: [{ isDeleted: false }, { isActive: true }],
            },
            populate: {
                path: "categoryData",
                model: "Category",
                select: "categoryName",
                match: { isDeleted: false },
            },
        })

        .populate({
            path: "brandData",
            select: "brandName",
            match: { isDeleted: false },
        })
        .populate({
            path: "variantPriceData",
            select: [
                "variantData",
                "price",
                "oldPrice",
                "sliderImages",
                "discounts",
                "stock",
            ],
            populate: {
                path: "variantData",
                model: "Variant",
                select: "variantType",
                match: {
                    $and: [{ isDeleted: false }, { isActive: true }],
                },
            },
        })
        .populate("parentProductData")
        .sort({ parentProductData: -1 })
        .skip(start)
        .limit(limit)
        .then((productData) => {
            return productData
        })
        .catch((error) => {
            console.error("Error fetching filtered product data:", error)
            return null
        })
}

const onlyTajData = (search, start, limit) => {
    const searchFilter = []

    if (search !== "") {
        searchFilter.push({
            name: {
                $regex: ".*" + search + ".*",
                $options: "i",
            },
        })
    }

    searchFilter.push({
        isDeleted: false,
    })

    const query = {
        parentProductData: { $exists: false },
        stepFlag: 3,
    }
    if (searchFilter.length > 0) {
        query.$and = searchFilter
    }

    return Product.find(query)

        .populate({
            path: "subCategoryData",
            select: "subCategoryName",
            match: {
                $and: [{ isDeleted: false }, { isActive: true }],
            },
            populate: {
                path: "categoryData",
                model: "Category",
                select: "categoryName",
                match: { isDeleted: false },
            },
        })

        .populate({
            path: "brandData",
            select: "brandName",
            match: { isDeleted: false },
        })

        .populate({
            path: "variantPriceData",
            select: [
                "variantData",
                "price",
                "oldPrice",
                "sliderImages",
                "discounts",
                "stock",
            ],
            populate: {
                path: "variantData",
                model: "Variant",
                select: "variantType",
                match: {
                    isDeleted: false,
                },
            },
        })
        .skip(start)
        .limit(limit)
        .then((productData) => {
            return productData
        })
        .catch((error) => {
            console.error("Error fetching filtered product data:", error)
            return null
        })
}

const deleteProduct = async (productId) => {
    const productResult = await Product.deleteOne({
        _id: productId,
    })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return productResult
}

const fetchProductById = (productId) => {
    return Product.findOne({
        _id: productId,
        isDeleted: false,
    })

        .populate({
            path: "subCategoryData",
            select: "subCategoryName",
            match: {
                $and: [{ isDeleted: false }, { isActive: true }],
            },
            populate: {
                path: "categoryData",
                model: "Category",
                select: "categoryName",
                match: { isDeleted: false },
            },
        })

        .populate({
            path: "brandData",
            select: "brandName",
            match: { isDeleted: false },
        })

        .populate({
            path: "variantPriceData",
            select: [
                "variantData",
                "price",
                "oldPrice",
                "sliderImages",
                "discounts",
                "stock",
            ],
            populate: {
                path: "variantData",
                model: "Variant",
                select: "variantType",
                match: {
                    isDeleted: false,
                },
            },
        })
        .populate("parentProductData")
        .then((productData) => {
            return productData
        })
        .catch((error) => {
            console.error("Error fetching productById data:", error)
            return null
        })
}

// const fetchCategoryData = async (
//     search,
//     start,
//     limit,
//     categoryIds,
//     subcategoryIds
// ) => {
//     try {
//         const searchFilter = []
//         const categoryFilter = []

//         if (search !== "") {
//             searchFilter.push({
//                 name: {
//                     $regex: ".*" + search + ".*",
//                     $options: "i",
//                 },
//             })
//         }

//         if (Array.isArray(categoryIds) && categoryIds.length > 0) {
//             categoryFilter.push({
//                 "subCategoryData.categoryData": {
//                     $in: categoryIds,
//                 },
//             })
//         }

//         if (Array.isArray(subcategoryIds) && subcategoryIds.length > 0) {
//             searchFilter.push({
//                 subCategoryData: {
//                     $in: subcategoryIds,
//                 },
//             })
//         }

//         const query = {
//             $or: [{ $and: searchFilter }, { $and: categoryFilter }],
//         }

//         const productData = await Product.find(query)
//             .populate({
//                 path: "subCategoryData",
//                 select: "subCategoryName",
//                 match: {
//                     $and: [{ isDeleted: false }, { isActive: true }],
//                 },
//                 populate: {
//                     path: "categoryData",
//                     model: "Category",
//                     select: "categoryName",
//                     match: { $and: [{ isDeleted: false }, { isActive: true }] },
//                 },
//             })

//             .populate({
//                 path: "brandData",
//                 select: ["brandName"],
//             })
//             .populate({
//                 path: "variantPriceData",
//                 select: [
//                     "variantData",
//                     "price",
//                     "oldPrice",
//                     "sliderImages",
//                     "discounts",
//                     "stock",
//                 ],
//                 populate: {
//                     path: "variantData",
//                     model: "Variant",
//                     select: "variantType",
//                 },
//             })
//             .populate("parentProductData")
//             .skip(start)
//             .limit(limit)

//         return productData
//     } catch (error) {
//         console.error("Error fetching product data:", error)
//         return null
//     }
// }

const fetchCategoryData = async (
    search,
    start,
    limit,
    categoryIds,
    subcategoryIds
) => {
    try {
        const searchFilter = []
        const categoryFilter = []

        if (search !== "") {
            searchFilter.push({
                name: {
                    $regex: ".*" + search + ".*",
                    $options: "i",
                },
            })
        }

        searchFilter.push({
            isDeleted: false,
        })

        if (Array.isArray(categoryIds) && categoryIds.length > 0) {
            categoryFilter.push({
                "subCategoryData.categoryData": {
                    $in: categoryIds,
                },
            })
        }

        if (Array.isArray(subcategoryIds) && subcategoryIds.length > 0) {
            searchFilter.push({
                subCategoryData: {
                    $in: subcategoryIds,
                },
            })
        } else if (Array.isArray(categoryIds) && categoryIds.length > 0) {
            searchFilter.push({
                "subCategoryData.categoryData": {
                    $in: categoryIds,
                },
            })
        }

        const query = {
            $or: [{ $and: searchFilter }, { $and: categoryFilter }],
        }

        const productData = await Product.find(query)
            .populate({
                path: "subCategoryData",
                select: "subCategoryName",
                match: {
                    $and: [{ isDeleted: false }, { isActive: true }],
                },
                populate: {
                    path: "categoryData",
                    model: "Category",
                    select: "categoryName",
                    match: { $and: [{ isDeleted: false }, { isActive: true }] },
                },
            })

            .populate({
                path: "brandData",
                select: ["brandName"],
            })
            .populate({
                path: "variantPriceData",
                select: [
                    "variantData",
                    "price",
                    "oldPrice",
                    "sliderImages",
                    "discounts",
                    "stock",
                ],
                populate: {
                    path: "variantData",
                    model: "Variant",
                    select: "variantType",
                },
            })
            .populate("parentProductData")
            .skip(start)
            .limit(limit)

        return productData
    } catch (error) {
        console.error("Error fetching product data:", error)
        return null
    }
}

// const variantPriceData = (search, start, limit, maxPrice, minPrice) => {
//     const searchFilter = []

//     if (search !== "") {
//         searchFilter.push({
//             name: {
//                 $regex: ".*" + search + ".*",
//                 $options: "i",
//             },
//         })
//     }

// const query = {
//     stepFlag: 3,
// }

// if (typeof minPrice === "number") {
//     query["variantPriceData.price"] = minPrice
// }

// if (typeof maxPrice === "number") {
//     query["variantPriceData.price"] = maxPrice
// }

// // if (minPrice && maxPrice) {
// //     query["variantPriceData.price"] = {
// //         $gte: minPrice,
// //         $lte: maxPrice
// //     };
// // }

// if (searchFilter.length > 0) {
//     query.$and = searchFilter
// }
//     console.log("MongoDB Query:", Product.find(query).toString())

//     return Product.find(query)
//         .populate({
//             path: "brandData",
//             select: ["brandName"],
//         })
//         .populate({
//             path: "variantPriceData",
//             select: [
//                 "variantData",
//                 "price",
//                 "oldPrice",
//                 "sliderImages",
//                 "discounts",
//                 "stock",
//             ],
//             populate: {
//                 path: "variantData",
//                 model: "Variant",
//                 select: "variantType",
//             },
//         })
//         .populate("parentProductData")
//         .sort({ createdAt: -1 })
//         .skip(start)
//         .limit(limit)
//         .then((productData) => {
//             return productData
//         })
//         .catch((error) => {
//             console.error("Error fetchBrandData data:", error)
//             return null
//         })
// }

const fetchBrandIds = (search, start, limit, brandIds) => {
    const searchFilter = []

    if (search !== "") {
        searchFilter.push({
            name: {
                $regex: ".*" + search + ".*",
                $options: "i",
            },
        })
    }

    searchFilter.push({
        isDeleted: false,
    })

    const query = {
        stepFlag: 3,
    }

    searchFilter.push({
        brandData: brandIds,
    })

    if (searchFilter.length > 0) {
        query.$and = searchFilter
    }

    return Product.find(query)
        .populate({
            path: "brandData",
            select: "brandName",
            match: { isDeleted: false },
        })
        .populate({
            path: "variantPriceData",
            select: [
                "variantData",
                "price",
                "oldPrice",
                "sliderImages",
                "discounts",
                "stock",
            ],
            populate: {
                path: "variantData",
                model: "Variant",
                select: "variantType",
                match: { isDeleted: false },
            },
        })
        .populate("parentProductData")
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((productData) => {
            return productData
        })
        .catch((error) => {
            console.error("Error fetchBrandData data:", error)
            return null
        })
}

const updateProductById = ({ productId, ...updateData }) => {
    return Product.findByIdAndUpdate(productId, updateData, { new: true })
        .then((updatedProduct) => {
            return updatedProduct
        })
        .catch((err) => {
            console.error(err)
            return null
        })
}

// const variantPriceData = (search, start, limit, minPrice) => {
//     const searchFilter = []

//     if (search !== "") {
//         searchFilter.push({
//             name: {
//                 $regex: ".*" + search + ".*",
//                 $options: "i",
//             },
//         })
//     }

//     const query = {
//         stepFlag: 3,
//         parentProductData: { $exists: true },
//     }
//     searchFilter.push({

//         "variantPriceData.price": {
//             $gte: minPrice,
//         },
//         "variantPriceData.price": {
//             $lte: minPrice,
//         },

//     })

//     if (searchFilter.length > 0) {
//         query.$and = []

//         if (searchFilter.length > 0) {
//             query.$and.push({ $or: searchFilter })
//         }
//     }

//     return Product.find(query)

// .populate({
//     path: "subCategoryData",
//     select: "subCategoryName",
//     match: {
//         $and: [{ isDeleted: false }, { isActive: true }],
//     },
//     populate: {
//         path: "categoryData",
//         model: "Category",
//         select: "categoryName",
//         match: { isDeleted: false },
//     },
// })

// .populate({
//     path: "brandData",
//     select: "brandName",
//     match: { isDeleted: false },
// })
// .populate({
//     path: "variantPriceData",
//     select: [
//         "variantData",
//         "price",
//         "oldPrice",
//         "sliderImages",
//         "discounts",
//         "stock",
//     ],
//     populate: {
//         path: "variantData",
//         model: "Variant",
//         select: "variantType",
//         match: {
//             $and: [{ isDeleted: false }, { isActive: true }],
//         },
//     },
// })
// .populate("parentProductData")
//         .sort({ parentProductData: -1 })
//         .skip(start)
//         .limit(limit)
//         .then((productData) => {
//             return productData
//         })
//         .catch((error) => {
//             console.error("Error fetching filtered product data:", error)
//             return null
//         })
// }

const variantPriceData = async (search, start, limit, maxPrice, minPrice) => {
    try {
        const searchFilter = {}

        const priceFilter = {}

        if (search !== "") {
            searchFilter.name = {
                $regex: ".*" + search + ".*",
                $options: "i",
            }
        }

        searchFilter.push({
            isDeleted: false,
        })

        if (!isNaN(minPrice)) {
            priceFilter.$gte = minPrice
        }

        if (!isNaN(maxPrice)) {
            priceFilter.$lte = maxPrice
        }

        const query = {
            "variantPriceData.price": priceFilter,
            searchFilter,
        }

        console.log("minPrice:", minPrice)
        console.log("maxPrice:", maxPrice)
        console.log("query:", query)

        const productData = await Product.find(query)
            .populate({
                path: "subCategoryData",
                select: "subCategoryName",
                match: {
                    $and: [{ isDeleted: false }, { isActive: true }],
                },
                populate: {
                    path: "categoryData",
                    model: "Category",
                    select: "categoryName",
                    match: { isDeleted: false },
                },
            })
            .populate({
                path: "brandData",
                select: "brandName",
                match: { isDeleted: false },
            })
            .populate({
                path: "variantPriceData",
                select: [
                    "variantData",
                    "price",
                    "oldPrice",
                    "sliderImages",
                    "discounts",
                    "stock",
                ],
                populate: {
                    path: "variantData",
                    model: "Variant",
                    select: "variantType",
                    match: {
                        $and: [{ isDeleted: false }, { isActive: true }],
                    },
                },
            })
            .populate("parentProductData")
            .skip(start)
            .limit(limit)

        return productData
    } catch (error) {
        console.error("Error fetching product data:", error)
        return null
    }
}

const homePageProduct = () => {
    return Product.findOne({ isDeleted: false })

        .populate({
            path: "subCategoryData",
            select: "subCategoryName",
            match: {
                $and: [{ isDeleted: false }, { isActive: true }],
            },
            populate: {
                path: "categoryData",
                model: "Category",
                select: "categoryName",
                match: { isDeleted: false },
            },
        })
        .populate({
            path: "brandData",
            select: "brandName",
            match: { isDeleted: false },
        })
        .populate({
            path: "variantPriceData",
            select: [
                "variantData",
                "price",
                "oldPrice",
                "sliderImages",
                "discounts",
                "stock",
            ],
            populate: {
                path: "variantData",
                model: "Variant",
                select: "variantType",
                match: {
                    $and: [{ isDeleted: false }, { isActive: true }],
                },
            },
        })
        .populate("parentProductData")

        .then((data) => {
            return data
        })
        .catch((error) => {
            console.error(error)
            return null
        })
}

const newArrivalProduct = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    name: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
    }

    searchFilter.push({
        isDeleted: false,
    })

    searchFilter.push({
        stepFlag: 3,
        badgeType: 1,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    return Product.find(query)

        .populate({
            path: "subCategoryData",
            select: "subCategoryName",
            match: {
                $and: [{ isDeleted: false }, { isActive: true }],
            },
            populate: {
                path: "categoryData",
                model: "Category",
                select: "categoryName",
                match: { isDeleted: false },
            },
        })

        .populate({
            path: "brandData",
            select: "brandName",
            match: { isDeleted: false },
        })

        .populate({
            path: "variantPriceData",
            select: [
                "variantData",
                "price",
                "oldPrice",
                "sliderImages",
                "discounts",
                "stock",
            ],
            populate: {
                path: "variantData",
                model: "Variant",
                select: "variantType",
                match: { isDeleted: false },
            },
        })
        .populate("parentProductData")
        .skip(start)
        .limit(limit)
        .then((productData) => {
            console.log("Products:", productData)
            return productData
        })
        .catch((error) => {
            console.error("Error fetching productaLL data:", error)
            return null
        })
}

const trendingNow = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    name: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
    }

    searchFilter.push({
        isDeleted: false,
    })

    searchFilter.push({
        stepFlag: 3,
        badgeType: 2,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}
    return Product.find(query)

        .populate({
            path: "subCategoryData",
            select: "subCategoryName",
            match: {
                $and: [{ isDeleted: false }, { isActive: true }],
            },
            populate: {
                path: "categoryData",
                model: "Category",
                select: "categoryName",
                match: { isDeleted: false },
            },
        })

        .populate({
            path: "brandData",
            select: "brandName",
            match: { isDeleted: false },
        })

        .populate({
            path: "variantPriceData",
            select: [
                "variantData",
                "price",
                "oldPrice",
                "sliderImages",
                "discounts",
                "stock",
            ],
            populate: {
                path: "variantData",
                model: "Variant",
                select: "variantType",
                match: { isDeleted: false },
            },
        })
        .populate("parentProductData")
        .skip(start)
        .limit(limit)
        .then((productData) => {
            console.log("Products:", productData)
            return productData
        })
        .catch((error) => {
            console.error("Error fetching productaLL data:", error)
            return null
        })
}

const bestSeller = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    name: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
    }

    searchFilter.push({
        isDeleted: false,
    })

    searchFilter.push({
        stepFlag: 3,
        badgeType: 3,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}
    return Product.find(query)

        .populate({
            path: "subCategoryData",
            select: "subCategoryName",
            match: {
                $and: [{ isDeleted: false }, { isActive: true }],
            },
            populate: {
                path: "categoryData",
                model: "Category",
                select: "categoryName",
                match: { isDeleted: false },
            },
        })

        .populate({
            path: "brandData",
            select: "brandName",
            match: { isDeleted: false },
        })

        .populate({
            path: "variantPriceData",
            select: [
                "variantData",
                "price",
                "oldPrice",
                "sliderImages",
                "discounts",
                "stock",
            ],
            populate: {
                path: "variantData",
                model: "Variant",
                select: "variantType",
                match: { isDeleted: false },
            },
        })
        .populate("parentProductData")
        .skip(start)
        .limit(limit)
        .then((productData) => {
            return productData
        })
        .catch((error) => {
            console.error("Error fetching productaLL data:", error)
            return null
        })
}

module.exports = {
    createProduct,
    updateProduct,
    productManagement,
    fetchProductAllData,
    fetchBrandData,
    onlyParentProductData,
    onlyTajData,
    deleteProduct,
    fetchProductById,
    variantPriceData,
    fetchCategoryData,
    fetchBrandIds,
    updateProductById,
    homePageProduct,
    newArrivalProduct,
    trendingNow,
    bestSeller,
    fetchProductbyId
}
