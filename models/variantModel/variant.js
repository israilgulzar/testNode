
const VariantSchema = require("./schema")

const createVariant = async (insertData) => {
    const variant = new VariantSchema(insertData)

    const variantResult = await variant
        .save()
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })

    return variantResult
}

const fetchVariantData = (search, start, limit) => {
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
        isDeleted: false,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    return VariantSchema.find(query)
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((variantData) => {
            return variantData
        })
        .catch((error) => {
            return null
        })
}

const variantCount = (search) => {
    let searchFilter = []

    if (search !== "") {
        searchFilter.push({
            variantType: {
                $regex: new RegExp(".*" + search + ".*", "i"),
            },
        })
    }

    searchFilter.push({
        isDeleted: false,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    return VariantSchema.countDocuments(query)
        .then((count) => {
            return count
        })
        .catch((error) => {
            console.error("Error counting variants:", error)
            return null
        })
}

const fetchVariantDataCus = (search, start, limit) => {
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

    searchFilter.push({
        isDeleted: false,
    })
    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    return VariantSchema.find(query)
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((variantData) => {
            return variantData
        })
        .catch((error) => {
            return null
        })
}

const variantCountCus = (search, isActive = true) => {
    let searchFilter = []

    if (search !== "") {
        searchFilter.push({
            variantType: {
                $regex: new RegExp(".*" + search + ".*", "i"),
            },
        })
    }

    if (isActive) {
        searchFilter.push({
            isActive: true,
        })
    }

    searchFilter.push({
        isDeleted: false,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    return VariantSchema.countDocuments(query)
        .then((count) => {
            return count
        })
        .catch((error) => {
            console.error("Error counting variants:", error)
            return null
        })
}

const updateVariant = async (variantId, updateData) => {
    const variantResult = VariantSchema.updateOne(
        { _id: variantId },
        updateData
    )
        .then((model) => {
            return true
        })
        .catch((err) => {
            return false
        })

    return variantResult
}

const deleteVariant = async (variantId) => {
    const variantResult = await VariantSchema.deleteOne({ _id: variantId })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return variantResult
}

const fetchVariantById = async (variantId) => {
    const variantData = await VariantSchema.findOne({
        _id: variantId,
        isActive: true,
        isDeleted: false,
    })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return variantData
}

const variantDropdown = (search, start, limit) => {
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

    searchFilter.push({
        isDeleted: false,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}
    const getData = {
        _id: 1,
        variantType: 1,
    }
    return VariantSchema.find(query, getData)
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

const variantTypeFilter = async (filterData) => {
    let filter = []
    if (filterData.variantType) {
        filter.push({
            variantType: filterData.variantType,
        })
    }
    filter.push({
        isDeleted: false,
    })
    let getFilterData = await VariantSchema.findOne({ $and: filter })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return getFilterData
}

module.exports = {
    fetchVariantById,
    updateVariant,
    fetchVariantData,
    createVariant,
    variantDropdown,
    deleteVariant,
    variantTypeFilter,
    variantCount,
    fetchVariantDataCus,
    variantCountCus,
}
