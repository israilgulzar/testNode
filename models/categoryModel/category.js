const CategorySchema = require("./schema")

const createCategory = (insertData) => {
    const category = new CategorySchema(insertData)

    return category
        .save()
        .then((categoryResult) => {
            return categoryResult
        })
        .catch((err) => {
            console.error(err)
            return null
        })
}

const fetchCategoryData = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            categoryName: {
                $regex: ".*" + search + ".*",
                $options: "i",
            },
        })
    }
    searchFilter.push({
        isDeleted: false,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    return CategorySchema.find(query)
        .select("-isDeleted")
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((categoryData) => {
            return categoryData
        })
        .catch((error) => {
            console.error(error)
            return null
        })
}

const customerCategoryList = (search, start, limit) => {
    let searchFilter = []

    if (search !== "") {
        searchFilter.push({
            categoryName: {
                $regex: new RegExp(".*" + search + ".*", "i"),
            },
        })
    }

    searchFilter.push({
        isActive: true,
    })

    searchFilter.push({
        isDeleted: false,
    })
    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    return CategorySchema.find(query)
        .select("-isDeleted")
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((categoryData) => {
            return categoryData
        })
        .catch((error) => {
            console.error(error)
            return null
        })
}

const updateCategory = async (categoryId, updateData) => {
    const categoryResult = CategorySchema.updateOne(
        { _id: categoryId },
        updateData
    )
        .then((model) => {
            return true
        })
        .catch((err) => {
            return false
        })

    return categoryResult
}

const fetchCategoryById = (categoryId) => {
    return CategorySchema.findOne({
        _id: categoryId,
        isActive: true,
        isDeleted: false,
    })
        .select("-isDeleted")
        .then((categoryData) => {
            return categoryData
        })
        .catch((err) => {
            console.error(err)
            return null
        })
}

const categoryDropdown = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [
                {
                    categoryName: {
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
        categoryName: 1,
    }

    return CategorySchema.find(query, getData)
        .select("-isDeleted")
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((categoryData) => {
            return categoryData
        })
        .catch((error) => {
            console.error(error)
            return null
        })
}

const deleteCategory = (categoryId) => {
    return CategorySchema.deleteOne({ _id: categoryId })
        .then((categoryResult) => {
            return categoryResult
        })
        .catch((err) => {
            console.error(err)
            return null
        })
}

const filterCategoryData = (filterData) => {
    let filter = []
    if (filterData.categoryName) {
        filter.push({
            categoryName: filterData.categoryName,
        })
    }
    filter.push({
        isDeleted: false,
    })

    return CategorySchema.findOne({ $and: filter })
        .then((getFilterData) => {
            return getFilterData
        })
        .catch((err) => {
            console.error(err)
            return null
        })
}

const CusCategoryCount = (search, isActive = true) => {
    const searchFilter = {
        isActive: isActive,
        isDeleted: false,
    }

    if (search) {
        searchFilter.categoryName = {
            $regex: new RegExp(".*" + search + ".*", "i"),
        }
    }

    return CategorySchema.countDocuments(searchFilter)
        .then((categoryCount) => {
            return categoryCount
        })
        .catch((err) => {
            console.error("Error counting categories:", err)
            return null
        })
}

const fetchCategoryCount = (search) => {
    const searchFilter = {}
    if (search) {
        searchFilter.categoryName = {
            $regex: new RegExp(".*" + search + ".*", "i"),
        }
    }
    searchFilter.isDeleted = false

    return CategorySchema.countDocuments(searchFilter)
        .then((categoryCount) => {
            return categoryCount
        })
        .catch((err) => {
            console.error("Error counting categories:", err)
            return null
        })
}

const fetchCategoryList = async () => {
    const categoryData = await CategorySchema.find({
        $and: [
            {
                isActive: true,
            },
            {
                isDeleted: false,
            },
        ],
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

const homePageCategory = () => {
    searchFilter = []

    searchFilter.push({
        isActive: true,
    })

    searchFilter.push({
        isDeleted: false,
    })

    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    const getData = { _id: 1, categoryName: 1 }

    return CategorySchema.find(query, getData)
        .sort({ shortOrder: -1 })
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.log(error)
            return null
        })
}

module.exports = {
    createCategory,
    fetchCategoryData,
    updateCategory,
    fetchCategoryById,
    categoryDropdown,
    deleteCategory,
    filterCategoryData,
    fetchCategoryCount,
    customerCategoryList,
    CusCategoryCount,
    fetchCategoryList,
    homePageCategory,
}
