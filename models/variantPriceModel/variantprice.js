
const variantPriceSchema = require("./schema");

const createVariantPrices = async (insertDataArray) => {
    try {
        const variantResultPrices = await variantPriceSchema.insertMany(insertDataArray);
        return variantResultPrices;
    } catch (error) {
        console.error("Error creating variant prices:::::::::::", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const updateVariantPrices = async (updateData) => {
    let errId = false
    let idArr = []
    const bulkUpdateOps = updateData && updateData.length > 0 && updateData.map((variant) => {
        if (variant.variantPriceId) {

            idArr = [...idArr, variant.variantPriceId]
            return ({
                updateOne: {
                    filter: { _id: variant.variantPriceId },
                    update: {
                        $set: {
                            stock: variant.stock,
                            variant: variant.variantId,
                            price: variant.price,
                            discounts: variant.discounts,
                            sliderImages: variant.sliderImages,
                        },
                    },
                },
            })
        }

        else errId = true
    });

    let result;

    try {
        if (errId) return result = false
        const data = await variantPriceSchema.bulkWrite(bulkUpdateOps);
        if (data && data.ok === 1) {
            return result = idArr
        }
        return result = false
    } catch (error) {
        result = error
    }

    return result
}


const fetchVariantPriceData = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    variantType: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
    }

    searchFilter.push({
        isActive: true,
    })
    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    return variantPriceSchema.find(query)
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((variantPriceData) => {
            return variantPriceData
        })
        .catch((error) => {
            return null
        })
}


const deleteVariantPrice = async (variantIds) => {
    const variantResultPrice = await variantPriceSchema.deleteMany({ _id: { $in: variantIds }  })
        .then((data) => {
            return data
        })  
        .catch((err) => {
            return null
        })
    return variantResultPrice
}

const fetchVariantPriceById = async (variantId) => {
    const variantPriceData = await variantPriceSchema.findOne({
        _id: variantId,
        isActive: true,
    })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return variantPriceData
}

const variantPriceDropdown = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    variantType: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
    }

    searchFilter.push({
        isActive: true,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}
    const getData = {
        _id: 1,
        variantType: 1,
    }
    return variantPriceSchema.find(query, getData)
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((categoryData) => {
            return categoryData
        })
        .catch((error) => {
            return null
        })
}

const variantPriceTypeFilter = async (filterData) => {
    let filter = []
    if (filterData.variantType) {
        filter.push({
            variantType: filterData.variantType,
        })
    }
    let getFilterData = await variantPriceSchema.findOne({ $and: filter })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return getFilterData
}

module.exports = {
    fetchVariantPriceById,
    updateVariantPrices,
    fetchVariantPriceData,
    createVariantPrices,
    variantPriceDropdown,
    deleteVariantPrice,
    variantPriceTypeFilter,
}
