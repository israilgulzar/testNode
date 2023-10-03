const BrandSchema = require("./schema")

const createBrand = async (insertData) => {
    const brand = new BrandSchema(insertData)

    const brandResult = await brand
        .save()
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })

    return brandResult
}

const fetchBrandData = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    brandName: {
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

    return BrandSchema.find(query)
        .select("-isDeleted")
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((brandData) => {
            return brandData
        })
        .catch((error) => {
            return null
        })
}

const updateBrand = async (brandId, updateData) => {
    const brandResult = BrandSchema.updateOne({ _id: brandId }, updateData)
        .then((model) => {
            return true
        })
        .catch((err) => {
            return false
        })

    return brandResult
}

const fetchBrandById = async (brandId) => {
    const brandData = await BrandSchema.findOne({
        _id: brandId,
        isActive: true,
        isDeleted: false,
    })
        .select("-isDeleted")
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return brandData
}

const brandDropdown = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    brandName: {
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
    const getData = { _id: 1, brandName: 1 }
    return BrandSchema.find(query, getData)
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((data) => {
            return data
        })
        .catch((error) => {
            return null
        })
}

const deleteBrand = async (brandId) => {
    const brandResult = await BrandSchema.deleteOne({ _id: brandId })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return brandResult
}

const fetchBrandFilterData = async (userFilter) => {
    let filter = []
    if (userFilter.brandName) {
        filter.push({
            brandName: userFilter.brandName,
        })
    }

    filter.push({
        isDeleted: false,
    })

    let getFilterData = await BrandSchema.findOne({ $and: filter })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return getFilterData
}

const fetchBrandCountCus = async (search) => {
    const searchFilter = {
        isActive: true,
        isDeleted: false,
    }

    if (search) {
        searchFilter.brandName = { $regex: ".*" + search + ".*", $options: "i" }
    }

    return BrandSchema.countDocuments(searchFilter)
        .then((brandCount) => {
            return brandCount
        })
        .catch((err) => {
            console.error("Error counting  brands:", err)
            return null
        })
}

const fetchBrandCount = async (search) => {
    const searchFilter = {}

    if (search) {
        searchFilter.brandName = { $regex: ".*" + search + ".*", $options: "i" }
    }

    searchFilter.isDeleted = false

    return BrandSchema.countDocuments(searchFilter)
        .then((brandCount) => {
            return brandCount
        })
        .catch((err) => {
            console.error("Error counting brands:", err)
            return null
        })
}

const fetchBrandDataCus = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    brandName: {
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

    return BrandSchema.find(query)
        .select("-isDeleted")
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((brandData) => {
            return brandData
        })
        .catch((error) => {
            return null
        })
}

const homePageBrand = () => {
    searchFilter = []

    searchFilter.push({
        isActive: true,
    })

    searchFilter.push({
        isDeleted: false,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    const getData = { _id: 1, brandName: 1, brandImage: 1 }


    return BrandSchema.find(query, getData)
        .sort({ createdAt: -1 })
        .then((brandData) => {
            return brandData
        })
        .catch((error) => {
            console.log(error)
            return null
        })
}

module.exports = {
    fetchBrandById,
    updateBrand,
    fetchBrandData,
    createBrand,
    brandDropdown,
    deleteBrand,
    fetchBrandFilterData,
    fetchBrandCount,
    fetchBrandDataCus,
    fetchBrandCountCus,
    homePageBrand,
}
