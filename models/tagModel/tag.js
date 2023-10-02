const TagSchema = require("./schema")

const createTag = async (insertData) => {
    const tag = new TagSchema(insertData)
    const tagResult = await tag
        .save()
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.log("err ::", err)
            return false
        })
    return tagResult
}

const updateTag = async (id, updateData) => {
    const tagResult = TagSchema.updateOne({ _id: id }, updateData)
        .then((model) => {
            return true
        })
        .catch((err) => {
            return false
        })
    return tagResult
}

const fetchTagById = async (id) => {
    const tagData = await TagSchema.findOne({_id: id, isDeleted:false})
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return tagData
}

const fetchTags = async (search, start, limit) => {
    const searchFilter = []
    if (search) {
        searchFilter.push({
            tagName: { $regex: ".*" + search + ".*", $options: "i" },
        })
    }
    searchFilter.push({
        isDeleted: false,
    })
    const tagData = await TagSchema.find(
        searchFilter.length > 0 ? { $and: searchFilter } : {}
    )
        .skip(start)
        .limit(limit)
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.log(err)
            return null
        })

    return tagData
}

const deleteTag = async (id) => {
    const tagResult = await TagSchema.deleteOne({ _id: id })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return tagResult
}

const searchTag = async (search) => {
    let searchFilter = []
    if (search) {
        searchFilter.push({
            tagName: { $regex: ".*" + search + ".*", $options: "i" },
        })
    }

    searchFilter.push({
        isActive: true,
    })

    searchFilter.push({
        isDeleted: false,
    })

    const tagData = await TagSchema.find(
        {
            $and: searchFilter,
        },
        { _is: 1, tagName: 1 }
    )
        .sort({ createdAt: -1 })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return tagData
}

// const fetchTagsCount = async (search, status) => {
//     const searchFilter = {}

//     if (search) {
//         searchFilter.tagName = { $regex: ".*" + search + ".*", $options: "i" }
//     }

//     if (status !== undefined) {
//         searchFilter.isActive = status
//     }

//     try {
//         const tagCount = await TagSchema.countDocuments(searchFilter)
//         return tagCount
//     } catch (err) {
//         console.error("Error counting tags:", err)
//         return null
//     }
// }

const fetchTagsCount = (search, status) => {
    const searchFilter = { isDeleted: false } // Add the condition for isDeleted here

    if (search) {
        searchFilter.tagName = { $regex: ".*" + search + ".*", $options: "i" }
    }

    if (status !== undefined) {
        searchFilter.isActive = status
    }

    return TagSchema.countDocuments(searchFilter)
        .then((tagCount) => {
            return tagCount
        })
        .catch((err) => {
            console.error("Error counting tags:", err)
            
        })
}

// const filterTagData = async (userFilter) => {
//     try {
//         const filter = {}
//         filter.isDeleted = false
//         if (userFilter.tagName) {
//             filter.tagName = userFilter.tagName
//         }

//         const tagData = await TagSchema.findOne(filter)
//         return tagData
//     } catch (err) {
//         console.error("Error filtering tag data:", err)
//         return null
//     }
// }

const filterTagData = (userFilter) => {
    const filter = { isDeleted: false }

    if (userFilter.tagName) {
        filter.tagName = userFilter.tagName
    }

    return TagSchema.findOne(filter)
        .then((tagData) => {
            return tagData
        })
        .catch((err) => {
            console.error("Error filtering tag data:", err)
            throw err // Re-throw the error to handle it elsewhere
        })
}



module.exports = {
    createTag,
    fetchTagById,
    updateTag,
    fetchTags,
    filterTagData,
    fetchTagsCount,
    searchTag,
    deleteTag,
}
