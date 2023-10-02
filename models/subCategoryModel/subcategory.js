
const SubCategorySchema = require("./schema")

const createSubCategory = async (insertData) => {
    const subCategory = new SubCategorySchema(insertData)

    const subCategoryResult = await subCategory
        .save()
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })

    return subCategoryResult
}

const fetchSubCategoryData = (search, start, limit) => {
    let searchFilter = []

    if (search !== "") {
        searchFilter.push({
            subCategoryName: {
                $regex: ".*" + search + ".*",
                $options: "i",
            },
        })
    }

    searchFilter.push({
        isDeleted: false,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    return SubCategorySchema.find(query)
        .populate({
            path: "categoryData",
            select: "categoryName",
            match: {
                $and: [{ isDeleted: false }, { isActive: true }],
            },
        })
        .select({ isDeleted: 0 })
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((subCategoryData) => {
            return subCategoryData
        })
        .catch((error) => {
            console.log(error)
            return null
        })
}

const updateSubCategory = async (subCategoryId, updateData) => {
    const subCategoryResult = SubCategorySchema.updateOne(
        { _id: subCategoryId },
        updateData
    )
        .then((model) => {
            return true
        })
        .catch((err) => {
            console.log(err)
            return false
        })

    return subCategoryResult
}

const fetchSubCategoryById = async (subCategoryId) => {
    const subCatagoryData = await SubCategorySchema.findOne({
        _id: subCategoryId,
        isActive: true,
        isDeleted: false,
    })
        .populate({
            path: "categoryData",
            select: ["categoryName"],
            match: {
                $and: [{ isDeleted: false }, { isActive: true }],
            },
        })
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.log(err)
            return null
        })
    return subCatagoryData
}

const subCategoryDropdown = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    subCategoryName: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
    }

    searchFilter.push({ isActive: true })
    searchFilter.push({ isDeleted: false })
    searchFilter.push({ categoryData: { $ne: null } }) 

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}
    const getData = { _id: 1, subCategoryName: 1 }
    return SubCategorySchema.find(query, getData)
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((subCategoryData) => {
            return subCategoryData
        })
        .catch((err) => {
            console.log(err)
            return null
        })
}

const deleteSubCategory = async (subCategoryId) => {
    const subCategoryResult = await SubCategorySchema.deleteOne({
        _id: subCategoryId,
    })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return subCategoryResult
}

const filterSubCategoryData = async (filterData) => {
    let filter = []
    if (filterData.subCategoryName) {
        filter.push({
            subCategoryName: filterData.subCategoryName,
        })
    }

    filter.push({
        isDeleted: false,
    })

    let getFilterData = await SubCategorySchema.findOne({ $and: filter })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return getFilterData
}

const subcategoryCount = (search) => {
    const searchFilter = {}

    if (search) {
        searchFilter.subCategoryName = {
            $regex: new RegExp(".*" + search + ".*", "i"),
        }
    }
    searchFilter.isDeleted = false

    return SubCategorySchema.countDocuments(searchFilter)

        .then((subcategoryCount) => {
            return subcategoryCount
        })
        .catch((err) => {
            console.error("Error counting subcategories:", err)
            return null
        })
}

const fetchSubCategoryDataCus = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    subCategoryName: {
                        $regex: ".*" + search + ".*",
                        $options: "i",
                    },
                },
            ],
        })
    }

    searchFilter.push({
        isActive: true,
        categoryData: { $exists: true },
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    return SubCategorySchema.find(query)
        .populate({
            path: "categoryData",
            select: ["categoryName", "isActive", "isDeleted"],
            // match: { isDeleted: false },
        })
        // .select({ isDeleted: 0 })
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((subCategoryData) => {
            const filteredSubCategoryData = subCategoryData.filter(
                (subCategory) =>
                    subCategory.categoryData !== null &&
                    subCategory.categoryData.isActive === true &&
                    subCategory.categoryData.isDeleted === false &&
                    subCategory.isDeleted === false
            )
            // const newObj = {
            //     categoryData: filteredSubCategoryData.subCategoryName
            // }

            // console.log("======================", newObj)

            const recordCount = filteredSubCategoryData.length
            return { subCategoryData: filteredSubCategoryData, recordCount }
        })
        .catch((error) => {
            console.error(error)
            return null
        })
}

const fetchSubCategorys = async (search, categoryId, categorysArray) => {
    let filter = []

    filter.push({
        isActive: true,
    })

    filter.push({
        isDeleted: false,
    })

    if (search) {
        filter.push({
            subCategoryName: { $regex: ".*" + search + ".*", $options: "i" },
        })
    }

    if (categoryId) {
        filter.push({
            categoryData: categoryId,
        })
    }

    if (categorysArray && categorysArray.length > 0) {
        filter.push({
            categoryData: { $in: categorysArray },
        })
    }

    const categoryData = await SubCategorySchema.find({
        $and: filter,
    })
        .sort({ shortOrder: 1 })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return categoryData
}

module.exports = {
    createSubCategory,
    fetchSubCategoryData,
    updateSubCategory,
    fetchSubCategoryById,
    subCategoryDropdown,
    deleteSubCategory,
    filterSubCategoryData,
    fetchSubCategoryDataCus,
    subcategoryCount,
    fetchSubCategorys,
}
