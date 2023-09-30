
const UserSchema = require("./userSchema")

const createUser = async (insertData) => {
    const user = new UserSchema(insertData)

    const userResult = await user
        .save()
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })

    return userResult
}

const fetchUserFilterData = async (userFilter) => {
    let filter = []
    if (userFilter.email) {
        filter.push({
            email: userFilter.email,
        })
    }
    if (userFilter.phone) {
        filter.push({
            phone: userFilter.phone,
        })
    }

    let getFilterData = await UserSchema.findOne({
        $and: filter,
        isDeleted: false,
    })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return getFilterData
}

const fetchOneUser = (email) => {
    return UserSchema.findOne({ email, isDeleted: false })
        .then((userData) => {
            return userData
        })
        .catch((error) => {
            console.error("Error in fetchOneUser:", error)
            return null
        })
}

const fetchUserData = (search, start, limit) => {
    let searchFilter = []
    if (search !== "") {
        searchFilter.push({
            $or: [{ name: { $regex: ".*" + search + ".*", $options: "i" } }],
        })
    }

    searchFilter.push({
        isDeleted: false,
    })
    const query = searchFilter.length > 0 ? { $and: searchFilter } : {}

    return UserSchema.find(query)
        .select("-password -isDeleted")
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .then((userData) => {
            return userData
        })
        .catch((error) => {
            console.error("Error in fetchUserData:", error)
            return null
        })
}

const findUserData = (email) => {
    return UserSchema.findOne({ email, isDeleted: false })
        .select("-password -isDeleted")
        .exec()
        .then((userData) => {
            return userData
        })
        .catch((error) => {
            console.error("Error in fetchUserData:", error)
            return null
        })
}

const updateUser = async (userId, updateData) => {
    const userResult = UserSchema.updateOne({ _id: userId }, updateData)
        .then((model) => {
            return true
        })
        .catch((err) => {
            return false
        })

    return userResult
}

const fetchUserById = async (userId) => {
    const userData = await UserSchema.findOne({
        _id: userId,
        isDeleted: false,
    })
        .select("-password")
        .exec()
    return userData
}

const deleteUser = async (userId) => {
    const userResult = await UserSchema.deleteOne({ _id: userId })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return null
        })
    return userResult
}

module.exports = {
    createUser,
    fetchUserData,
    fetchOneUser,
    updateUser,
    fetchUserById,
    deleteUser,
    fetchUserFilterData,
    findUserData,
}
